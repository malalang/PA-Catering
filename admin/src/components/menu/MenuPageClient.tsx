"use client";

import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
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
    const [showCategories, setShowCategories] = useState(false);
    const [showProducts, setShowProducts] = useState(false);

    return (
        <div className="space-y-8">
            {/* Categories Section */}
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-white">Categories</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Manage menu categories and organize your products
                            {!showCategories && ` • ${categories.length} categories`}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowCategories(!showCategories)}
                        className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
                    >
                        {showCategories ? (
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

                {showCategories && <CategoriesBoard categories={categories} />}
            </div>

            {/* Products Section */}
            <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-white">Menu Management</h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Control availability, pricing, and storytelling for every PA Catering experience
                                {!showProducts && ` • ${products.length} products`}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowProducts(!showProducts)}
                            className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
                        >
                            {showProducts ? (
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

                    {showProducts && <ProductBoard products={products} showImages={true} />}
                </div>

                <AddProductPanel categories={categoryNames} />
            </div>
        </div>
    );
};
