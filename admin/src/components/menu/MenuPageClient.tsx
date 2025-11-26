"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { AddProductPanel } from "@/components/menu/AddProductPanel";
import { ProductBoard } from "@/components/menu/ProductBoard";
import { CategoriesBoard } from "@/components/categories/CategoriesBoard";
import type { ProductRecord, CategoryRecord } from "@/lib/types";

type Props = {
    products: ProductRecord[];
    categories: CategoryRecord[];
    categoryNames: string[];
};

export const MenuPageClient = ({ products, categories, categoryNames }: Props) => {
    const [showCategories, setShowCategories] = useState(true);
    const [showProducts, setShowProducts] = useState(true);

    return (
        <div className="space-y-8">
            {/* Toggle Controls */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => setShowCategories(!showCategories)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${showCategories
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                >
                    {showCategories ? "Hide" : "Show"} Categories
                </button>
                <button
                    type="button"
                    onClick={() => setShowProducts(!showProducts)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${showProducts
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                >
                    {showProducts ? "Hide" : "Show"} Products
                </button>
            </div>

            {/* Categories Section */}
            {showCategories && (
                <DashboardShell
                    title="Categories"
                    description="Manage menu categories and organize your products."
                >
                    <CategoriesBoard categories={categories} />
                </DashboardShell>
            )}

            {/* Menu Section */}
            {showProducts && (
                <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                    <DashboardShell
                        title="Menu management"
                        description="Control availability, pricing, and storytelling for every PA Catering experience."
                    >
                        <ProductBoard products={products} showImages={true} />
                    </DashboardShell>

                    <AddProductPanel categories={categoryNames} />
                </div>
            )}
        </div>
    );
};
