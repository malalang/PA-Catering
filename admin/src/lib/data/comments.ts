import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CommentRecord } from "@/lib/types/database-records";

export const fetchComments = async (): Promise<CommentRecord[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch comments", error);
        return [];
    }

    return (data ?? []) as CommentRecord[];
};
