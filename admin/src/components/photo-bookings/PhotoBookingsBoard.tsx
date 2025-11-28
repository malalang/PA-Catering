"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/forms/SubmitButton";
import {
    type PhotoBookingActionState,
    updatePhotoBookingAction,
} from "@/lib/data/photo-bookings-actions";
import type { PhotoBookingRecord } from "@/lib/types";
import { format } from "date-fns";

type Props = {
    bookings: PhotoBookingRecord[];
};

const initialState: PhotoBookingActionState = {};

export const PhotoBookingsBoard = ({ bookings }: Props) => {
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const filtered = bookings.filter(
        (booking) =>
            !search ||
            booking.name.toLowerCase().includes(search.toLowerCase()) ||
            booking.email.toLowerCase().includes(search.toLowerCase()) ||
            booking.package.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <input
                    type="search"
                    placeholder="Search bookings..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md rounded-full border border-white/10 bg-yellow-900/60 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                />
                <p className="text-xs uppercase tracking-[0.3em] text-yellow-500">
                    {filtered.length} bookings
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {filtered.map((booking) => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                        isEditing={editingId === booking.id}
                        onEdit={() => setEditingId(booking.id)}
                        onCancelEdit={() => setEditingId(null)}
                    />
                ))}
            </div>
        </div>
    );
};

type BookingCardProps = {
    booking: PhotoBookingRecord;
    isEditing: boolean;
    onEdit: () => void;
    onCancelEdit: () => void;
};

const BookingCard = ({
    booking,
    isEditing,
    onEdit,
    onCancelEdit,
}: BookingCardProps) => {
    const [state, formAction] = useFormState(
        updatePhotoBookingAction,
        initialState,
    );

    return (
        <div className="rounded-2xl border border-white/10 bg-yellow-900/40 p-4">
            {isEditing ? (
                <form action={formAction} className="space-y-3">
                    <input type="hidden" name="id" value={booking.id} />

                    <div className="grid gap-3 md:grid-cols-2">
                        <label className="space-y-2 text-sm">
                            <span className="text-yellow-300">Name</span>
                            <input
                                name="name"
                                defaultValue={booking.name}
                                required
                                className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                        <label className="space-y-2 text-sm">
                            <span className="text-yellow-300">Email</span>
                            <input
                                name="email"
                                type="email"
                                defaultValue={booking.email}
                                required
                                className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        <label className="space-y-2 text-sm">
                            <span className="text-yellow-300">Phone</span>
                            <input
                                name="phone"
                                defaultValue={booking.phone || ""}
                                className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                        <label className="space-y-2 text-sm">
                            <span className="text-yellow-300">Package</span>
                            <input
                                name="package"
                                defaultValue={booking.package}
                                required
                                className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                        <label className="space-y-2 text-sm">
                            <span className="text-yellow-300">Date</span>
                            <input
                                name="date"
                                type="date"
                                defaultValue={booking.date}
                                required
                                className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                        <label className="space-y-2 text-sm">
                            <span className="text-yellow-300">Time</span>
                            <input
                                name="time"
                                type="time"
                                defaultValue={booking.time}
                                required
                                className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                        <label className="space-y-2 text-sm">
                            <span className="text-yellow-300">People</span>
                            <input
                                name="people"
                                type="number"
                                min="1"
                                defaultValue={booking.people}
                                required
                                className="w-full rounded-lg border border-white/10 bg-yellow-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                    </div>

                    <label className="block space-y-2 text-sm">
                        <span className="text-yellow-300">Message</span>
                        <textarea
                            name="message"
                            rows={2}
                            defaultValue={booking.message || ""}
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
                        <div>
                            <h3 className="font-semibold text-white">{booking.name}</h3>
                            <p className="text-sm text-yellow-400">{booking.email}</p>
                            {booking.phone && (
                                <p className="text-sm text-yellow-500">{booking.phone}</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={onEdit}
                            className="rounded-lg bg-yellow-800 px-3 py-1 text-xs text-white hover:bg-yellow-700"
                        >
                            Edit
                        </button>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-yellow-500">Package:</span>
                            <span className="font-medium text-white">{booking.package}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-yellow-500">Date:</span>
                            <span className="text-white">
                                {format(new Date(booking.date), "PPP")}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-yellow-500">Time:</span>
                            <span className="text-white">{booking.time}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-yellow-500">People:</span>
                            <span className="text-white">{booking.people}</span>
                        </div>
                    </div>

                    {booking.message && (
                        <div className="mt-3 rounded-lg bg-yellow-950/40 p-3">
                            <p className="text-xs uppercase tracking-[0.3em] text-yellow-500">
                                Message
                            </p>
                            <p className="mt-1 text-sm text-yellow-300">{booking.message}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
