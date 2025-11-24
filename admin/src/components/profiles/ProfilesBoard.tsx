"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/forms/SubmitButton";
import {
    type ProfileActionState,
    updateProfileAction,
} from "@/lib/data/profiles-actions";
import type { ProfileRecord } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

type Props = {
    profiles: ProfileRecord[];
};

const initialState: ProfileActionState = {};

export const ProfilesBoard = ({ profiles }: Props) => {
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const filtered = profiles.filter(
        (profile) =>
            !search ||
            profile.display_name?.toLowerCase().includes(search.toLowerCase()) ||
            profile.email?.toLowerCase().includes(search.toLowerCase()) ||
            profile.uid?.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <input
                    type="search"
                    placeholder="Search profiles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md rounded-full border border-white/10 bg-slate-900/60 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                />
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {filtered.length} profiles
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {filtered.map((profile) => (
                    <ProfileCard
                        key={profile.id}
                        profile={profile}
                        isEditing={editingId === profile.id}
                        onEdit={() => setEditingId(profile.id)}
                        onCancelEdit={() => setEditingId(null)}
                    />
                ))}
            </div>
        </div>
    );
};

type ProfileCardProps = {
    profile: ProfileRecord;
    isEditing: boolean;
    onEdit: () => void;
    onCancelEdit: () => void;
};

const ProfileCard = ({
    profile,
    isEditing,
    onEdit,
    onCancelEdit,
}: ProfileCardProps) => {
    const [state, formAction] = useFormState(updateProfileAction, initialState);

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            {isEditing ? (
                <form action={formAction} className="space-y-3">
                    <input type="hidden" name="id" value={profile.id} />

                    <div className="grid gap-3 md:grid-cols-2">
                        <label className="space-y-2 text-sm">
                            <span className="text-slate-300">Display Name</span>
                            <input
                                name="display_name"
                                defaultValue={profile.display_name || ""}
                                className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                        <label className="space-y-2 text-sm">
                            <span className="text-slate-300">Phone</span>
                            <input
                                name="phone"
                                defaultValue={profile.phone || ""}
                                className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                    </div>

                    <label className="block space-y-2 text-sm">
                        <span className="text-slate-300">Role</span>
                        <select
                            name="role"
                            defaultValue={profile.role}
                            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>

                    <label className="block space-y-2 text-sm">
                        <span className="text-slate-300">Address</span>
                        <input
                            name="address"
                            defaultValue={profile.address || ""}
                            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                        />
                    </label>

                    <div className="grid gap-3 md:grid-cols-3">
                        <label className="space-y-2 text-sm">
                            <span className="text-slate-300">City</span>
                            <input
                                name="city"
                                defaultValue={profile.city || ""}
                                className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                        <label className="space-y-2 text-sm">
                            <span className="text-slate-300">State</span>
                            <input
                                name="state"
                                defaultValue={profile.state || ""}
                                className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                        <label className="space-y-2 text-sm">
                            <span className="text-slate-300">Zip Code</span>
                            <input
                                name="zip_code"
                                defaultValue={profile.zip_code || ""}
                                className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                            />
                        </label>
                    </div>

                    <label className="block space-y-2 text-sm">
                        <span className="text-slate-300">Country</span>
                        <input
                            name="country"
                            defaultValue={profile.country || ""}
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
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-white">
                                    {profile.display_name || "No name"}
                                </h3>
                                <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs font-medium uppercase text-indigo-300">
                                    {profile.role}
                                </span>
                            </div>
                            <p className="text-sm text-slate-400">{profile.email}</p>
                            {profile.phone && (
                                <p className="text-sm text-slate-500">{profile.phone}</p>
                            )}
                            <p className="mt-1 text-xs text-slate-600">
                                Last login:{" "}
                                {profile.last_login
                                    ? formatDistanceToNow(new Date(profile.last_login), {
                                        addSuffix: true,
                                    })
                                    : "Never"}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onEdit}
                            className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-white hover:bg-slate-700"
                        >
                            Edit
                        </button>
                    </div>

                    {profile.address && (
                        <div className="mt-3 text-sm text-slate-400">
                            <p>{profile.address}</p>
                            <p>
                                {[profile.city, profile.state, profile.zip_code]
                                    .filter(Boolean)
                                    .join(", ")}
                            </p>
                            {profile.country && <p>{profile.country}</p>}
                        </div>
                    )}

                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <p className="text-xs text-slate-500">Loyalty Points</p>
                            <p className="font-semibold text-white">
                                {profile.loyalty_points_balance}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Tier Status</p>
                            <p className="font-semibold text-white">{profile.tier_status}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
