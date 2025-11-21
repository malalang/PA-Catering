"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ProductActionState = {
  error?: string;
  success?: string;
};

const sanitize = (value: FormDataEntryValue | null) =>
  String(value ?? "").trim();

export const createProductAction = async (
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> => {
  const name = sanitize(formData.get("name"));
  const category = sanitize(formData.get("category"));
  const description = sanitize(formData.get("description"));
  const badge = sanitize(formData.get("badge")) || null;
  const imageUrl = sanitize(formData.get("image_url")) || null;
  const price = Number(formData.get("price") ?? 0);
  const stock = Number(formData.get("stock") ?? 0);

  if (!name || !category) {
    return { error: "Name and category are required." };
  }

  if (Number.isNaN(price) || price <= 0) {
    return { error: "Price must be greater than zero." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("products").insert({
    name,
    category,
    description: description || null,
    badge,
    image_url: imageUrl,
    price,
    stock: Number.isNaN(stock) ? 0 : stock,
  });

  if (error) {
    console.error("Failed to create product", error);
    return { error: error.message };
  }

  revalidatePath("/menu");
  revalidatePath("/products");
  return { success: `${name} added to menu.` };
};

export const updateProductAction = async (
  _prev: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> => {
  const id = sanitize(formData.get("id"));
  const priceValue = formData.get("price");
  const stockValue = formData.get("stock");
  const badge = sanitize(formData.get("badge")) || null;
  const description = sanitize(formData.get("description")) || null;

  if (!id) {
    return { error: "Missing product identifier." };
  }

  const price = priceValue !== null ? Number(priceValue) : undefined;
  const stock = stockValue !== null ? Number(stockValue) : undefined;

  const payload: Record<string, unknown> = {
    badge,
    description,
  };

  if (price !== undefined && !Number.isNaN(price)) {
    payload.price = price;
  }

  if (stock !== undefined && !Number.isNaN(stock)) {
    payload.stock = stock;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id);

  if (error) {
    console.error("Failed to update product", error);
    return { error: error.message };
  }

  revalidatePath("/menu");
  revalidatePath("/products");
  return { success: "Product updated." };
};

