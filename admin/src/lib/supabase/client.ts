"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

export const createSupabaseBrowserClient = () =>
  createBrowserClient(getSupabaseConfig().url, getSupabaseConfig().anonKey);

export type SupabaseBrowserClient = ReturnType<
  typeof createSupabaseBrowserClient
>;
