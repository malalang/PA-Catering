"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlinePlus, HiOutlinePencil, HiChevronDown, HiChevronUp, HiOutlineChatBubbleLeft } from "react-icons/hi2";
import type { ProductRecord, CommentRecord, UserFavoriteRecord } from "@/lib/types";

type Props = {
  products: ProductRecord[];
  comments: CommentRecord[];
  favorites: UserFavoriteRecord[];
  onAddProduct?: () => void;
};

const normalize = (value?: string | null) => value?.toLowerCase() ?? "";

export const ProductBoard = ({ products, comments, favorites, onAddProduct }: Props) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

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

  // Calculate product-specific data
  const productData = useMemo(() => {
    return filtered.map((product) => ({
      ...product,
      comments: comments.filter((c) => c.product_id === product.id),
      favoritesCount: favorites.filter((f) => f.product_id === product.id).length,
    }));
  }, [filtered, comments, favorites]);

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

  // Favorites summary
  const productsWithFavorites = useMemo(() => {
    const favoritesByProduct = favorites.reduce((acc, fav) => {
      acc[fav.product_id] = (acc[fav.product_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(favoritesByProduct)
      .map(([productId, count]) => ({
        product: products.find((p) => p.id === productId),
        count,
      }))
      .filter((item) => item.product)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5
  }, [products, favorites]);

  const toggleComments = (productId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white">Menu Management</h2>
          <p className="mt-1 text-sm text-slate-400">
            Control availability, pricing, and storytelling for every PA Catering experience
            {!isExpanded && ` • ${products.length} products`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
        >
          {isExpanded ? (
            <>
              <HiChevronUp className="h-4 w-4" />
              Hide
            </>
          ) : (
            <>
              <HiChevronDown className="h-4 w-4" />
              Show
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-5">
          {/* Insights - Full Width */}
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-500">
                Product Insights
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                <div className="text-center">
                  <p className="text-xs text-slate-400">Avg Price</p>
                  <p className="mt-1 text-lg font-semibold text-white">R{avgPrice.toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Total Stock</p>
                  <p className="mt-1 text-lg font-semibold text-white">{totalStock}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Low Stock</p>
                  <p className="mt-1 text-lg font-semibold text-yellow-400">{lowStock}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Out of Stock</p>
                  <p className="mt-1 text-lg font-semibold text-rose-400">{outOfStock}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Total Value</p>
                  <p className="mt-1 text-lg font-semibold text-emerald-400">R{totalValue.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Favorites Summary */}
            {productsWithFavorites.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-500">
                  Top Favorited Products
                </p>
                <div className="space-y-2">
                  {productsWithFavorites.map(({ product, count }) => (
                    <div
                      key={product!.id}
                      className="flex items-center justify-between rounded-lg bg-slate-800/40 px-3 py-2"
                    >
                      <span className="text-sm text-white">{product!.name}</span>
                      <span className="text-xs text-emerald-400">{count} favorites</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search and Category Filters */}
          <div className="grid gap-3 md:grid-cols-2">
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

          <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "grid gap-4 md:grid-cols-2"}>
            {productData.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-white/10 bg-slate-900/40 p-8 text-center text-slate-500">
                No menu items match your filters.
              </div>
            ) : (
              productData.map((product) => (
                <article
                  key={product.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 shadow-inner shadow-black/30"
                >
                  {product.image_url && (
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
                      <Link
                        href={`/menu/products/${product.id}/edit`}
                        className="mt-2 flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-white hover:bg-slate-700"
                      >
                        <HiOutlinePencil className="h-3 w-3" />
                        Edit
                      </Link>
                    </div>
                  </div>

                  {product.badge && (
                    <span className="mt-2 inline-block rounded-full border border-indigo-400/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-indigo-200">
                      {product.badge}
                    </span>
                  )}

                  {/* Product Stats */}
                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                    <span>{product.favoritesCount} favorites</span>
                    <button
                      type="button"
                      onClick={() => toggleComments(product.id)}
                      className="flex items-center gap-1 hover:text-slate-300"
                    >
                      <HiOutlineChatBubbleLeft className="h-3 w-3" />
                      {product.comments.length} comments
                    </button>
                  </div>

                  {/* Comments Section */}
                  {expandedComments.has(product.id) && (
                    <div className="mt-3 rounded-lg border border-white/10 bg-slate-800/40 p-3">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Comments
                      </h4>
                      {product.comments.length === 0 ? (
                        <p className="text-xs text-slate-500">No comments yet</p>
                      ) : (
                        <div className="space-y-2">
                          {product.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="rounded bg-slate-900/60 p-2"
                            >
                              <p className="text-xs font-semibold text-white">
                                {comment.user_name || "Anonymous"}
                              </p>
                              <p className="mt-1 text-xs text-slate-300">
                                {comment.body}
                              </p>
                              <p className="mt-1 text-xs text-slate-600">
                                {new Date(comment.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
