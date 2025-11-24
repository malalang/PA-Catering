"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import {
    type CategoryActionState,
    updateCategoryAction,
    deleteCategoryAction,
} from "@/lib/data/categories-actions";
import type { CategoryRecord } from "@/lib/types";

type Props = {
    categories: CategoryRecord[];
};

const initialState: CategoryActionState = {};

export const CategoriesBoard = ({ categories }: Props) => {
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const filtered = categories.filter(
        (cat) =>
            !search ||
            cat.category_name.toLowerCase().includes(search.toLowerCase()) ||
            cat.description?.toLowerCase().includes(search.toLowerCase()),
    );

    const handleDelete = async () => {
        if (deleteId) {
            await deleteCategoryAction(deleteId);
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <input
                    type="search"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md rounded-full border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                />
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {filtered.length} categories
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        isEditing={editingId === category.id}
                        onEdit={() => setEditingId(category.id)}
                        onCancelEdit={() => setEditingId(null)}
                        onDelete={() => setDeleteId(category.id)}
                    />
                ))}
            </div>

            <DeleteConfirmDialog
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category? This will fail if any products are using this category."
            />
        </div>
    );
};

type CategoryCardProps = {
    category: CategoryRecord;
    isEditing: boolean;
    onEdit: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
};

const CategoryCard = ({
    category,
    isEditing,
    onEdit,
    onCancelEdit,
    onDelete,
}: CategoryCardProps) => {
    const [state, formAction] = useFormState(updateCategoryAction, initialState);

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            {isEditing ? (
                <form action={formAction} className="space-y-3">
                    <input type="hidden" name="id" value={category.id} />

                    <label className="block space-y-2 text-sm">
                        <span className="text-slate-300">Category Name</span>
                        <input
                            name="category_name"
                            defaultValue={category.category_name}
                            required
                            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <label className="block space-y-2 text-sm">
                        <span className="text-slate-300">Image URL</span>
                        <input
                            name="image"
                            type="url"
                            defaultValue={category.image || ""}
                            placeholder="https://example.com/image.jpg"
                            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <label className="block space-y-2 text-sm">
                        <span className="text-slate-300">Description</span>
                        <textarea
                            name="description"
                            rows={3}
                            defaultValue={category.description || ""}
                            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    {state.error && <p className="text-sm text-rose-400">{state.error}</p>}
                    {state.success && (
                        <p className="text-sm text-emerald-400">{state.success}</p>
                    )}

                    <div className="flex gap-2">
                        <SubmitButton
                            label="Save"
                            loadingLabel="Saving..."
                            className="bg-indigo-600 px-4 py-2 text-sm"
                        />
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                {category.category_name}
                            </h3>
                            {category.description && (
                                <p className="mt-1 text-sm text-slate-400">
                                    {category.description}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onEdit}
                                className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-white hover:bg-slate-700"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={onDelete}
                                className="rounded-lg bg-rose-600 px-3 py-1 text-xs text-white hover:bg-rose-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {category.image && (
                        <div className="mt-3">
                            <img
                                src={category.image}
                                alt={category.category_name}
                                className="h-32 w-full rounded-lg object-cover"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
