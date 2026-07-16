import {
  LayoutDashboard,
  ClipboardList,
  Store,
  UtensilsCrossed,
  Tags,
  Percent,
} from "lucide-react";

export const ADMIN_TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Manage Orders", icon: ClipboardList },
  { id: "restaurants", label: "Restaurants", icon: Store },
  { id: "menu", label: "Menu Items", icon: UtensilsCrossed },
  { id: "categories", label: "Categories", icon: Tags },
  { id: "deals", label: "Deals & Offers", icon: Percent },
];

export const ACTIVE_ORDER_STATUSES = [
  "pending",
  "accepted",
  "preparing",
  "out_for_delivery",
];
