import { DashboardShell } from "@/components/layout/DashboardShell";
import { AddProductPanel } from "@/components/menu/AddProductPanel";
import { ProductBoard } from "@/components/menu/ProductBoard";
import { fetchProductCatalog } from "@/lib/data/products";

export default async function MenuPage() {
  const products = await fetchProductCatalog();
  const categories = Array.from(
    new Set(products.map((product) => product.category_name).filter(Boolean)),
  ) as string[];

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <DashboardShell
        title="Menu management"
        description="Control availability, pricing, and storytelling for every PA Catering experience."
      >
        <ProductBoard products={products} />
      </DashboardShell>

      <AddProductPanel categories={categories} />
    </div>
  );
}

