import { DashboardShell } from "@/components/layout/DashboardShell";
import { PhotoBookingsBoard } from "@/components/photo-bookings/PhotoBookingsBoard";
import { fetchPhotoBookings } from "@/lib/data/photo-bookings";

export default async function PhotoBookingsPage() {
    const bookings = await fetchPhotoBookings();

    return (
        <DashboardShell
            title="360 Photo Booth Bookings"
            description="Manage all photo booth booking requests and reservations."
        >
            <PhotoBookingsBoard bookings={bookings} />
        </DashboardShell>
    );
}
