import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { OrderRecord } from "@/lib/types";

export const fetchProfileOrders = async (profileId: string): Promise<OrderRecord[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", profileId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch profile orders", error);
        return [];
    }

    return (data ?? []) as OrderRecord[];
};

export const fetchProfileFavorites = async (profileId: string) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("user_favorites")
        .select(`
      *,
      products (
        id,
        name,
        image_url,
        price
      )
    `)
        .eq("user_id", profileId);

    if (error) {
        console.error("Failed to fetch profile favorites", error);
        return [];
    }

    return data ?? [];
};
