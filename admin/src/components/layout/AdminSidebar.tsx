import Link from "next/link";
import { NAV_ITEMS } from "./nav-items";
import { SidebarNav } from "./SidebarNav";

export const AdminSidebar = () => (
  <aside className="hidden w-72 flex-col border-r border-white/10 bg-slate-950/80 px-6 py-8 lg:flex">
    <Link href="/dashboard" className="mb-10 block">
      <div className="text-xs uppercase tracking-[0.4em] text-indigo-400">
        PA Catering
      </div>
      <p className="text-xl font-semibold text-white">Admin Console</p>
    </Link>

    <SidebarNav items={NAV_ITEMS} />

    <div className="mt-auto rounded-xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
      <p className="font-semibold text-white">Daily Ops Checklist</p>
      <ul className="mt-2 space-y-1 text-xs text-slate-400">
        <li>• Confirm menu availability</li>
        <li>• Assign pending orders</li>
        <li>• Update stock counts</li>
      </ul>
    </div>
  </aside>
);

