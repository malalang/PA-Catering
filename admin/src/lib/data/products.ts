import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProductRecord } from "@/lib/types";

export const fetchProductCatalog = async (): Promise<ProductRecord[]> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id,name,category,price,stock,badge,description,image_url,updated_at",
    )
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch products", error);
    return [];
  }

  return (data ?? []) as ProductRecord[];
};
