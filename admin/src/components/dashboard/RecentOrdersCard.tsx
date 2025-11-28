import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { DashboardShell } from "@/components/layout/DashboardShell";
import type { SupabaseOrderRecord } from "@/lib/types";

type Props = {
  orders: SupabaseOrderRecord[];
};

const statusColor: Record<string, string> = {
  pending: "text-amber-300",
  processing: "text-sky-300",
  completed: "text-emerald-300",
  cancelled: "text-rose-300",
};

export const RecentOrdersCard = ({ orders }: Props) => (
  <DashboardShell
    title="Live orders"
    description="Monitor field teams and respond to escalations in real time."
    actions={
      <Link
        href="/orders"
        className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.25em] text-yellow-200 transition hover:border-indigo-400 hover:text-white"
      >
        View queue
        <HiOutlineArrowRight />
      </Link>
    }
  >
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm text-yellow-300">
        <thead className="text-xs uppercase tracking-[0.2em] text-yellow-500">
          <tr>
            <th className="py-3">Order</th>
            <th className="py-3">Status</th>
            <th className="py-3">Total</th>
            <th className="py-3">Updated</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-10 text-center text-yellow-500">
                <div className="flex flex-col items-center gap-2">
                  <HiOutlineClipboardDocumentCheck className="text-3xl text-yellow-600" />
                  <p>No orders in the last hour.</p>
                </div>
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="border-t border-white/5">
                <td className="py-3 font-semibold text-white">
                  #{order.id.slice(0, 8)}
                </td>
                <td
                  className={`py-3 text-xs uppercase tracking-[0.25em] ${statusColor[order.status] ?? "text-yellow-400"}`}
                >
                  {order.status}
                </td>
                <td className="py-3 font-medium text-white">
                  R{order.total_price?.toFixed(2) ?? "0.00"}
                </td>
                <td className="py-3 text-yellow-400">
                  {formatDistanceToNow(new Date(order.created_at), {
                    addSuffix: true,
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </DashboardShell>
);

