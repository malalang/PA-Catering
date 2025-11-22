-- Ensure pgcrypto (for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Make sure profiles.id has a safe default (optional)
ALTER TABLE IF EXISTS public.profiles
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Add missing columns to profiles (no-op if they already exist)
ALTER TABLE IF EXISTS public.profiles
  ADD COLUMN IF NOT EXISTS role text DEFAULT 'customer',
  ADD COLUMN IF NOT EXISTS uid text,
  ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS photo_url text,
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS zip_code text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS theme text DEFAULT 'system',
  ADD COLUMN IF NOT EXISTS order_history jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS loyalty_points_balance integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tier_status text DEFAULT 'Bronze',
  ADD COLUMN IF NOT EXISTS rewards_available jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS redemption_history jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS personalized_promotions jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS referral_code text,
  ADD COLUMN IF NOT EXISTS car_wash_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS saved_payment_methods jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS last_login timestamptz DEFAULT now();

-- Enable Row Level Security
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

-- SELECT policy: make profiles readable by everyone (PUBLIC)
-- If you want only authenticated users to read, change TO PUBLIC -> TO authenticated
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'profiles_select_public'
  ) THEN
    EXECUTE $sql$
      CREATE POLICY profiles_select_public
        ON public.profiles
        FOR SELECT
        TO PUBLIC
        USING (true);
    $sql$;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- INSERT policy: authenticated users may insert a profile only for their own id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'profiles_insert_authenticated'
  ) THEN
    EXECUTE $sql$
      CREATE POLICY profiles_insert_authenticated
        ON public.profiles
        FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid() = id);
    $sql$;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- UPDATE policy: authenticated users can update only their own profile and the updated row must still belong to them
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'profiles_update_authenticated'
  ) THEN
    EXECUTE $sql$
      CREATE POLICY profiles_update_authenticated
        ON public.profiles
        FOR UPDATE
        TO authenticated
        USING (auth.uid() = id)
        WITH CHECK (auth.uid() = id);
    $sql$;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Useful indexes (no-op if already exist)
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_uid ON public.profiles(uid);