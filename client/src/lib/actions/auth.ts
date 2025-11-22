"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

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

  try {
    const supabase = await createClient();
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

    if (data.user) {
      redirect("/profile");
    }

    return {
      success: false,
      error: "Sign in failed. Please check your credentials.",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred during sign in.",
    };
  }
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

  try {
    const supabase = await createClient();

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

    // Create user profile in public.profiles table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from("profiles").insert({
          id: authData.user.id,
          email: authData.user.email,
          display_name: displayName,
          phone: phoneNumber || "",
          role: "customer",
          uid: authData.user.id,
          email_verified: false,
          photo_url: null,
          address: "",
          city: "",
          state: "",
          zip_code: "",
          country: "",
          theme: "system",
          order_history: [],
          loyalty_points_balance: 0,
          tier_status: "Bronze",
          rewards_available: [],
          yellowemption_history: [],
          personalized_promotions: [],
          referral_code: "",
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
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        } as any);

      if (profileError) {
        console.error("Error creating user profile:", profileError);
        // Don't fail the signup if profile creation fails, but log it
      }

      redirect("/profile");
    }

    return {
      success: false,
      error: "Registration failed. Please try again.",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred during registration.",
    };
  }
}



