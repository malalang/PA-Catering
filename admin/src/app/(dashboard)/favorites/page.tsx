import { DashboardShell } from "@/components/layout/DashboardShell";
import { FavoritesBoard } from "@/components/favorites/FavoritesBoard";
import { fetchUserFavorites } from "@/lib/data/favorites";

export default async function FavoritesPage() {
    const favorites = await fetchUserFavorites();

    return (
        <DashboardShell
            title="User Favorites"
            description="View all user favorite products and preferences."
        >
            <FavoritesBoard favorites={favorites} />
        </DashboardShell>
    );
}
