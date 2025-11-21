"use client";

import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";
import type { CartItem, SupabaseOrderRecord } from "@/lib/types";
import { UpdateOrderStatusForm } from "./UpdateOrderStatusForm";

type Props = {
  orders: SupabaseOrderRecord[];
};

const STATUS_COLUMNS: SupabaseOrderRecord["status"][] = [
  "pending",
  "processing",
  "completed",
  "cancelled",
];

type DisplayOrderItem = CartItem & {
  name?: string;
  Quantity?: number;
  ProductID?: string;
};

const resolveItemName = (item: DisplayOrderItem) =>
  item.Name ?? item.name ?? "Menu item";

const resolveItemQuantity = (item: DisplayOrderItem) =>
  item.quantity ?? item.Quantity ?? 1;

export const OrdersBoard = ({ orders }: Props) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      if (!search) return true;
      const term = search.toLowerCase();
      const idMatch = order.id.toLowerCase().includes(term);
      const userMatch = (order.user_id ?? "").toLowerCase().includes(term);
      const itemMatch = (order.items ?? []).some((item) =>
        resolveItemName(item as DisplayOrderItem)
          .toLowerCase()
          .includes(term),
      );
      return idMatch || userMatch || itemMatch;
    });
  }, [orders, search]);

  const grouped = STATUS_COLUMNS.map((status) => ({
    status,
    items: filtered.filter((order) => order.status === status),
  }));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <label className="w-full max-w-md text-sm text-slate-300">
          <span className="sr-only">Search orders</span>
          <input
            type="search"
            placeholder="Search by order ID, customer, or item"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-full border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
          />
        </label>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Showing {filtered.length} of {orders.length} orders
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {grouped.map(({ status, items }) => (
          <section
            key={status}
            className="rounded-2xl border border-white/10 bg-slate-900/40 p-4"
          >
            <header className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {status}
              </p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                {items.length}
              </span>
            </header>

            <div className="mt-4 space-y-3">
              {items.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No orders in this lane.
                </p>
              ) : (
                items.map((order) => (
                  <article
                    key={order.id}
                    className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-sm text-slate-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                          #{order.id.slice(0, 8)}
                        </p>
                        <p className="font-semibold text-white">
                          R{order.total_price?.toFixed(2) ?? "0.00"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDistanceToNow(new Date(order.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <div className="text-right text-xs text-slate-500">
                        <p>{order.total_quantity} items</p>
                        <p>{order.user_id ?? "Guest"}</p>
                      </div>
                    </div>

                    <div className="mt-3 rounded-lg bg-slate-900/60 p-2 text-xs text-slate-400">
                      <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">
                        Items
                      </p>
                      <ul className="mt-1 space-y-1">
                        {(order.items ?? []).slice(0, 4).map((item, index) => {
                          const displayItem = item as DisplayOrderItem;
                          const name = resolveItemName(displayItem);
                          const quantity = resolveItemQuantity(displayItem);
                          return (
                          <li
                            key={`${order.id}-${displayItem.ProductID ?? name}-${index}`}
                            className="flex justify-between text-white"
                          >
                            <span>{name}</span>
                            <span className="text-slate-400">
                              x{quantity}
                            </span>
                          </li>
                          );
                        })}
                        {(order.items ?? []).length > 4 ? (
                          <li className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                            + more
                          </li>
                        ) : null}
                      </ul>
                    </div>

                    <div className="mt-3">
                      <UpdateOrderStatusForm
                        orderId={order.id}
                        currentStatus={order.status}
                      />
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

