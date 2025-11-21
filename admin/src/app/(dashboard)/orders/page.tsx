import { DashboardShell } from "@/components/layout/DashboardShell";
import { OrdersBoard } from "@/components/orders/OrdersBoard";
import { fetchOrdersBoard } from "@/lib/data/orders";

export default async function OrdersPage() {
  const { orders } = await fetchOrdersBoard();

  return (
    <DashboardShell
      title="Fulfilment queue"
      description="Assign, track, and complete customer orders in real time."
    >
      <OrdersBoard orders={orders} />
    </DashboardShell>
  );
}

