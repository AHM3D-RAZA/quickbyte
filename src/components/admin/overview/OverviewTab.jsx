import { TrendingUp, ShoppingBag, Store, UtensilsCrossed } from "lucide-react";
import StatCard from "../shared/StatCard";
import PopularItemsPanel from "./PopularItemsPanel";
import PopularDealsPanel from "./PopularDealsPanel";

export default function OverviewTab({
  deliveredSales,
  activeOrdersCount,
  restaurants,
  totalUsers,
  menuItems,
  deals,
}) {
  const stats = [
    {
      label: "Total Revenue",
      value: `£${deliveredSales.toFixed(2)}`,
      description: "From completed orders",
      icon: TrendingUp,
    },
    {
      label: "Total Orders",
      value: activeOrdersCount,
      description: "Pending processing",
      icon: ShoppingBag,
    },
    {
      label: "Partner Restaurants",
      value: restaurants,
      description: "Locations onboarded",
      icon: Store,
    },
    {
      label: "Total Users",
      value: totalUsers,
      description: "Total registered users",
      icon: UtensilsCrossed,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularItemsPanel menuItems={menuItems} />
        <PopularDealsPanel deals={deals} />
      </div>
    </div>
  );
}
