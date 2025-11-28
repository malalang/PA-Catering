"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { HiOutlinePlus } from "react-icons/hi2";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import {
    type FeaturedItemActionState,
    createFeaturedItemAction,
    updateFeaturedItemAction,
    deleteFeaturedItemAction,
} from "@/lib/data/testimonials-actions";
import type { FeaturedItemRecord } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

type Props = {
    items: FeaturedItemRecord[];
};

const initialState: FeaturedItemActionState = {};

export const FeaturedItemsBoard = ({ items }: Props) => {
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const filtered = items.filter(
        (item) =>
            !search ||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase()),
    );

    const handleDelete = async () => {
        if (deleteId) {
            await deleteFeaturedItemAction(deleteId);
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <input
                    type="search"
                    placeholder="Search featured items..."
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
                    <span className="whitespace-nowrap">Add Featured Item</span>
                </button>
            </div>

            {showCreateForm && (
                <CreateFeaturedItemForm onCancel={() => setShowCreateForm(false)} />
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item) => (
                    <FeaturedItemCard
                        key={item.id}
                        item={item}
                        isEditing={editingId === item.id}
                        onEdit={() => setEditingId(item.id)}
                        onCancelEdit={() => setEditingId(null)}
                        onDelete={() => setDeleteId(item.id)}
                    />
                ))}
            </div>

            <DeleteConfirmDialog
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Featured Item"
                message="Are you sure you want to delete this featured item? This action cannot be undone."
            />
        </div>
    );
};

type CreateFeaturedItemFormProps = {
    onCancel: () => void;
};

const CreateFeaturedItemForm = ({ onCancel }: CreateFeaturedItemFormProps) => {
    const [state, formAction] = useFormState(createFeaturedItemAction, initialState);

    return (
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Create New Featured Item</h3>
            <form action={formAction} className="space-y-3">
                <label className="block space-y-2 text-sm">
                    <span className="text-yellow-300">Name *</span>
                    <input
                        name="name"
                        required
                        className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                    />
                </label>

                <label className="block space-y-2 text-sm">
                    <span className="text-yellow-300">Image URL</span>
                    <input
                        name="image_url"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                    />
                </label>

                <label className="block space-y-2 text-sm">
                    <span className="text-yellow-300">Description *</span>
                    <textarea
                        name="description"
                        rows={4}
                        required
                        className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                    />
                </label>

                {state.error && <p className="text-sm text-rose-400">{state.error}</p>}
                {state.success && (
                    <p className="text-sm text-emerald-400">{state.success}</p>
                )}

                <div className="flex gap-2">
                    <SubmitButton
                        label="Create Featured Item"
                        loadingLabel="Creating..."
                        className="bg-indigo-600 px-4 py-2 text-sm"
                    />
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg bg-yellow-800 px-4 py-2 text-sm text-white hover:bg-yellow-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

type FeaturedItemCardProps = {
    item: FeaturedItemRecord;
    isEditing: boolean;
    onEdit: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
};

const FeaturedItemCard = ({
    item,
    isEditing,
    onEdit,
    onCancelEdit,
    onDelete,
}: FeaturedItemCardProps) => {
    const [state, formAction] = useFormState(
        updateFeaturedItemAction,
        initialState,
    );

    return (
        <div className="rounded-2xl border border-white/10 bg-yellow-900/40 p-4">
            {isEditing ? (
                <form action={formAction} className="space-y-3">
                    <input type="hidden" name="id" value={item.id} />

                    <label className="block space-y-2 text-sm">
                        <span className="text-yellow-300">Name</span>
                        <input
                            name="name"
                            defaultValue={item.name}
                            required
                            className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <label className="block space-y-2 text-sm">
                        <span className="text-yellow-300">Image URL</span>
                        <input
                            name="image_url"
                            type="url"
                            defaultValue={item.image_url || ""}
                            placeholder="https://example.com/image.jpg"
                            className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <label className="block space-y-2 text-sm">
                        <span className="text-yellow-300">Description</span>
                        <textarea
                            name="description"
                            rows={4}
                            defaultValue={item.description}
                            required
                            className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
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
                            className="rounded-lg bg-yellow-800 px-4 py-2 text-sm text-white hover:bg-yellow-700"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    {item.image_url && (
                        <div className="mb-3">
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="h-48 w-full rounded-lg object-cover"
                            />
                        </div>
                    )}

                    <div className="flex items-start justify-between">
                        <h3 className="flex-1 text-lg font-semibold text-white">{item.name}</h3>
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

                    <p className="mt-3 text-sm text-yellow-300">{item.description}</p>

                    <div className="mt-3 flex justify-between text-xs text-yellow-500">
                        <div className="flex gap-4">
                            <span>{item.likes.length} likes</span>
                            <span>{Array.isArray(item.comments) ? item.comments.length : 0} comments</span>
                        </div>
                        <span>
                            {formatDistanceToNow(new Date(item.created_at), {
                                addSuffix: true,
                            })}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};
