import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";
import { Database } from "@/lib/database.types";

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseConfig();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value }) => {
            cookieStore.set(name, value);
          });
        } catch {
          // noop: called from a Server Component
        }
      },
    },
  });
};

export type SupabaseServerClient = Awaited<
  ReturnType<typeof createSupabaseServerClient>
>;
