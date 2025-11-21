const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const getSupabaseConfig = () => ({
  url: getEnv("NEXT_PUBLIC_SUPABASE_URL"),
  anonKey: getEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
});

