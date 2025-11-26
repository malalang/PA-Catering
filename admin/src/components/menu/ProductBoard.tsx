"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { HiOutlinePlus, HiOutlinePencil } from "react-icons/hi2";
import type { ProductRecord } from "@/lib/types";
import { QuickEditForm } from "./QuickEditForm";

type Props = {
  products: ProductRecord[];
  showImages?: boolean;
  onAddProduct?: () => void;
};

const normalize = (value?: string | null) => value?.toLowerCase() ?? "";

export const ProductBoard = ({ products, showImages = false, onAddProduct }: Props) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [editingId, setEditingId] = useState<string | null>(null);

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
  const outOfStock = filtered.filter((product) => (product.stock ?? 0) === 0).length;
  const totalStock = filtered.reduce((sum, product) => sum + (product.stock ?? 0), 0);
  const totalValue = filtered.reduce((sum, product) => sum + (product.price ?? 0) * (product.stock ?? 0), 0);

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
          <div className="mt-2 space-y-1">
            <p className="flex justify-between text-xs">
              <span className="text-slate-400">Avg Price:</span>
              <span className="font-semibold text-white">R{avgPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-xs">
              <span className="text-slate-400">Total Stock:</span>
              <span className="font-semibold text-white">{totalStock}</span>
            </p>
            <p className="flex justify-between text-xs">
              <span className="text-slate-400">Low Stock:</span>
              <span className="font-semibold text-yellow-400">{lowStock}</span>
            </p>
            <p className="flex justify-between text-xs">
              <span className="text-slate-400">Out of Stock:</span>
              <span className="font-semibold text-rose-400">{outOfStock}</span>
            </p>
            <p className="flex justify-between text-xs">
              <span className="text-slate-400">Total Value:</span>
              <span className="font-semibold text-emerald-400">R{totalValue.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`rounded-lg px-3 py-1.5 text-sm ${viewMode === "list"
                ? "bg-indigo-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
          >
            List
          </button>
          {showImages && (
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded-lg px-3 py-1.5 text-sm ${viewMode === "grid"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              Grid
            </button>
          )}
        </div>

        {onAddProduct && (
          <button
            type="button"
            onClick={onAddProduct}
            className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <HiOutlinePlus className="h-5 w-5" />
            Add Product
          </button>
        )}
      </div>

      <div className={viewMode === "grid" && showImages ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "grid gap-4 md:grid-cols-2"}>
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
              {showImages && product.image_url && (
                <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-md bg-black/20">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="rounded-md object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>
              )}

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
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
                <div className="text-right">
                  <p className="text-2xl font-semibold text-white">
                    R{product.price?.toFixed(2) ?? "0.00"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {product.stock ?? 0} in stock
                  </p>
                  <button
                    type="button"
                    onClick={() => setEditingId(editingId === product.id ? null : product.id)}
                    className="mt-2 flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1 text-xs text-white hover:bg-slate-700"
                  >
                    <HiOutlinePencil className="h-3 w-3" />
                    {editingId === product.id ? "Cancel" : "Edit"}
                  </button>
                </div>
              </div>

              {product.badge ? (
                <span className="mt-2 inline-block rounded-full border border-indigo-400/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-indigo-200">
                  {product.badge}
                </span>
              ) : null}

              {editingId === product.id && (
                <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/40 p-3">
                  <QuickEditForm product={product} />
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
};
