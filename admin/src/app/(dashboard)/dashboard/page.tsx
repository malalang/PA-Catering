import { LowInventoryCard } from "@/components/dashboard/LowInventoryCard";
import { RecentOrdersCard } from "@/components/dashboard/RecentOrdersCard";
import { RevenueTrendCard } from "@/components/dashboard/RevenueTrendCard";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { fetchDashboardData } from "@/lib/data/dashboard";

export default async function DashboardPage() {
  const data = await fetchDashboardData();

  return (
    <div className="space-y-6">
      <DashboardShell
        title="Executive summary"
        description="Live snapshot of menu demand, fulfillment, and stock health."
      >
        <StatsGrid stats={data.stats} />
      </DashboardShell>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentOrdersCard orders={data.recentOrders} />
        </div>
        <div className="space-y-6">
          <RevenueTrendCard series={data.revenueSeries} />
          <LowInventoryCard items={data.lowInventory} />
        </div>
      </div>
    </div>
  );
}

