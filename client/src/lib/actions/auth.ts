"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { User, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database.types";

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

    // Profile creation is handled by Postgres trigger on auth.users insert
    // See: supabase_migrations/add_profile_trigger.sql
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred during registration.",
    };
  }

  if (user) {
    redirect("/confirm-email");
  }

  return {
    success: false,
    error: "Registration failed. Please try again.",
  };
}



