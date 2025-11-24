import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CategoryRecord } from "@/lib/types/database-records";

export const fetchCategories = async (): Promise<CategoryRecord[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("products_category")
        .select("*")
        .order("category_name", { ascending: true });

    if (error) {
        console.error("Failed to fetch categories", error);
        return [];
    }

    return (data ?? []) as CategoryRecord[];
};
