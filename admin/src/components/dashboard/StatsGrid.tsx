import {
  HiOutlineArrowTrendingUp,
  HiOutlineBanknotes,
  HiOutlineClipboardDocumentList,
  HiOutlineCube,
  HiOutlineSparkles,
} from "react-icons/hi2";
import type { DashboardStats } from "@/lib/data/dashboard";

type Props = {
  stats: DashboardStats;
};

const formatNumber = (value: number) => value.toLocaleString("en-ZA");

export const StatsGrid = ({ stats }: Props) => {
  const cards = [
    {
      label: "Orders (24h)",
      value: formatNumber(stats.totalOrders),
      change: "+12% vs yesterday",
      icon: HiOutlineClipboardDocumentList,
    },
    {
      label: "Revenue (ZAR)",
      value: `R${formatNumber(stats.revenue)}`,
      change: "Gross sales",
      icon: HiOutlineBanknotes,
    },
    {
      label: "Pending orders",
      value: formatNumber(stats.pendingOrders),
      change: "Awaiting assignment",
      icon: HiOutlineArrowTrendingUp,
    },
    {
      label: "Menu items live",
      value: formatNumber(stats.productCount),
      change: `${stats.lowStockCount} flagged low stock`,
      icon: HiOutlineCube,
    },
    {
      label: "Fulfilment rate",
      value: `${stats.fulfillmentRate}%`,
      change: "Completed vs total",
      icon: HiOutlineSparkles,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
      {cards.map(({ label, value, change, icon: Icon }) => (
        <article
          key={label}
          className="rounded-2xl border border-white/5 bg-gradient-to-br from-yellow-900/70 to-yellow-900/30 p-4 shadow-lg shadow-black/10"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-yellow-400">
                {label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3 text-indigo-300">
              <Icon className="text-xl" />
            </div>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-yellow-500">
            {change}
          </p>
        </article>
      ))}
    </div>
  );
};
