import { DashboardShell } from "@/components/layout/DashboardShell";
import { FeaturedItemsBoard } from "@/components/featured-items/FeaturedItemsBoard";
import { fetchFeaturedItems } from "@/lib/data/testimonials";

export default async function FeaturedItemsPage() {
    const items = await fetchFeaturedItems();

    return (
        <DashboardShell
            title="Featured Items"
            description="Manage featured menu items showcased to customers."
        >
            <FeaturedItemsBoard items={items} />
        </DashboardShell>
    );
}
