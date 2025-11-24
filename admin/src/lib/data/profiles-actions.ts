"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

export type ProfileActionState = {
    error?: string;
    success?: string;
};

const sanitize = (value: FormDataEntryValue | null) =>
    String(value ?? "").trim();

export const updateProfileAction = async (
    _prev: ProfileActionState,
    formData: FormData,
): Promise<ProfileActionState> => {
    const id = sanitize(formData.get("id"));
    const displayName = sanitize(formData.get("display_name")) || null;
    const phone = sanitize(formData.get("phone")) || null;
    const address = sanitize(formData.get("address")) || null;
    const city = sanitize(formData.get("city")) || null;
    const state = sanitize(formData.get("state")) || null;
    const zipCode = sanitize(formData.get("zip_code")) || null;
    const country = sanitize(formData.get("country")) || null;
    const role = sanitize(formData.get("role")) || "customer";

    if (!id) {
        return { error: "Profile ID is required." };
    }

    const supabase = await createSupabaseServerClient();
    const updateData: Database["public"]["Tables"]["profiles"]["Update"] = {
        display_name: displayName,
        phone,
        address,
        city,
        state,
        zip_code: zipCode,
        country,
        role,
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from("profiles")
        .update(updateData as never)
        .eq("id", id);

    if (error) {
        console.error("Failed to update profile", error);
        return { error: error.message };
    }

    revalidatePath("/profiles");
    return { success: "Profile updated successfully." };
};
