import { DashboardShell } from "@/components/layout/DashboardShell";
import { ProfilesBoard } from "@/components/profiles/ProfilesBoard";
import { fetchProfiles } from "@/lib/data/profiles";
import { fetchProfileOrders, fetchProfileFavorites } from "@/lib/data/profile-details";

export default async function ProfilesPage() {
    const profiles = await fetchProfiles();

    const handleViewProfile = async (profileId: string) => {
        "use server";
        const profile = profiles.find((p) => p.id === profileId);
        if (!profile) {
            return { profile: {} as any, orders: [], favorites: [] };
        }

        const [orders, favorites] = await Promise.all([
            fetchProfileOrders(profileId),
            fetchProfileFavorites(profileId),
        ]);

        return { profile, orders, favorites };
    };

    return (
        <DashboardShell
            title="User profiles"
            description="Manage customer accounts, view order history, and track loyalty status."
        >
            <ProfilesBoard profiles={profiles} onViewProfile={handleViewProfile} />
        </DashboardShell>
    );
}
