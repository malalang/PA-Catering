"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import {
    type CommentActionState,
    updateCommentAction,
    deleteCommentAction,
} from "@/lib/data/comments-actions";
import type { CommentRecord } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

type Props = {
    comments: CommentRecord[];
};

const initialState: CommentActionState = {};

export const CommentsBoard = ({ comments }: Props) => {
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const filtered = comments.filter(
        (comment) =>
            !search ||
            comment.body.toLowerCase().includes(search.toLowerCase()) ||
            comment.user_name?.toLowerCase().includes(search.toLowerCase()),
    );

    const handleDelete = async () => {
        if (deleteId) {
            await deleteCommentAction(deleteId);
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <input
                    type="search"
                    placeholder="Search comments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md rounded-full border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                />
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {filtered.length} comments
                </p>
            </div>

            <div className="space-y-3">
                {filtered.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        isEditing={editingId === comment.id}
                        onEdit={() => setEditingId(comment.id)}
                        onCancelEdit={() => setEditingId(null)}
                        onDelete={() => setDeleteId(comment.id)}
                    />
                ))}
            </div>

            <DeleteConfirmDialog
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Comment"
                message="Are you sure you want to delete this comment? This action cannot be undone."
            />
        </div>
    );
};

type CommentCardProps = {
    comment: CommentRecord;
    isEditing: boolean;
    onEdit: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
};

const CommentCard = ({
    comment,
    isEditing,
    onEdit,
    onCancelEdit,
    onDelete,
}: CommentCardProps) => {
    const [state, formAction] = useFormState(updateCommentAction, initialState);

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white">
                            {comment.user_name || "Anonymous"}
                        </p>
                        <p className="text-xs text-slate-500">
                            {formatDistanceToNow(new Date(comment.created_at), {
                                addSuffix: true,
                            })}
                        </p>
                    </div>

                    {isEditing ? (
                        <form action={formAction} className="mt-3 space-y-3">
                            <input type="hidden" name="id" value={comment.id} />
                            <textarea
                                name="body"
                                defaultValue={comment.body}
                                rows={3}
                                className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                            <input
                                name="user_name"
                                defaultValue={comment.user_name || ""}
                                placeholder="User name"
                                className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                            {state.error && (
                                <p className="text-sm text-rose-400">{state.error}</p>
                            )}
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
                        <p className="mt-2 text-sm text-slate-300">{comment.body}</p>
                    )}
                </div>

                {!isEditing && (
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
                )}
            </div>
        </div>
    );
};
