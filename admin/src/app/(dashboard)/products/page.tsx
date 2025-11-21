import { DashboardShell } from "@/components/layout/DashboardShell";
import { ProductBoard } from "@/components/menu/ProductBoard";
import { fetchProductCatalog } from "@/lib/data/products";

export default async function ProductsPage() {
  const products = await fetchProductCatalog();

  return (
    <DashboardShell
      title="Product catalogue"
      description="Full view of every SKU synced from Supabase. Use this to audit descriptions and pricing."
    >
      <ProductBoard products={products} />
    </DashboardShell>
  );
}

