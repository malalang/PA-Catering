"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

export type CommentActionState = {
    error?: string;
    success?: string;
};

const sanitize = (value: FormDataEntryValue | null) =>
    String(value ?? "").trim();

export const createCommentAction = async (
    _prev: CommentActionState,
    formData: FormData,
): Promise<CommentActionState> => {
    const productId = sanitize(formData.get("product_id"));
    const userId = sanitize(formData.get("user_id")) || null;
    const userName = sanitize(formData.get("user_name")) || null;
    const body = sanitize(formData.get("body"));

    if (!body) {
        return { error: "Comment body is required." };
    }

    const supabase = await createSupabaseServerClient();
    const commentData: Database["public"]["Tables"]["comments"]["Insert"] = {
        product_id: productId || null,
        user_id: userId,
        user_name: userName,
        body,
    };

    const { error } = await supabase.from("comments").insert(commentData as never);

    if (error) {
        console.error("Failed to create comment", error);
        return { error: error.message };
    }

    revalidatePath("/comments");
    return { success: "Comment created successfully." };
};

export const updateCommentAction = async (
    _prev: CommentActionState,
    formData: FormData,
): Promise<CommentActionState> => {
    const id = sanitize(formData.get("id"));
    const body = sanitize(formData.get("body"));
    const userName = sanitize(formData.get("user_name")) || null;

    if (!id || !body) {
        return { error: "Comment ID and body are required." };
    }

    const supabase = await createSupabaseServerClient();
    const updateData: Database["public"]["Tables"]["comments"]["Update"] = {
        body,
        user_name: userName,
    };

    const { error } = await supabase
        .from("comments")
        .update(updateData as never)
        .eq("id", id);

    if (error) {
        console.error("Failed to update comment", error);
        return { error: error.message };
    }

    revalidatePath("/comments");
    return { success: "Comment updated successfully." };
};

export const deleteCommentAction = async (
    commentId: string,
): Promise<CommentActionState> => {
    if (!commentId) {
        return { error: "Comment ID is required." };
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("comments").delete().eq("id", commentId);

    if (error) {
        console.error("Failed to delete comment", error);
        return { error: error.message };
    }

    revalidatePath("/comments");
    return { success: "Comment deleted successfully." };
};
