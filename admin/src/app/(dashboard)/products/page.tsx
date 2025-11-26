import { DashboardShell } from "@/components/layout/DashboardShell";
import { ProductBoardWrapper } from "@/components/menu/ProductBoardWrapper";
import { fetchProductCatalog } from "@/lib/data/products";

export default async function ProductsPage() {
  const products = await fetchProductCatalog();

  return (
    <DashboardShell
      title="Product catalogue"
      description="Full view of every SKU with images. Add new products and manage your entire catalog."
    >
      <ProductBoardWrapper products={products} showImages={true} />
    </DashboardShell>
  );
}
