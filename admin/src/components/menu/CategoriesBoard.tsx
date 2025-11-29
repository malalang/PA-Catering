"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { HiOutlinePlus, HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import { ImageUpload } from "@/components/forms/ImageUpload";
import {
    type CategoryActionState,
    createCategoryAction,
    updateCategoryAction,
    deleteCategoryAction,
} from "@/lib/data/categories-actions";
import type { CategoryRecord } from "@/lib/types";
import { deleteImage } from "@/lib/supabase/storage";

type Props = {
    categories: CategoryRecord[];
};

const initialState: CategoryActionState = {};

export const CategoriesBoard = ({ categories }: Props) => {
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

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
        <div className="rounded-2xl border border-white/10 bg-yellow-950/40 p-6">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white">Categories</h2>
                    <p className="mt-1 text-sm text-yellow-400">
                        Manage menu categories and organize your products
                        {!isExpanded && ` • ${categories.length} categories`}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 rounded-lg bg-yellow-800 px-4 py-2 text-sm text-white hover:bg-yellow-700"
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
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <input
                            type="search"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full max-w-md rounded-full border border-white/10 bg-yellow-900/60 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCreateForm(true)}
                            className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                            <HiOutlinePlus className="h-5 w-5" />
                            <span className="whitespace-nowrap">Add Category</span>
                        </button>
                    </div>

                    {showCreateForm && (
                        <CreateCategoryForm onCancel={() => setShowCreateForm(false)} />
                    )}

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
            )}
        </div>
    );
};

type CreateCategoryFormProps = {
    onCancel: () => void;
};

const CreateCategoryForm = ({ onCancel }: CreateCategoryFormProps) => {
    const [state, formAction] = useFormState(createCategoryAction, initialState);
    const [uploadedPath, setUploadedPath] = useState<string>("");

    const handleCancel = async () => {
        if (uploadedPath) {
            try {
                await deleteImage(uploadedPath);
            } catch (error) {
                console.error("Failed to delete uploaded image:", error);
            }
        }
        onCancel();
    };

    return (
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Create New Category</h3>
            <form action={formAction} className="space-y-3">
                <label className="block space-y-2 text-sm">
                    <span className="text-yellow-300">Category Name *</span>
                    <input
                        name="category_name"
                        required
                        className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                    />
                </label>

                <label className="block space-y-2 text-sm">
                    <span className="text-yellow-300">Category Image</span>
                    <ImageUpload
                        onChange={(url, path) => setUploadedPath(path || "")}
                        folder="categories"
                        fieldName="image"
                    />
                </label>

                <label className="block space-y-2 text-sm">
                    <span className="text-yellow-300">Description</span>
                    <textarea
                        name="description"
                        rows={3}
                        className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                    />
                </label>

                <label className="flex items-center gap-2 text-sm">
                    <input
                        name="is_hidden"
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/10 bg-yellow-900/60 text-indigo-600 focus:ring-2 focus:ring-indigo-400/40"
                    />
                    <span className="text-yellow-300">Hide this category from public view</span>
                </label>

                {state.error && <p className="text-sm text-rose-400">{state.error}</p>}
                {state.success && (
                    <p className="text-sm text-emerald-400">{state.success}</p>
                )}

                <div className="flex gap-2">
                    <SubmitButton
                        label="Create Category"
                        loadingLabel="Creating..."
                        className="bg-indigo-600 px-4 py-2 text-sm"
                    />
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-lg bg-yellow-800 px-4 py-2 text-sm text-white hover:bg-yellow-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
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
    const [uploadedPath, setUploadedPath] = useState<string>("");

    const handleCancel = async () => {
        if (uploadedPath) {
            try {
                await deleteImage(uploadedPath);
            } catch (error) {
                console.error("Failed to delete uploaded image:", error);
            }
        }
        onCancelEdit();
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-yellow-900/40 p-4">
            {isEditing ? (
                <form action={formAction} className="space-y-3">
                    <input type="hidden" name="id" value={category.id} />

                    <label className="block space-y-2 text-sm">
                        <span className="text-yellow-300">Category Name</span>
                        <input
                            name="category_name"
                            defaultValue={category.category_name}
                            required
                            className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <label className="block space-y-2 text-sm">
                        <span className="text-yellow-300">Category Image</span>
                        <ImageUpload
                            defaultValue={category.image}
                            onChange={(url, path) => setUploadedPath(path || "")}
                            folder="categories"
                            fieldName="image"
                        />
                    </label>

                    <label className="block space-y-2 text-sm">
                        <span className="text-yellow-300">Description</span>
                        <textarea
                            name="description"
                            rows={3}
                            defaultValue={category.description || ""}
                            className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            name="is_hidden"
                            type="checkbox"
                            defaultChecked={category.is_hidden ?? false}
                            className="h-4 w-4 rounded border-white/10 bg-yellow-900/60 text-indigo-600 focus:ring-2 focus:ring-indigo-400/40"
                        />
                        <span className="text-yellow-300">Hide this category from public view</span>
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
                            onClick={handleCancel}
                            className="rounded-lg bg-yellow-800 px-4 py-2 text-sm text-white hover:bg-yellow-700"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    {category.image && (
                        <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/20">
                            <Image
                                src={category.image}
                                alt={category.category_name}
                                fill
                                className="rounded-lg object-contain transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                    )}

                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                {category.category_name}
                                {category.is_hidden && (
                                    <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-yellow-500">
                                        Hidden
                                    </span>
                                )}
                            </h3>
                            {category.description && (
                                <p className="mt-1 text-sm text-yellow-400">
                                    {category.description}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onEdit}
                                className="rounded-lg bg-yellow-800 px-3 py-1 text-xs text-white hover:bg-yellow-700"
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
                </>
            )}
        </div>
    );
};
