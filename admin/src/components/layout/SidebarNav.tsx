"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineChartBar,
  HiOutlineClipboardDocumentList,
  HiOutlineCog,
  HiOutlineSquares2X2,
  HiOutlineEnvelope,
  HiOutlineUsers,
  HiOutlineCamera,
  HiOutlineStar,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { PiBowlFoodBold } from "react-icons/pi";
import type { NavItem } from "./nav-items";

type Props = {
  items: NavItem[];
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiOutlineChartBar,
  PiBowlFoodBold,
  HiOutlineClipboardDocumentList,
  HiOutlineSquares2X2,
  HiOutlineEnvelope,
  HiOutlineUsers,
  HiOutlineCamera,
  HiOutlineStar,
  HiOutlineSparkles,
  HiOutlineCog,
};

export const SidebarNav = ({ items }: Props) => {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {items.map(({ label, href, icon, badge }) => {
        const isActive = pathname === href;
        const Icon = iconMap[icon];

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
              ? "bg-indigo-500/20 text-white"
              : "text-yellow-300 hover:bg-white/5 hover:text-white"
              }`}
          >
            <span className="flex items-center gap-3">
              {Icon && <Icon className="text-lg" />}
              {label}
            </span>
            {badge ? (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white">
                {badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
};

