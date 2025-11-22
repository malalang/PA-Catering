import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { SupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminProfileSummary } from "@/lib/types";

const PROFILE_COLUMNS = "id,email,full_name,role";

async function fetchProfile(
  client: SupabaseServerClient,
): Promise<AdminProfileSummary | null> {
  const {
    data: { user },
    error: authError,
  } = await client.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data, error } = await client
    .from("profiles")
    .select(PROFILE_COLUMNS)
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load admin profile", error);
    return null;
  }

  if (!data || (data as { role: string | null }).role !== "admin") {
    return null;
  }

  return data as AdminProfileSummary;
}

export const getSupabaseUser = cache(async (): Promise<User | null> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});

export const getAdminProfile = cache(
  async (): Promise<AdminProfileSummary | null> => {
    const supabase = await createSupabaseServerClient();
    return fetchProfile(supabase);
  },
);

export const requireAdminProfile = async () => {
  const profile = await getAdminProfile();

  if (!profile) {
    redirect("/login?error=not_authorized");
  }

  return profile;
};

export const fetchAdminProfileWithClient = (client: SupabaseServerClient) =>
  fetchProfile(client);

