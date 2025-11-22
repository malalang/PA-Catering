**Role:** Senior Full-Stack Engineer & Next.js Architect
**Task:** Comprehensive Refactor, Supabase Integration, and Production Optimization
**Context:** @context.xml  (Contains @admin  and @client  Next.js repositories)

**Objective:**
Analyze the provided @context.xml  to understand the current codebase. Refactor both the @admin  and @client  applications to strictly follow **Next.js 16** best practices. The goal is to eliminate client-side data fetching and routing logic in favor of **React Server Components (RSC)**, **Server Actions**, and **Middleware**, ensuring the applications are production-ready, responsive, and fully integrated with Supabase.

---

### **1. Architectural Standards (Next.js 16)**
* **Default to Server Components:** Convert all `page.tsx` and `layout.tsx` files to `async` Server Components.
* **Client Component Boundary:** Move all interactivity (clicks, form inputs, state hooks like `useState`, `useEffect`) to isolated leaf components (e.g., `<AddToCartButton />`, `<SearchBar />`). Add `'use client'` directives *only* to these specific files.
* **Remove Legacy Routing:** **Delete `RouteGuardContext.tsx`**. Replace its functionality (protecting routes based on auth) entirely with `middleware.ts` and server-side session checks in layouts/pages the @client must not have user roles.
* **Data Fetching:** Remove all client-side `useEffect` data fetching. Fetch data directly in Server Components using the Supabase Server Client.

### **2. Supabase Integration & Data Layer**
* **Utilize Supabase MCP:** Use available tools to inspect the schema and ensure queries match the `create_tables.sql` definitions. use the MCP to add all the proctucts from @products.ts 
* **Single Source of Truth:**
    * **Delete** @products.ts  and @Stock.ts . we don't us the @Stock.ts on the @client 
    * Refactor the Client app to fetch **products**, **images**, and **prices** dynamically from the Supabase `products` table.
    * Ensure images served from Supabase Storage are optimized using `next/image`.
* **Server Actions:** Convert all form submissions (Login, Register, Add to Cart, Contact Form) to **Server Actions** (`"use server"`), handling validation and DB mutations on the server.

### **3. Client Application Refactor @client  **
* **Pages:** Convert @page.tsx  , @page.tsx  , etc., to Server Components. They should fetch data and pass it as props to client-side interactive islands if necessary.
* **Search & Filtering:** Move the search/filter logic from @CartContext.tsx  to **URL Search Params**.
    * Example: Filtering by category should update the URL to `?category=meals`. The Server Page reads `searchParams` and queries Supabase accordingly.
* **Cart Context:** Keep @CartContext.tsx  *only* for managing the temporary state of the shopping cart (local storage). Remove any data-fetching logic from it.

### **4. UI/UX & Theming**
* **Design System:** Enforce the existing **Yellow/Black/Dark** aesthetic. Ensure the design is fully responsive (Mobile First) using Tailwind CSS.
* **Accessibility:** Ensure all inputs and buttons have proper labels and focus states.

### **5. Execution Plan**

**Step 1: Configuration & Middleware**
* Review `middleware.ts`. Ensure it correctly protects `/profile`, `/orders`, and `/admin` routes by validating Supabase sessions before rendering.
* Set up strict types for Supabase tables based on `create_tables.sql`.

**Step 2: Admin Refactor**
* Ensure Admin pages are Server Components.
* Verify Admin mutations (Add Product, Update Order) use Server Actions with `revalidatePath`.

**Step 3: Client Refactor (The Core Task)**
* Remove @RouteGuardContext.tsx 
* Rewrite @page.tsx  :
    1.  Accept `searchParams`.
    2.  Fetch filtered products from Supabase (Server-side).
    3.  Render the list.
* Refactor @ProductCard.tsx  and @page.tsx  to use dynamic data.
* Refactor @Navbar  : Use a Server Component to check the session and render "Login" or "Profile" buttons accordingly.

**Step 4: Clean Up**
* Delete unused files (placeholder JSONs, hardcoded TS data files).
* Ensure no secrets are exposed in client bundles.

**Step 5: Verification**
* Run `npx tsc --noEmit` to ensure strict type safety across the new architecture.
* Run `npm run build` to verify that static generation and server builds succeed without errors.

---

**Immediate Action:**
Start by analyzing `middleware.ts` and `client/src/lib/supabase/server.ts` to ensure the authentication foundation is solid, then proceed to convert the Client Menu page to a Server Component fetching from Supabase.