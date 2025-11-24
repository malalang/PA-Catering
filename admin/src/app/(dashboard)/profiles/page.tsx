import { DashboardShell } from "@/components/layout/DashboardShell";
import { ProfilesBoard } from "@/components/profiles/ProfilesBoard";
import { fetchProfiles } from "@/lib/data/profiles";

export default async function ProfilesPage() {
    const profiles = await fetchProfiles();

    return (
        <DashboardShell
            title="User Profiles"
            description="Manage customer profiles, roles, and account information."
        >
            <ProfilesBoard profiles={profiles} />
        </DashboardShell>
    );
}
