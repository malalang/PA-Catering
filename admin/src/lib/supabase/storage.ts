import { createSupabaseBrowserClient } from "./client";

export const STORAGE_BUCKET = "pa-luxe-creation";

export const uploadImage = async (file: File, path: string) => {
    const supabase = createSupabaseBrowserClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    console.log("Uploading file to path:", filePath);
    const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file);

    if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
    console.log("Uploaded file public URL:", data.publicUrl);

    return data.publicUrl;
};

export const deleteImage = async (urlOrPath: string) => {
    console.log("Deleting image:", urlOrPath);
    const supabase = createSupabaseBrowserClient();

    // Extract path from URL if a full URL was provided
    let filePath = urlOrPath;
    if (urlOrPath.includes(STORAGE_BUCKET)) {
        const parts = urlOrPath.split(`${STORAGE_BUCKET}/`);
        filePath = parts[parts.length - 1];
    }
    console.log("Parsed file path for deletion:", filePath);

    const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([filePath]);

    if (error) {
        console.error("Failed to delete image:", error);
        throw error;
    }
    console.log("Image deleted successfully");
};
