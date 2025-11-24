"use client";

import { useMemo, useState } from "react";
import type { ProductRecord } from "@/lib/types";
import { QuickEditForm } from "./QuickEditForm";

type Props = {
  products: ProductRecord[];
};

const normalize = (value?: string | null) => value?.toLowerCase() ?? "";

export const ProductBoard = ({ products }: Props) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((product) => product.category_name ?? "")),
    ).filter(Boolean) as string[];
    return ["all", ...unique];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !search ||
        normalize(product.name).includes(search.toLowerCase()) ||
        normalize(product.description).includes(search.toLowerCase());
      const matchesCategory =
        category === "all" ||
        normalize(product.category_name) === category.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [category, products, search]);

  const avgPrice =
    filtered.length > 0
      ? filtered.reduce((sum, product) => sum + (product.price ?? 0), 0) /
      filtered.length
      : 0;
  const lowStock = filtered.filter(
    (product) => (product.stock ?? 0) <= 10,
  ).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-300">
          <span>Search</span>
          <input
            type="search"
            placeholder="Name or description"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span>Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All menu sections" : item}
              </option>
            ))}
          </select>
        </label>

        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-3 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Insights
          </p>
          <p className="mt-2 text-white">
            Avg price:{" "}
            <span className="font-semibold">R{avgPrice.toFixed(2)}</span>
          </p>
          <p>
            Low stock items: <span className="font-semibold">{lowStock}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/10 bg-slate-900/40 p-8 text-center text-slate-500">
            No menu items match your filters.
          </div>
        ) : (
          filtered.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 shadow-inner shadow-black/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {product.category_name ?? "Uncategorised"}
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {product.description ?? "No description yet."}
                  </p>
                </div>
                <div className="text-right text-white">
                  <p className="text-2xl font-semibold">
                    R{product.price?.toFixed(2) ?? "0.00"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {product.stock ?? 0} in stock
                  </p>
                </div>
              </div>

              {product.badge ? (
                <span className="mt-2 inline-block rounded-full border border-indigo-400/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-indigo-200">
                  {product.badge}
                </span>
              ) : null}

              <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/40 p-3">
                <QuickEditForm product={product} />
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};
