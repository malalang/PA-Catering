CREATE TABLE public.featured_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text,
  likes uuid[] DEFAULT '{}'::uuid[],
  comments jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT featured_items_pkey PRIMARY KEY (id)
);
