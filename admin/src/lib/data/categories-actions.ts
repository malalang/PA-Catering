"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CategoryActionState = {
    error?: string;
    success?: string;
};

const sanitize = (value: FormDataEntryValue | null) =>
    String(value ?? "").trim();

export const createCategoryAction = async (
    _prev: CategoryActionState,
    formData: FormData,
): Promise<CategoryActionState> => {
    const categoryName = sanitize(formData.get("category_name"));
    const image = sanitize(formData.get("image")) || null;
    const description = sanitize(formData.get("description")) || null;

    if (!categoryName) {
        return { error: "Category name is required." };
    }

    const supabase = await createSupabaseServerClient();
    const categoryData = {
        category_name: categoryName,
        image,
        description,
    };

    const { error } = await supabase
        .from("products_category")
        .insert(categoryData as never);

    if (error) {
        console.error("Failed to create category", error);
        return { error: error.message };
    }

    revalidatePath("/categories");
    revalidatePath("/products");
    return { success: "Category created successfully." };
};

export const updateCategoryAction = async (
    _prev: CategoryActionState,
    formData: FormData,
): Promise<CategoryActionState> => {
    const id = sanitize(formData.get("id"));
    const categoryName = sanitize(formData.get("category_name"));
    const image = sanitize(formData.get("image")) || null;
    const description = sanitize(formData.get("description")) || null;

    if (!id || !categoryName) {
        return { error: "Category ID and name are required." };
    }

    const supabase = await createSupabaseServerClient();
    const updateData = {
        category_name: categoryName,
        image,
        description,
    };

    const { error } = await supabase
        .from("products_category")
        .update(updateData as never)
        .eq("id", id);

    if (error) {
        console.error("Failed to update category", error);
        return { error: error.message };
    }

    revalidatePath("/categories");
    revalidatePath("/products");
    return { success: "Category updated successfully." };
};

export const deleteCategoryAction = async (
    categoryId: string,
): Promise<CategoryActionState> => {
    if (!categoryId) {
        return { error: "Category ID is required." };
    }

    const supabase = await createSupabaseServerClient();

    // Check if category has products
    const { data: products } = await supabase
        .from("products")
        .select("id")
        .eq("category_name", categoryId)
        .limit(1);

    if (products && products.length > 0) {
        return { error: "Cannot delete category with existing products." };
    }

    const { error } = await supabase
        .from("products_category")
        .delete()
        .eq("id", categoryId);

    if (error) {
        console.error("Failed to delete category", error);
        return { error: error.message };
    }

    revalidatePath("/categories");
    revalidatePath("/products");
    return { success: "Category deleted successfully." };
};
