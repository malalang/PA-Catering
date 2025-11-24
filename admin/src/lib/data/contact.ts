import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ContactRecord } from "@/lib/types/database-records";

export const fetchContactSubmissions = async (): Promise<ContactRecord[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("contact")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch contact submissions", error);
        return [];
    }

    return (data ?? []) as ContactRecord[];
};
