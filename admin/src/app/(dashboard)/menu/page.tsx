import { AddProductPanel } from "@/components/menu/AddProductPanel";
import { ProductBoard } from "@/components/menu/ProductBoard";
import { CategoriesBoard } from "@/components/menu/CategoriesBoard";
import { fetchProductCatalog } from "@/lib/data/products";
import { fetchCategories } from "@/lib/data/categories";
import { fetchComments } from "@/lib/data/comments";
import { fetchUserFavorites } from "@/lib/data/favorites";

export default async function MenuPage() {
  const [products, categories, comments, favorites] = await Promise.all([
    fetchProductCatalog(),
    fetchCategories(),
    fetchComments(),
    fetchUserFavorites(),
  ]);

  const categoryNames = categories.map((category) => category.category_name);

  return (
    <div className="space-y-8">
      {/* Categories Section */}
      <CategoriesBoard categories={categories} />

      {/* Products Section */}
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <ProductBoard
          products={products}
          comments={comments}
          favorites={favorites}
        />
        <AddProductPanel categories={categoryNames} />
      </div>
    </div>
  );
}
