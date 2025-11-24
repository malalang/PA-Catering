import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { UserFavoriteRecord } from "@/lib/types/database-records";

export const fetchUserFavorites = async (): Promise<UserFavoriteRecord[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("user_favorites")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch user favorites", error);
        return [];
    }

    return (data ?? []) as UserFavoriteRecord[];
};
