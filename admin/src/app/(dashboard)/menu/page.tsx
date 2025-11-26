import { MenuPageClient } from "@/components/menu/MenuPageClient";
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
    <MenuPageClient
      products={products}
      categories={categories}
      categoryNames={categoryNames}
    />
  );
}
