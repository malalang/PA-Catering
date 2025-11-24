"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

export type PhotoBookingActionState = {
    error?: string;
    success?: string;
};

const sanitize = (value: FormDataEntryValue | null) =>
    String(value ?? "").trim();

export const createPhotoBookingAction = async (
    _prev: PhotoBookingActionState,
    formData: FormData,
): Promise<PhotoBookingActionState> => {
    const name = sanitize(formData.get("name"));
    const email = sanitize(formData.get("email"));
    const phone = sanitize(formData.get("phone")) || null;
    const date = sanitize(formData.get("date"));
    const time = sanitize(formData.get("time"));
    const packageType = sanitize(formData.get("package"));
    const people = Number(formData.get("people") ?? 1);
    const message = sanitize(formData.get("message")) || null;

    if (!name || !email || !date || !time || !packageType) {
        return { error: "Name, email, date, time, and package are required." };
    }

    if (Number.isNaN(people) || people <= 0) {
        return { error: "Number of people must be greater than zero." };
    }

    const supabase = await createSupabaseServerClient();
    const bookingData: Database["public"]["Tables"]["photo_boot_bookings"]["Insert"] = {
        name,
        email,
        phone,
        date,
        time,
        package: packageType,
        people,
        message,
    };

    const { error } = await supabase
        .from("photo_boot_bookings")
        .insert(bookingData as never);

    if (error) {
        console.error("Failed to create photo booking", error);
        return { error: error.message };
    }

    revalidatePath("/photo-bookings");
    return { success: "Photo booth booking created successfully." };
};

export const updatePhotoBookingAction = async (
    _prev: PhotoBookingActionState,
    formData: FormData,
): Promise<PhotoBookingActionState> => {
    const id = sanitize(formData.get("id"));
    const name = sanitize(formData.get("name"));
    const email = sanitize(formData.get("email"));
    const phone = sanitize(formData.get("phone")) || null;
    const date = sanitize(formData.get("date"));
    const time = sanitize(formData.get("time"));
    const packageType = sanitize(formData.get("package"));
    const people = Number(formData.get("people") ?? 1);
    const message = sanitize(formData.get("message")) || null;

    if (!id || !name || !email || !date || !time || !packageType) {
        return { error: "All required fields must be provided." };
    }

    const supabase = await createSupabaseServerClient();
    const updateData: Database["public"]["Tables"]["photo_boot_bookings"]["Update"] = {
        name,
        email,
        phone,
        date,
        time,
        package: packageType,
        people,
        message,
    };

    const { error } = await supabase
        .from("photo_boot_bookings")
        .update(updateData as never)
        .eq("id", id);

    if (error) {
        console.error("Failed to update photo booking", error);
        return { error: error.message };
    }

    revalidatePath("/photo-bookings");
    return { success: "Photo booth booking updated successfully." };
};
