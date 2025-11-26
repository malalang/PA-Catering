import { DashboardShell } from "@/components/layout/DashboardShell";
import { AddProductPanel } from "@/components/menu/AddProductPanel";
import { ProductBoard } from "@/components/menu/ProductBoard";
import { fetchProductCatalog } from "@/lib/data/products";

export default async function ProductsPage() {
  const products = await fetchProductCatalog();
  const categories = Array.from(
    new Set(products.map((product) => product.category_name).filter(Boolean)),
  ) as string[];

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <DashboardShell
        title="Product catalogue"
        description="Full view of every SKU with images. Add new products and manage your entire catalog."
      >
        <ProductBoard products={products} showImages={true} />
      </DashboardShell>

      <AddProductPanel categories={categories} />
    </div>
  );
}
