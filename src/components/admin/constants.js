import {
  LayoutDashboard,
  ClipboardList,
  Store,
  UtensilsCrossed,
  Tags,
  Percent,
  BarChart3,
} from "lucide-react";

export const ADMIN_TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
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

// Single source of truth for every order status the system supports, in the
// order they naturally progress. Charts zero-fill against this list so the
// status breakdown always shows the full lifecycle instead of only whichever
// statuses happen to have orders right now.
export const ORDER_STATUS_META = [
  { key: "pending", label: "Pending", color: "#f59e0b" },
  { key: "accepted", label: "Accepted", color: "#3b82f6" },
  { key: "preparing", label: "Preparing", color: "#6366f1" },
  { key: "out_for_delivery", label: "Out for Delivery", color: "#8b5cf6" },
  { key: "delivered", label: "Delivered", color: "#028643" },
  { key: "cancelled", label: "Cancelled", color: "#ef4444" },
];