"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { User, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

export type AuthActionState = {
  success: boolean;
  error?: string;
  user?: User | null;
};

export async function signInAction(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required.",
    };
  }

  let user = null;

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    user = data.user;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred during sign in.",
    };
  }

  if (user) {
    redirect("/profile");
  }

  return {
    success: false,
    error: "Sign in failed. Please check your credentials.",
  };
}

export async function signUpAction(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const displayName = String(formData.get("displayName") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim() || undefined;

  if (!email || !password || !displayName) {
    return {
      success: false,
      error: "Email, password, and display name are required.",
    };
  }

  let user = null;

  try {
    const supabase: SupabaseClient<Database> = await createClient();

    // Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          phone_number: phoneNumber || "",
        },
      },
    });

    if (authError) {
      return {
        success: false,
        error: authError.message,
      };
    }

    user = authData.user;

    // Create user profile in public.profiles table
    // Note: This serves as a fallback if the Postgres trigger doesn't work
    if (user) {
      const { error: profileError } = await (supabase
        .from("profiles") as any).insert({
          id: user.id,
          email: user.email,
          display_name: displayName,
          phone: phoneNumber || null,
          role: "customer",
          uid: user.id,
          email_verified: false,
          photo_url: null,
          address: null,
          city: null,
          state: null,
          zip_code: null,
          country: null,
          theme: "system",
          order_history: [],
          loyalty_points_balance: 0,
          tier_status: "Bronze",
          rewards_available: [],
          yellowemption_history: [],
          personalized_promotions: [],
          referral_code: null,
          car_wash_count: 0,
          preferences: {
            dietaryRestrictions: [],
            favoriteItems: [],
            preferyellowCarWashServices: [],
            preferyellowPaymentMethod: "credit_card",
            communicationPreferences: {
              email: true,
              sms: false,
              promotions: true,
            },
          },
          saved_payment_methods: [],
        } as never);

      if (profileError) {
        console.error("Error creating user profile:", profileError);
        // Continue anyway as the trigger might have created it
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred during registration.",
    };
  }

  if (user) {
    redirect("/profile");
  }

  return {
    success: false,
    error: "Registration failed. Please try again.",
  };
}



