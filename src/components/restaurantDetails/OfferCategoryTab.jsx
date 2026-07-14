import { useState, useEffect } from "react";
import { useTheme } from "/src/context/ThemeContext";
import { getRestaurantById } from "/src/api/restaurantAPI";

function OfferCategoryTabs({ activeCategory, onSelect, restaurantId }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const restaurant = await getRestaurantById(restaurantId);

        const uniqueCategories = [];
        restaurant.menu_items.forEach((item) => {
          const category = item.category || {
            id: "others",
            name: "Others",
          };
          const exists = uniqueCategories.find(
            (cat) => cat.id === category.id
          );
          if (!exists) {
            uniqueCategories.push(category);
          }
        });
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRestaurant();
  }, [restaurantId]);

  return (
    <div
      className={`w-full overflow-x-auto font-poppins px-4 py-4 md:px-6 ${isDark ? "bg-brand-orange" : "bg-[#f3f3f3]"
        }`}
      // Inline styles to hide the scrollbar for a cleaner UI
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
      }}
    >
      {/* Webkit scrollbar hiding via style tag for Chrome/Safari */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* min-w-max prevents the flex container from crushing the items on mobile.
        lg:justify-between allows them to spread evenly on large screens.
      */}
      <div className="flex items-center justify-start text-center min-w-max gap-2 md:gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              onSelect(cat.id);

              document
                .getElementById(`category-${cat.id}`)
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-[13px] sm:text-sm md:text-base transition-colors cursor-pointer shrink-0
               ${activeCategory === cat.id
                ? "bg-[#03081f] text-white shadow-md"
                : "bg-transparent text-black hover:bg-black/10"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default OfferCategoryTabs;