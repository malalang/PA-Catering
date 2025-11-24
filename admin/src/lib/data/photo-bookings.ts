import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PhotoBookingRecord } from "@/lib/types/database-records";

export const fetchPhotoBookings = async (): Promise<PhotoBookingRecord[]> => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from("photo_boot_bookings")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch photo bookings", error);
        return [];
    }

    return (data ?? []) as PhotoBookingRecord[];
};
