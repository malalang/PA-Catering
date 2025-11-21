import type { IconType } from "react-icons";
import {
  HiOutlineChartBar,
  HiOutlineClipboardDocumentList,
  HiOutlineCog,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { PiBowlFoodBold } from "react-icons/pi";

export type NavItem = {
  label: string;
  href: string;
  icon: IconType;
  badge?: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: HiOutlineChartBar,
  },
  {
    label: "Menu",
    href: "/menu",
    icon: PiBowlFoodBold,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: HiOutlineClipboardDocumentList,
    badge: "Live",
  },
  {
    label: "Products",
    href: "/products",
    icon: HiOutlineSquares2X2,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: HiOutlineCog,
  },
];

