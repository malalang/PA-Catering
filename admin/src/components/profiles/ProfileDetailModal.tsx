"use client";

import { useState } from "react";
import { HiXMark, HiOutlineShoppingBag, HiOutlineHeart } from "react-icons/hi2";
import type { ProfileRecord, SupabaseOrderRecord } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

type Props = {
    profile: ProfileRecord;
    orders: SupabaseOrderRecord[];
    favorites: any[];
    onClose: () => void;
};

export const ProfileDetailModal = ({ profile, orders, favorites, onClose }: Props) => {
    const [activeTab, setActiveTab] = useState<"info" | "orders" | "favorites">("info");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/95 p-6">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            {profile.display_name || "No name"}
                        </h2>
                        <p className="text-sm text-slate-400">{profile.email}</p>
                        <div className="mt-2 flex gap-2">
                            <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs font-medium uppercase text-indigo-300">
                                {profile.role}
                            </span>
                            <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-medium uppercase text-purple-300">
                                {profile.tier_status}
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-slate-800 p-2 text-white hover:bg-slate-700"
                    >
                        <HiXMark className="h-5 w-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="mb-6 flex gap-2 border-b border-white/10">
                    <button
                        type="button"
                        onClick={() => setActiveTab("info")}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "info"
                            ? "border-b-2 border-indigo-500 text-indigo-400"
                            : "text-slate-400 hover:text-white"
                            }`}
                    >
                        Profile Info
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("orders")}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${activeTab === "orders"
                            ? "border-b-2 border-indigo-500 text-indigo-400"
                            : "text-slate-400 hover:text-white"
                            }`}
                    >
                        <HiOutlineShoppingBag className="h-4 w-4" />
                        Orders ({orders.length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("favorites")}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${activeTab === "favorites"
                            ? "border-b-2 border-indigo-500 text-indigo-400"
                            : "text-slate-400 hover:text-white"
                            }`}
                    >
                        <HiOutlineHeart className="h-4 w-4" />
                        Favorites ({favorites.length})
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {activeTab === "info" && (
                        <div className="grid gap-4 md:grid-cols-2">
                            <InfoField label="User ID" value={profile.uid || "-"} />
                            <InfoField label="Phone" value={profile.phone || "-"} />
                            <InfoField label="Address" value={profile.address || "-"} />
                            <InfoField label="City" value={profile.city || "-"} />
                            <InfoField label="State" value={profile.state || "-"} />
                            <InfoField label="Zip Code" value={profile.zip_code || "-"} />
                            <InfoField label="Country" value={profile.country || "-"} />
                            <InfoField
                                label="Loyalty Points"
                                value={profile.loyalty_points_balance?.toString() || "0"}
                            />
                            <InfoField
                                label="Last Login"
                                value={profile.last_login
                                    ? formatDistanceToNow(new Date(profile.last_login), { addSuffix: true })
                                    : "Never"
                                }
                            />
                            <InfoField
                                label="Account Created"
                                value={formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}
                            />
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div className="space-y-3">
                            {orders.length === 0 ? (
                                <p className="text-center text-sm text-slate-500">No orders yet</p>
                            ) : (
                                orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="rounded-lg border border-white/10 bg-slate-800/40 p-4"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-white">
                                                    Order #{order.id.slice(0, 8)}
                                                </p>
                                                <p className="text-sm text-slate-400">
                                                    {formatDistanceToNow(new Date(order.created_at), {
                                                        addSuffix: true,
                                                    })}
                                                </p>
                                            </div>
                                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium uppercase text-emerald-300">
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex justify-between text-sm">
                                            <span className="text-slate-400">Total:</span>
                                            <span className="font-semibold text-white">
                                                ${order.total_price?.toFixed(2) || "0.00"}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === "favorites" && (
                        <div className="grid gap-3 md:grid-cols-2">
                            {favorites.length === 0 ? (
                                <p className="col-span-2 text-center text-sm text-slate-500">No favorites yet</p>
                            ) : (
                                favorites.map((fav: any) => (
                                    <div
                                        key={fav.product_id}
                                        className="rounded-lg border border-white/10 bg-slate-800/40 p-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            {fav.products?.image_url && (
                                                <img
                                                    src={fav.products.image_url}
                                                    alt={fav.products.name}
                                                    className="h-16 w-16 rounded-lg object-cover"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <p className="font-semibold text-white">
                                                    {fav.products?.name || "Product"}
                                                </p>
                                                <p className="text-sm text-slate-400">
                                                    ${fav.products?.price?.toFixed(2) || "0.00"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

type InfoFieldProps = {
    label: string;
    value: string;
};

const InfoField = ({ label, value }: InfoFieldProps) => (
    <div className="rounded-lg border border-white/10 bg-slate-800/40 p-3">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
);
