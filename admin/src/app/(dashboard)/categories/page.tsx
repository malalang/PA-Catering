import { DashboardShell } from "@/components/layout/DashboardShell";
import { CategoriesBoard } from "@/components/categories/CategoriesBoard";
import { fetchCategories } from "@/lib/data/categories";

export default async function CategoriesPage() {
    const categories = await fetchCategories();

    return (
        <DashboardShell
            title="Product Categories"
            description="Manage product categories for menu organization."
        >
            <CategoriesBoard categories={categories} />
        </DashboardShell>
    );
}
