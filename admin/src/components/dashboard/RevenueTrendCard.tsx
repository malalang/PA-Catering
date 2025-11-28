import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { DashboardShell } from "@/components/layout/DashboardShell";
import type { RevenuePoint } from "@/lib/data/dashboard";

type Props = {
  series: RevenuePoint[];
};

export const RevenueTrendCard = ({ series }: Props) => (
  <DashboardShell
    title="7-day revenue trend"
    description="Daily gross sales captured via Supabase orders API."
  >
    {series.length === 0 ? (
      <div className="flex h-32 items-center justify-center text-sm text-yellow-500">
        No orders to chart yet.
      </div>
    ) : (
      <ul className="space-y-3">
        {series.map((point) => (
          <li
            key={point.date}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-yellow-900/40 px-3 py-2 text-sm"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-500">
                {point.date}
              </p>
              <p className="text-lg font-semibold text-white">
                R{point.total.toFixed(2)}
              </p>
            </div>
            <HiOutlineArrowTrendingUp className="text-xl text-emerald-300" />
          </li>
        ))}
      </ul>
    )}
  </DashboardShell>
);

