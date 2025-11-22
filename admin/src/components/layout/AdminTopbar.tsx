import Link from "next/link";
import { HiOutlineBell, HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { logoutAction } from "@/lib/auth";
import type { AdminProfileSummary } from "@/lib/types";
import { NAV_ITEMS } from "./nav-items";

type Props = {
  profile: AdminProfileSummary;
};

export const AdminTopbar = ({ profile }: Props) => (
  <header className="flex flex-col gap-4 border-b border-white/5 bg-slate-950/60 px-4 py-4 backdrop-blur">
    <div>
      <p className="text-sm uppercase tracking-[0.35em] text-indigo-300">
        Operations
      </p>
      <h1 className="text-xl font-semibold text-white">
        Welcome back, {profile.display_name ?? "Admin"}
      </h1>
    </div>

    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2 lg:hidden">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300 transition hover:border-indigo-400 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/support"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:border-indigo-400 hover:text-white"
        >
          <HiOutlineQuestionMarkCircle />
          Support
        </Link>
        <button
          type="button"
          className="rounded-full border border-white/10 p-2 text-slate-200 transition hover:border-indigo-400 hover:text-white"
          aria-label="Notifications"
        >
          <HiOutlineBell className="text-lg" />
        </button>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-rose-500 hover:text-white"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  </header>
);
