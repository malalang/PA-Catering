import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { requireAdminProfile } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const profile = await requireAdminProfile();

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopbar profile={profile} />
        <main className="flex-1 space-y-6 bg-slate-950 px-4 py-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
