"use server";

import { formatISO } from "date-fns";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { OrderStatus } from "@/lib/types";
import type { Database } from "@/lib/database.types";

export type OrderActionState = {
  error?: string;
  success?: string;
};

const normalizeStatus = (value: string): OrderStatus | null => {
  const candidates: OrderStatus[] = [
    "pending",
    "processing",
    "completed",
    "cancelled",
  ];
  return candidates.find((candidate) => candidate === value) ?? null;
};

export const updateOrderStatusAction = async (
  _prev: OrderActionState,
  formData: FormData,
): Promise<OrderActionState> => {
  const orderId = String(formData.get("orderId") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "").trim();
  const status = normalizeStatus(statusValue);

  if (!orderId || !status) {
    return { error: "Order ID or status missing." };
  }

  const supabase = await createSupabaseServerClient();
  const updateData: Database["public"]["Tables"]["orders"]["Update"] = {
    status,
    updated_at: formatISO(new Date()),
  };
  const { error } = await supabase
    .from("orders")
    // @ts-ignore - Supabase type inference issue with Database types
    .update(updateData)
    .eq("id", orderId);

  if (error) {
    console.error("Failed to update order status", error);
    return { error: error.message };
  }

  revalidatePath("/orders");
  return { success: `Marked as ${status}.` };
};

