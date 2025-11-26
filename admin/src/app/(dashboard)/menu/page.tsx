import { DashboardShell } from "@/components/layout/DashboardShell";
import { AddProductPanel } from "@/components/menu/AddProductPanel";
import { ProductBoard } from "@/components/menu/ProductBoard";
import { CategoriesBoard } from "@/components/categories/CategoriesBoard";
import { fetchProductCatalog } from "@/lib/data/products";
import { fetchCategories } from "@/lib/data/categories";

export default async function MenuPage() {
  const [products, categories] = await Promise.all([
    fetchProductCatalog(),
    fetchCategories(),
  ]);
  const categoryNames = Array.from(
    new Set(products.map((product) => product.category_name).filter(Boolean)),
  ) as string[];

  return (
    <div className="space-y-8">
      {/* Categories Section */}
      <DashboardShell
        title="Categories"
        description="Manage menu categories and organize your products."
      >
        <CategoriesBoard categories={categories} />
      </DashboardShell>

      {/* Menu Section */}
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <DashboardShell
          title="Menu management"
          description="Control availability, pricing, and storytelling for every PA Catering experience."
        >
          <ProductBoard products={products} />
        </DashboardShell>

        <AddProductPanel categories={categoryNames} />
      </div>
    </div>
  );
}
