import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProfileRecord } from "@/lib/types/database-records";

export const fetchProfiles = async (): Promise<ProfileRecord[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch profiles", error);
        return [];
    }

    return (data ?? []) as ProfileRecord[];
};
