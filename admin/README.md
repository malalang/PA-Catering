This is the administrative portal for PA Catering, built with the Next.js App Router, Supabase, and Tailwind CSS.

## Prerequisites

1. Create (or reuse) a Supabase project.
2. Copy the public URL and anon key into an `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
# Optional: require invite code for new admins
ADMIN_INVITE_CODE=super-secure-code
```

## Available scripts

```bash
npm run dev     # Start the local dev server
npm run build   # Create a production build
npm run start   # Run the production build locally
npm run lint    # Biome lint pass
npm run format  # Biome format with write
```

## Directory overview

- `src/app`: App Router routes (auth, dashboard, menu, orders, etc.).
- `src/lib/supabase`: Shared browser/server Supabase clients.
- `src/lib/types`: Product, order, and user domain models used across features.

## Deployment

Deploy like any other Next.js project (Vercel, Render, Docker, etc.). Ensure the Supabase environment variables are provided in the hosting platform.
