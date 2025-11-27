import { createSupabaseBrowserClient } from "./client";

export const STORAGE_BUCKET = "pa-luxe-creation";

export const uploadImage = async (file: File, path: string) => {
    const supabase = createSupabaseBrowserClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

    return data.publicUrl;
};
