"use client";

import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/forms/SubmitButton";
import {
    type ProductActionState,
    updateProductAction,
    deleteProductAction,
} from "@/lib/data/products-actions";
import type { ProductRecord } from "@/lib/types";
import { useState } from "react";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";

type Props = {
    product: ProductRecord;
    categories: string[];
};

const initialState: ProductActionState = {};

export const ProductEditForm = ({ product, categories }: Props) => {
    const router = useRouter();
    const [state, formAction] = useFormState(updateProductAction, initialState);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = async () => {
        await deleteProductAction(product.id);
        router.push("/menu");
    };

    return (
        <div className="space-y-6">
            <form action={formAction} className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 space-y-4">
                <input type="hidden" name="id" value={product.id} />

                <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm">
                        <span className="text-slate-300">Product Name *</span>
                        <input
                            name="name"
                            type="text"
                            required
                            defaultValue={product.name}
                            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <label className="space-y-2 text-sm">
                        <span className="text-slate-300">Category *</span>
                        <select
                            name="category"
                            required
                            defaultValue={product.category_name ?? ""}
                            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm">
                        <span className="text-slate-300">Price (ZAR) *</span>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            defaultValue={product.price ?? 0}
                            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <label className="space-y-2 text-sm">
                        <span className="text-slate-300">Stock *</span>
                        <input
                            name="stock"
                            type="number"
                            min="0"
                            required
                            defaultValue={product.stock ?? 0}
                            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>
                </div>

                <label className="block space-y-2 text-sm">
                    <span className="text-slate-300">Image URL</span>
                    <input
                        name="image_url"
                        type="url"
                        defaultValue={product.image_url ?? ""}
                        placeholder="https://example.com/image.jpg"
                        className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                    />
                </label>

                <label className="block space-y-2 text-sm">
                    <span className="text-slate-300">Badge</span>
                    <input
                        name="badge"
                        defaultValue={product.badge ?? ""}
                        placeholder="Chef's pick, New, Bestseller, etc."
                        className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                    />
                </label>

                <label className="block space-y-2 text-sm">
                    <span className="text-slate-300">Description</span>
                    <textarea
                        name="description"
                        rows={4}
                        defaultValue={product.description ?? ""}
                        className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                    />
                </label>

                {state.error && <p className="text-sm text-rose-400">{state.error}</p>}
                {state.success && (
                    <p className="text-sm text-emerald-400">{state.success}</p>
                )}

                <div className="flex gap-3">
                    <SubmitButton
                        label="Save Changes"
                        loadingLabel="Saving..."
                        className="flex-1 bg-indigo-600 px-4 py-2 text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {/* Delete Section */}
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-6">
                <h3 className="text-lg font-semibold text-white">Danger Zone</h3>
                <p className="mt-1 text-sm text-slate-400">
                    Permanently delete this product. This action cannot be undone.
                </p>
                <button
                    type="button"
                    onClick={() => setShowDeleteDialog(true)}
                    className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
                >
                    Delete Product
                </button>
            </div>

            <DeleteConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Delete Product"
                message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
            />
        </div>
    );
};
