**Role:** Senior Next.js 16 Architect & UI/UX Designer
**Task:** Finalize Architecture, Fix Routing/API Errors, Seed Data, and Polish UI
**Context:** Updated `context.xml` (References `client` and `admin` apps)

**Objective:**
We are in the final phase of refactoring the **Client** application. `RouteGuardContext` has been successfully removed, and we are using `client/src/proxy.ts` for route protection. The goal now is to fix the remaining directory structure issues, replace the legacy API route with Server Actions, seed the database, and elevate the "PA Luxe" design.

### **1. Architecture & Routing Fixes (Critical)**
* **Fix Auth Directory Structure:**
    * Currently, auth pages are located at `client/src/app/Authentication/login` & `register`. This creates awkward URLs (`/Authentication/login`).
    * **Action:** Move these to a Route Group: `client/src/app/(auth)/login` and `client/src/app/(auth)/register`.
    * **Action:** Update `client/src/proxy.ts` to redirect unauthenticated users to `/login` (not `/Authentication/login`).
* **Remove Legacy API Route:**
    * **Action:** Delete `client/src/app/api/user/route.ts`. This file is causing **405 Method Not Allowed** errors because `EditProfileForm` attempts to PATCH to it.
    * **Replacement:** Implement **Server Actions** for all data mutations.

### **2. Server Actions Implementation (Next.js 16)**
* **Auth Actions:**
    * Create `client/src/lib/actions/auth.ts`.
    * Move the logic from `client/src/lib/supabase/auth/signIn.ts` and `signUp.ts` (currently client-side) into this Server Action.
    * Refactor `LoginForm.tsx` and `RegisterForm.tsx` to use the React 19 `useActionState` hook.
* **Profile Actions:**
    * Create `client/src/lib/actions/profile.ts`.
    * Create `updateProfile` and `updateAddress` actions.
    * Refactor `EditProfileForm.tsx` and `UserAddressForm.tsx` to use these actions instead of `fetch('/api/user')`.

### **3. Database Seeding**
* **Populate Products:**
    * The file `client/supabase_migrations/seed_products.sql` contains the necessary data.
    * **Action:** Execute this SQL against the Supabase instance to populate the `products` table with the "PA Luxe" menu items (Burgers, Kotas, etc.).
* **Verify Schema:** Ensure the `products` table schema in Supabase matches the types used in `client/src/app/menu/page.tsx`.

### **4. UI/UX Design Polish (Theme: PA Luxe)**
* **Visual Identity:** Enforce the **Black & Gold** luxury aesthetic (`bg-black`, `text-white`, `border-yellow-500`).
* **Components:**
    * **Glassmorphism:** Apply `bg-white/10 backdrop-blur-md` to the Navbar, Product Cards, and Form containers.
    * **Typography:** Ensure headings use the "Luxurious" font stack defined in `globals.css` with gold drop-shadows.
* **Responsiveness:**
    * Check `client/src/app/menu/page.tsx` grid layouts. Ensure 1 column on mobile, 2 on tablet, 4 on desktop.

### **Execution Order**
1.  **Move Directories:** Fix `(auth)` folder structure immediately.
2.  **Delete & Replace:** Remove `api/user/route.ts` and implement `actions/profile.ts`.
3.  **Refactor Auth:** Implement `actions/auth.ts` and update forms.
4.  **Seed Data:** Run the SQL seed.
5.  **Polish:** Apply final CSS refinements to the Menu and Profile pages.