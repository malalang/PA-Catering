-- Add missing columns to profiles table
ALTER TABLE profiles
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
ADD COLUMN IF NOT EXISTS yellowemption_history jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS personalized_promotions jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS referral_code text,
ADD COLUMN IF NOT EXISTS car_wash_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS saved_payment_methods jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS last_login timestamp with time zone DEFAULT now();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Profiles are viewable by everyone (or just authenticated users)
-- User requested: "Profiles are viewable by everyone"
CREATE POLICY "Profiles are viewable by everyone"
ON profiles FOR SELECT
TO authenticated, anon
USING ( true );

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
TO authenticated, anon
WITH CHECK ( auth.uid() = id );

-- Policy: Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING ( auth.uid() = id );
