CREATE TABLE public.testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  text text NOT NULL,
  author text NOT NULL,
  rating integer DEFAULT 5,
  likes uuid[] DEFAULT '{}'::uuid[],
  comments jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT testimonials_pkey PRIMARY KEY (id)
);
