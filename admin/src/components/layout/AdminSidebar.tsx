"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { NAV_ITEMS } from "./nav-items";
import { SidebarNav } from "./SidebarNav";

export const AdminSidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile burger menu button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-slate-900/90 p-2 text-white backdrop-blur-sm lg:hidden"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <HiOutlineX className="h-6 w-6" />
        ) : (
          <HiOutlineMenu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 flex-col border-r border-white/10 bg-slate-950/95 px-6 py-8 backdrop-blur-sm transition-transform duration-300 lg:static lg:flex ${mobileMenuOpen ? "flex translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <Link
          href="/dashboard"
          className="mb-10 block"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="text-xs uppercase tracking-[0.4em] text-indigo-400">
            PA Catering
          </div>
          <p className="text-xl font-semibold text-white">Admin Console</p>
        </Link>

        <div onClick={() => setMobileMenuOpen(false)}>
          <SidebarNav items={NAV_ITEMS} />
        </div>

        <div className="mt-auto rounded-xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
          <p className="font-semibold text-white">Daily Ops Checklist</p>
          <ul className="mt-2 space-y-1 text-xs text-slate-400">
            <li>• Confirm menu availability</li>
            <li>• Assign pending orders</li>
            <li>• Update stock counts</li>
          </ul>
        </div>
      </aside>
    </>
  );
};
