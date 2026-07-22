// components/menu/DealsGrid.jsx
import { useState, useEffect } from "react";
import DealCard from "./DealCard";
import { getDeals } from "/src/api/restaurantAPI";
import { useNavigate } from "react-router-dom";

function DealsGrid() {
  const [activeTab, setActiveTab] = useState("All");
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDeals();
        setDeals(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeals();
  }, []);

  // Build the tab list from whatever categories actually show up
  // across the items in the deals we got back, instead of a fixed list.
  const categoryNames = deals
    .flatMap((deal) => deal.items || [])
    .map((item) => item.menu_item?.category?.name)
    .filter(Boolean);
  const tabs = ["All", ...new Set(categoryNames)];

  // A deal matches a category if any of its items belong to it.
  const visibleDeals =
    activeTab === "All"
      ? deals
      : deals.filter((deal) =>
          deal.items?.some((item) => item.menu_item?.category?.name === activeTab)
        );

  return (
    <section className="px-6 py-8">
      <div className="flex items-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Up to -40% 🎊 Order.uk exclusive deals
        </h2>

        {/* Mobile: dropdown */}
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="lg:hidden ml-auto mb-4 border border-orange-500 rounded-full px-4 py-2 text-sm font-medium text-black bg-white"
        >
          {tabs.map((tab) => (
            <option key={tab} value={tab}>{tab}</option>
          ))}
        </select>

        <nav className="hidden lg:flex flex-wrap justify-end gap-1 mb-4 ml-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer ${activeTab === tab
                  ? "border border-orange-500 bg-white font-bold text-black"
                  : "border border-transparent font-medium text-gray-700 hover:bg-black/5 hover:text-black"
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {visibleDeals.length === 0 && (
        <p className="text-sm text-gray-500 py-6">No deals in this category yet.</p>
      )}

      {/* Mobile: horizontal sliding row */}
      <div className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
        {visibleDeals.map((deal) => (
          <DealCard key={deal.id} image={`${BASE_URL}${deal.image}`} name={deal.name}
            restaurantLabel={deal.items?.[0]?.menu_item?.restaurant?.name || "Unknown Restaurant"}
            discount={`\$${deal.combo_price}`} onClick={() => navigate(`/deal/${deal.id}`)} />
        ))}
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden lg:grid grid-cols-3 gap-5">
        {visibleDeals.map((deal) => (
          <DealCard key={deal.id} image={`${BASE_URL}${deal.image}`} name={deal.name}
            restaurantLabel={deal.items?.[0]?.menu_item?.restaurant?.name || "Unknown Restaurant"}
            discount={`\$${deal.combo_price}`} onClick={() => navigate(`/deal/${deal.id}`)} />
        ))}
      </div>
    </section>
  );
}

export default DealsGrid;