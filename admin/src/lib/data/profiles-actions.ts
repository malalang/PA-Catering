"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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
    const updateData = {
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

    // Sync with admins table
    if (role === 'admin') {
        const { error: adminError } = await supabase
            .from('admins')
            .upsert({ user_id: id }, { onConflict: 'user_id' });

        if (adminError) {
            console.error("Failed to add to admins table", adminError);
            // Optional: revert profile update or return warning
        }
    } else {
        const { error: adminError } = await supabase
            .from('admins')
            .delete()
            .eq('user_id', id);

        if (adminError) {
            console.error("Failed to remove from admins table", adminError);
        }
    }

    revalidatePath("/profiles");
    return { success: "Profile updated successfully." };
};
