import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProductRecord, SupabaseOrderRecord } from "@/lib/types";

export type RevenuePoint = {
  date: string;
  total: number;
};

export type DashboardStats = {
  totalOrders: number;
  pendingOrders: number;
  fulfillmentRate: number;
  revenue: number;
  productCount: number;
  lowStockCount: number;
};

export type DashboardData = {
  stats: DashboardStats;
  recentOrders: SupabaseOrderRecord[];
  lowInventory: ProductRecord[];
  revenueSeries: RevenuePoint[];
};

const asCurrency = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

const buildRevenueSeries = (orders: SupabaseOrderRecord[]): RevenuePoint[] => {
  const buckets = new Map<string, number>();

  orders.forEach((order) => {
    const dateKey = new Date(order.created_at).toISOString().slice(0, 10);
    const total = buckets.get(dateKey) ?? 0;
    buckets.set(dateKey, total + (order.total_price ?? 0));
  });

  return Array.from(buckets.entries())
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .slice(-7)
    .map(([date, total]) => ({
      date,
      total: asCurrency(total),
    }));
};

export const fetchDashboardData = async (): Promise<DashboardData> => {
  const supabase = await createSupabaseServerClient();

  const [
    { data: ordersRaw, error: ordersError },
    { data: productsRaw, count: productCount, error: productsError },
  ] = await Promise.all([
    supabase
      .from("orders")
      .select(
        "id,user_id,items,total_price,total_quantity,status,created_at,updated_at",
      )
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("products")
      .select("id,name,category_name,price,stock,image_url,badge", {
        count: "exact",
      }),
  ]);

  if (ordersError) {
    console.error("Failed to fetch orders for dashboard", ordersError);
  }

  if (productsError) {
    console.error("Failed to fetch products for dashboard", productsError);
  }

  const orders = (ordersRaw ?? []) as unknown as SupabaseOrderRecord[];
  const products = (productsRaw ?? []) as ProductRecord[];

  const totalOrders = orders.length;
  const revenue = asCurrency(
    orders.reduce((sum, order) => sum + (order.total_price ?? 0), 0),
  );
  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "completed",
  ).length;
  const fulfillmentRate = totalOrders
    ? Math.round((completedOrders / totalOrders) * 100)
    : 0;

  const lowInventory = products
    .filter((product) => (product.stock ?? 0) <= 10)
    .slice(0, 5);

  return {
    stats: {
      totalOrders,
      revenue,
      pendingOrders,
      fulfillmentRate,
      productCount: productCount ?? products.length,
      lowStockCount: lowInventory.length,
    },
    recentOrders: orders.slice(0, 6),
    lowInventory,
    revenueSeries: buildRevenueSeries(orders),
  };
};
