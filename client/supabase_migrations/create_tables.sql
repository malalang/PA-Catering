-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.admins (
  user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT admins_pkey PRIMARY KEY (user_id)
);
CREATE TABLE public.comments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid,
  user_id uuid,
  user_name text,
  body text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT fk_comments_user_id_profiles FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.contact (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contact_pkey PRIMARY KEY (id)
);
CREATE TABLE public.featured_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text,
  likes ARRAY DEFAULT '{}'::uuid[],
  comments jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT featured_items_pkey PRIMARY KEY (id)
);
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  items jsonb NOT NULL,
  total_price numeric NOT NULL,
  total_quantity integer NOT NULL,
  status text DEFAULT 'pending'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT fk_orders_user_id_profiles FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.photo_boot_bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  date date NOT NULL,
  time time without time zone NOT NULL,
  package text NOT NULL,
  people integer NOT NULL,
  message text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT photo_boot_bookings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE,
  description text,
  price numeric DEFAULT 0,
  image_url text,
  stock integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  badge text,
  likes ARRAY DEFAULT '{}'::uuid[],
  category_name text,
  is_hidden boolean NOT NULL DEFAULT false,
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_category_name_fkey FOREIGN KEY (category_name) REFERENCES public.products_category(category_name)
);
CREATE TABLE public.products_category (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  category_name text NOT NULL UNIQUE,
  image text,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  is_hidden boolean NOT NULL DEFAULT false,
  CONSTRAINT products_category_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text,
  display_name text,
  phone text,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  role text DEFAULT 'customer'::text,
  uid text,
  email_verified boolean DEFAULT false,
  photo_url text,
  address text,
  city text,
  state text,
  zip_code text,
  country text,
  theme text DEFAULT 'system'::text,
  tier_status text DEFAULT 'Bronze'::text,
  referral_code text,
  preferences jsonb DEFAULT '{}'::jsonb,
  saved_payment_methods jsonb DEFAULT '[]'::jsonb,
  updated_at timestamp with time zone DEFAULT now(),
  last_login timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  text text NOT NULL,
  author text NOT NULL,
  rating integer DEFAULT 5,
  likes ARRAY DEFAULT '{}'::uuid[],
  comments jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT testimonials_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user_favorites (
  user_id uuid NOT NULL,
  product_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_favorites_pkey PRIMARY KEY (user_id, product_id),
  CONSTRAINT user_favorites_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT fk_user_favorites_user_id_profiles FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);