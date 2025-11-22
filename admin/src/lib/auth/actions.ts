"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchAdminProfileWithClient } from "./session";
import type { AuthActionState } from "./types";
import type { Database } from "@/lib/database.types";

const sanitize = (value: FormDataEntryValue | null) =>
  String(value ?? "").trim();

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = sanitize(formData.get("email")).toLowerCase();
  const password = sanitize(formData.get("password"));
  const redirectTo = sanitize(formData.get("redirectTo")) || "/dashboard";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  const profile = await fetchAdminProfileWithClient(supabase);

  if (!profile) {
    await supabase.auth.signOut();
    return { error: "You do not have admin access." };
  }

  redirect(redirectTo || "/dashboard");
}

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = sanitize(formData.get("email")).toLowerCase();
  const password = sanitize(formData.get("password"));
  const fullName = sanitize(formData.get("fullName")) || undefined;
  const inviteCode = sanitize(formData.get("inviteCode"));

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const requiredInvite = process.env.ADMIN_INVITE_CODE;
  if (requiredInvite && inviteCode !== requiredInvite) {
    return { error: "Invalid invite code." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "admin",
        display_name: fullName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    const profileData: Database["public"]["Tables"]["profiles"]["Insert"] = {
      id: data.user.id,
      email,
      display_name: fullName,
      role: "admin",
    };
    // @ts-expect-error - Supabase type inference issue with Database types
    await supabase.from("profiles").upsert(profileData);
  }

  redirect("/login?registered=1");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

