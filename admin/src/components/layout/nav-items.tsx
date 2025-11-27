

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
    label: "Comments",
    href: "/comments",
    icon: "HiOutlineChatBubbleLeftRight",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: "HiOutlineEnvelope",
  },
  {
    label: "Profiles",
    href: "/profiles",
    icon: "HiOutlineUsers",
  },
  {
    label: "Photo Bookings",
    href: "/photo-bookings",
    icon: "HiOutlineCamera",
  },
  {
    label: "Testimonials",
    href: "/testimonials",
    icon: "HiOutlineStar",
  },
  {
    label: "Featured Items",
    href: "/featured-items",
    icon: "HiOutlineSparkles",
  },
  {
    label: "Favorites",
    href: "/favorites",
    icon: "HiOutlineHeart",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "HiOutlineCog",
  },
];



