

export type NavItem = {
  label: string;
  href: string;
  icon: string;
  badge?: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "HiOutlineChartBar",
  },
  {
    label: "Menu",
    href: "/menu",
    icon: "PiBowlFoodBold",
  },
  {
    label: "Orders",
    href: "/orders",
    icon: "HiOutlineClipboardDocumentList",
    badge: "Live",
  },
  {
    label: "Products",
    href: "/products",
    icon: "HiOutlineSquares2X2",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "HiOutlineCog",
  },
];


