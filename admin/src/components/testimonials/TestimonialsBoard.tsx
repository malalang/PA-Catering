"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { HiOutlinePlus } from "react-icons/hi2";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import {
    type TestimonialActionState,
    createTestimonialAction,
    updateTestimonialAction,
    deleteTestimonialAction,
} from "@/lib/data/testimonials-actions";
import type { TestimonialRecord } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

type Props = {
    testimonials: TestimonialRecord[];
};

const initialState: TestimonialActionState = {};

export const TestimonialsBoard = ({ testimonials }: Props) => {
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const filtered = testimonials.filter(
        (testimonial) =>
            !search ||
            testimonial.text.toLowerCase().includes(search.toLowerCase()) ||
            testimonial.author.toLowerCase().includes(search.toLowerCase()),
    );

    const handleDelete = async () => {
        if (deleteId) {
            await deleteTestimonialAction(deleteId);
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <input
                    type="search"
                    placeholder="Search testimonials..."
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
                    <span className="whitespace-nowrap">Add Testimonial</span>
                </button>
            </div>

            {showCreateForm && (
                <CreateTestimonialForm onCancel={() => setShowCreateForm(false)} />
            )}

            <div className="grid gap-4 md:grid-cols-2">
                {filtered.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                        isEditing={editingId === testimonial.id}
                        onEdit={() => setEditingId(testimonial.id)}
                        onCancelEdit={() => setEditingId(null)}
                        onDelete={() => setDeleteId(testimonial.id)}
                    />
                ))}
            </div>

            <DeleteConfirmDialog
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Testimonial"
                message="Are you sure you want to delete this testimonial? This action cannot be undone."
            />
        </div>
    );
};

type CreateTestimonialFormProps = {
    onCancel: () => void;
};

const CreateTestimonialForm = ({ onCancel }: CreateTestimonialFormProps) => {
    const [state, formAction] = useFormState(createTestimonialAction, initialState);

    return (
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Create New Testimonial</h3>
            <form action={formAction} className="space-y-3">
                <label className="block space-y-2 text-sm">
                    <span className="text-yellow-300">Author *</span>
                    <input
                        name="author"
                        required
                        className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                    />
                </label>

                <label className="block space-y-2 text-sm">
                    <span className="text-yellow-300">Rating</span>
                    <select
                        name="rating"
                        defaultValue="5"
                        className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                    >
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </label>

                <label className="block space-y-2 text-sm">
                    <span className="text-yellow-300">Testimonial Text *</span>
                    <textarea
                        name="text"
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
                        label="Create Testimonial"
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

type TestimonialCardProps = {
    testimonial: TestimonialRecord;
    isEditing: boolean;
    onEdit: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
};

const TestimonialCard = ({
    testimonial,
    isEditing,
    onEdit,
    onCancelEdit,
    onDelete,
}: TestimonialCardProps) => {
    const [state, formAction] = useFormState(
        updateTestimonialAction,
        initialState,
    );

    return (
        <div className="rounded-2xl border border-white/10 bg-yellow-900/40 p-4">
            {isEditing ? (
                <form action={formAction} className="space-y-3">
                    <input type="hidden" name="id" value={testimonial.id} />

                    <label className="block space-y-2 text-sm">
                        <span className="text-yellow-300">Author</span>
                        <input
                            name="author"
                            defaultValue={testimonial.author}
                            required
                            className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <label className="block space-y-2 text-sm">
                        <span className="text-yellow-300">Rating</span>
                        <select
                            name="rating"
                            defaultValue={testimonial.rating}
                            className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        >
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                    </label>

                    <label className="block space-y-2 text-sm">
                        <span className="text-yellow-300">Testimonial Text</span>
                        <textarea
                            name="text"
                            rows={4}
                            defaultValue={testimonial.text}
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
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-white">{testimonial.author}</h3>
                                <div className="flex gap-0.5">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <span key={i} className="text-yellow-400">★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="mt-1 text-xs text-yellow-500">
                                {formatDistanceToNow(new Date(testimonial.created_at), {
                                    addSuffix: true,
                                })}
                            </p>
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

                    <p className="mt-3 text-sm text-yellow-300">{testimonial.text}</p>

                    <div className="mt-3 flex gap-4 text-xs text-yellow-500">
                        <span>{testimonial.likes.length} likes</span>
                        <span>{Array.isArray(testimonial.comments) ? testimonial.comments.length : 0} comments</span>
                    </div>
                </>
            )}
        </div>
    );
};
