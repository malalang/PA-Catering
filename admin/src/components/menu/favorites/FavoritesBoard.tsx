"use client";

import { useState } from "react";
import type { UserFavoriteRecord } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

type Props = {
    favorites: UserFavoriteRecord[];
};

export const FavoritesBoard = ({ favorites }: Props) => {
    const [search, setSearch] = useState("");

    const filtered = favorites.filter(
        (fav) =>
            !search ||
            fav.user_id.toLowerCase().includes(search.toLowerCase()) ||
            fav.product_id.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <input
                    type="search"
                    placeholder="Search favorites..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md rounded-full border border-white/10 bg-yellow-900/60 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                />
                <p className="text-xs uppercase tracking-[0.3em] text-yellow-500">
                    {filtered.length} favorites
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-yellow-900/40">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10 text-left">
                            <th className="p-4 font-medium text-yellow-400">User ID</th>
                            <th className="p-4 font-medium text-yellow-400">Product ID</th>
                            <th className="p-4 font-medium text-yellow-400">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((favorite, index) => (
                            <tr
                                key={`${favorite.user_id}-${favorite.product_id}`}
                                className={`${index !== filtered.length - 1
                                    ? "border-b border-white/10"
                                    : ""
                                    }`}
                            >
                                <td className="p-4 font-mono text-xs text-yellow-300">
                                    {favorite.user_id.slice(0, 8)}...
                                </td>
                                <td className="p-4 font-mono text-xs text-yellow-300">
                                    {favorite.product_id.slice(0, 8)}...
                                </td>
                                <td className="p-4 text-yellow-400">
                                    {formatDistanceToNow(new Date(favorite.created_at), {
                                        addSuffix: true,
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
