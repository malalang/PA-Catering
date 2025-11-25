"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import {
    type FeaturedItemActionState,
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
                    className="w-full max-w-md rounded-full border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                />
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {filtered.length} items
                </p>
            </div>

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
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            {isEditing ? (
                <form action={formAction} className="space-y-3">
                    <input type="hidden" name="id" value={item.id} />

                    <label className="block space-y-2 text-sm">
                        <span className="text-slate-300">Name</span>
                        <input
                            name="name"
                            defaultValue={item.name}
                            required
                            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <label className="block space-y-2 text-sm">
                        <span className="text-slate-300">Image URL</span>
                        <input
                            name="image_url"
                            type="url"
                            defaultValue={item.image_url || ""}
                            placeholder="https://example.com/image.jpg"
                            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <label className="block space-y-2 text-sm">
                        <span className="text-slate-300">Description</span>
                        <textarea
                            name="description"
                            rows={4}
                            defaultValue={item.description}
                            required
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
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
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

                    {item.image_url && (
                        <div className="mt-3">
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="h-40 w-full rounded-lg object-cover"
                            />
                        </div>
                    )}

                    <p className="mt-3 text-sm text-slate-300">{item.description}</p>

                    <div className="mt-3 flex justify-between text-xs text-slate-500">
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
