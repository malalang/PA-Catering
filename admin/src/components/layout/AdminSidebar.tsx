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
      {/* Mobile header with burger menu */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-yellow-950/95 backdrop-blur-sm lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg bg-yellow-900/90 p-2 text-white hover:bg-yellow-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <HiOutlineX className="h-6 w-6" />
            ) : (
              <HiOutlineMenu className="h-6 w-6" />
            )}
          </button>

          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-indigo-400">
              PA Catering
            </div>
            <p className="text-sm font-semibold text-white">Admin</p>
          </div>

          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 flex-col border-r border-white/10 bg-yellow-950/95 px-6 py-8 backdrop-blur-sm transition-transform duration-300 lg:static lg:flex ${mobileMenuOpen ? "flex translate-x-0" : "-translate-x-full lg:translate-x-0"
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

        <div className="mt-auto rounded-xl border border-white/10 bg-yellow-900/80 p-4 text-sm text-yellow-300">
          <p className="font-semibold text-white">Daily Ops Checklist</p>
          <ul className="mt-2 space-y-1 text-xs text-yellow-400">
            <li>• Confirm menu availability</li>
            <li>• Assign pending orders</li>
            <li>• Update stock counts</li>
          </ul>
        </div>
      </aside>
    </>
  );
};
