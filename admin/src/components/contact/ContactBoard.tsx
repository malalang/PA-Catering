"use client";

import { useState } from "react";
import type { ContactRecord } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

type Props = {
    contacts: ContactRecord[];
};

export const ContactBoard = ({ contacts }: Props) => {
    const [search, setSearch] = useState("");
    const [selectedContact, setSelectedContact] = useState<ContactRecord | null>(
        null,
    );

    const filtered = contacts.filter(
        (contact) =>
            !search ||
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase()) ||
            contact.message.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <input
                    type="search"
                    placeholder="Search contact submissions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md rounded-full border border-white/10 bg-yellow-900/60 px-4 py-3 text-white outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40"
                />
                <p className="text-xs uppercase tracking-[0.3em] text-yellow-500">
                    {filtered.length} submissions
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((contact) => (
                    <div
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className="cursor-pointer rounded-2xl border border-white/10 bg-yellow-900/40 p-4 transition-colors hover:bg-yellow-900/60"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-white">{contact.name}</h3>
                                <p className="text-sm text-yellow-400">{contact.email}</p>
                                {contact.phone && (
                                    <p className="text-sm text-yellow-500">{contact.phone}</p>
                                )}
                            </div>
                            <p className="text-xs text-yellow-500">
                                {formatDistanceToNow(new Date(contact.created_at), {
                                    addSuffix: true,
                                })}
                            </p>
                        </div>
                        <p className="mt-3 line-clamp-2 text-sm text-yellow-300">
                            {contact.message}
                        </p>
                    </div>
                ))}
            </div>

            {selectedContact && (
                <ContactDetailModal
                    contact={selectedContact}
                    onClose={() => setSelectedContact(null)}
                />
            )}
        </div>
    );
};

type ContactDetailModalProps = {
    contact: ContactRecord;
    onClose: () => void;
};

const ContactDetailModal = ({ contact, onClose }: ContactDetailModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-yellow-900 p-6 shadow-2xl">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-white">{contact.name}</h3>
                        <p className="text-sm text-yellow-400">{contact.email}</p>
                        {contact.phone && (
                            <p className="text-sm text-yellow-400">{contact.phone}</p>
                        )}
                        <p className="mt-1 text-xs text-yellow-500">
                            Submitted{" "}
                            {formatDistanceToNow(new Date(contact.created_at), {
                                addSuffix: true,
                            })}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-yellow-800 px-4 py-2 text-sm text-white hover:bg-yellow-700"
                    >
                        Close
                    </button>
                </div>

                <div className="mt-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-yellow-500">
                        Message
                    </p>
                    <div className="mt-2 rounded-xl border border-white/10 bg-yellow-950/40 p-4">
                        <p className="whitespace-pre-wrap text-sm text-yellow-200">
                            {contact.message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
