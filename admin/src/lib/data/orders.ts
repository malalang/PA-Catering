import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseOrderRecord } from "@/lib/types";

export type OrdersBoardData = {
  orders: SupabaseOrderRecord[];
};

export const fetchOrdersBoard = async (): Promise<OrdersBoardData> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id,user_id,total_price,total_quantity,status,items,created_at,updated_at",
    )
    .order("created_at", { ascending: false })
    .limit(80);

  if (error) {
    console.error("Failed to load orders", error);
    return { orders: [] };
  }

  return {
    orders: (data ?? []) as unknown as SupabaseOrderRecord[],
  };
};

