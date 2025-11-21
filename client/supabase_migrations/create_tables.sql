-- Supabase SQL migration for PA-Catering
-- Run this in Supabase SQL editor or psql connected to your Supabase Postgres

-- Enable extensions if not present
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- users table (supabase auth handles auth, but we keep a profile table)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text,
  display_name text,
  phone text,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE,
  description text,
  price numeric(10,2) DEFAULT 0,
  category text,
  image_url text,
  stock integer DEFAULT 0,
  likes integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid,
  user_name text,
  body text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  items jsonb NOT NULL,
  total_price numeric(10,2) NOT NULL,
  total_quantity integer NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- user_favorites table (tracks favorites per user)
CREATE TABLE IF NOT EXISTS user_favorites (
  user_id uuid,
  product_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (user_id, product_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_comments_product ON comments(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);

-- Optional seed: a couple of sample products
INSERT INTO products (name, slug, description, price, category, image_url, stock)
VALUES
  ('Classic Beef Burger', 'classic-beef-burger', 'A juicy classic beef burger with cheese and lettuce.', 8.50, 'Burgers', '/Menus/burger1.jpg', 25)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, category, image_url, stock)
VALUES
  ('Vegan Salad Bowl', 'vegan-salad-bowl', 'Fresh greens with avocado, nuts, and lemon dressing.', 7.00, 'Salads', '/Menus/salad1.jpg', 40)
ON CONFLICT (slug) DO NOTHING;
