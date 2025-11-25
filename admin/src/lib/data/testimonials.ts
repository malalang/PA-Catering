import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { TestimonialRecord, FeaturedItemRecord } from "@/lib/types";

export const fetchTestimonials = async (): Promise<TestimonialRecord[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch testimonials", error);
        return [];
    }

    return (data ?? []) as TestimonialRecord[];
};

export const fetchFeaturedItems = async (): Promise<FeaturedItemRecord[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("featured_items")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch featured items", error);
        return [];
    }

    return (data ?? []) as FeaturedItemRecord[];
};
