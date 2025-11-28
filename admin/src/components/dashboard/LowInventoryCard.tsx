import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { DashboardShell } from "@/components/layout/DashboardShell";
import type { ProductRecord } from "@/lib/types";

type Props = {
  items: ProductRecord[];
};

export const LowInventoryCard = ({ items }: Props) => (
  <DashboardShell
    title="Low inventory"
    description="Keep signature menu items available during peak demand."
  >
    {items.length === 0 ? (
      <p className="text-sm text-yellow-500">
        All tracked items are within healthy stock levels.
      </p>
    ) : (
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/5 px-3 py-2 text-sm text-rose-200"
          >
            <div>
              <p className="font-semibold text-white">{item.name}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-rose-300">
                {item.category_name ?? "Uncategorised"}
              </p>
            </div>
            <div className="flex items-center gap-1 text-rose-300">
              <HiOutlineExclamationTriangle />
              <span>{item.stock ?? 0} left</span>
            </div>
          </li>
        ))}
      </ul>
    )}
  </DashboardShell>
);

