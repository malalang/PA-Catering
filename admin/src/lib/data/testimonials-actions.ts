"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type TestimonialActionState = {
    error?: string;
    success?: string;
};

const sanitize = (value: FormDataEntryValue | null) =>
    String(value ?? "").trim();

export const createTestimonialAction = async (
    _prev: TestimonialActionState,
    formData: FormData,
): Promise<TestimonialActionState> => {
    const text = sanitize(formData.get("text"));
    const author = sanitize(formData.get("author"));
    const rating = Number(formData.get("rating") ?? 5);

    if (!text || !author) {
        return { error: "Text and author are required." };
    }

    if (Number.isNaN(rating) || rating < 1 || rating > 5) {
        return { error: "Rating must be between 1 and 5." };
    }

    const supabase = await createSupabaseServerClient();
    const testimonialData = {
        text,
        author,
        rating,
    };

    const { error } = await supabase
        .from("testimonials")
        .insert(testimonialData as never);

    if (error) {
        console.error("Failed to create testimonial", error);
        return { error: error.message };
    }

    revalidatePath("/testimonials");
    return { success: "Testimonial created successfully." };
};

export const updateTestimonialAction = async (
    _prev: TestimonialActionState,
    formData: FormData,
): Promise<TestimonialActionState> => {
    const id = sanitize(formData.get("id"));
    const text = sanitize(formData.get("text"));
    const author = sanitize(formData.get("author"));
    const rating = Number(formData.get("rating") ?? 5);

    if (!id || !text || !author) {
        return { error: "ID, text, and author are required." };
    }

    if (Number.isNaN(rating) || rating < 1 || rating > 5) {
        return { error: "Rating must be between 1 and 5." };
    }

    const supabase = await createSupabaseServerClient();
    const updateData = {
        text,
        author,
        rating,
    };

    const { error } = await supabase
        .from("testimonials")
        .update(updateData as never)
        .eq("id", id);

    if (error) {
        console.error("Failed to update testimonial", error);
        return { error: error.message };
    }

    revalidatePath("/testimonials");
    return { success: "Testimonial updated successfully." };
};

export const deleteTestimonialAction = async (
    testimonialId: string,
): Promise<TestimonialActionState> => {
    if (!testimonialId) {
        return { error: "Testimonial ID is required." };
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", testimonialId);

    if (error) {
        console.error("Failed to delete testimonial", error);
        return { error: error.message };
    }

    revalidatePath("/testimonials");
    return { success: "Testimonial deleted successfully." };
};

export type FeaturedItemActionState = {
    error?: string;
    success?: string;
};

export const createFeaturedItemAction = async (
    _prev: FeaturedItemActionState,
    formData: FormData,
): Promise<FeaturedItemActionState> => {
    const name = sanitize(formData.get("name"));
    const description = sanitize(formData.get("description"));
    const imageUrl = sanitize(formData.get("image_url")) || null;

    if (!name || !description) {
        return { error: "Name and description are required." };
    }

    const supabase = await createSupabaseServerClient();
    const itemData = {
        name,
        description,
        image_url: imageUrl,
    };

    const { error } = await supabase
        .from("featured_items")
        .insert(itemData as never);

    if (error) {
        console.error("Failed to create featured item", error);
        return { error: error.message };
    }

    revalidatePath("/featured-items");
    return { success: "Featured item created successfully." };
};

export const updateFeaturedItemAction = async (
    _prev: FeaturedItemActionState,
    formData: FormData,
): Promise<FeaturedItemActionState> => {
    const id = sanitize(formData.get("id"));
    const name = sanitize(formData.get("name"));
    const description = sanitize(formData.get("description"));
    const imageUrl = sanitize(formData.get("image_url")) || null;

    if (!id || !name || !description) {
        return { error: "ID, name, and description are required." };
    }

    const supabase = await createSupabaseServerClient();
    const updateData = {
        name,
        description,
        image_url: imageUrl,
    };

    const { error } = await supabase
        .from("featured_items")
        .update(updateData as never)
        .eq("id", id);

    if (error) {
        console.error("Failed to update featured item", error);
        return { error: error.message };
    }

    revalidatePath("/featured-items");
    return { success: "Featured item updated successfully." };
};

export const deleteFeaturedItemAction = async (
    itemId: string,
): Promise<FeaturedItemActionState> => {
    if (!itemId) {
        return { error: "Item ID is required." };
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("featured_items").delete().eq("id", itemId);

    if (error) {
        console.error("Failed to delete featured item", error);
        return { error: error.message };
    }

    revalidatePath("/featured-items");
    return { success: "Featured item deleted successfully." };
};
