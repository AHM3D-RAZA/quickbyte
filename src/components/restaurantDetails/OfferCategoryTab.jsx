import { useState } from "react";
import { useTheme } from "/src/context/ThemeContext";

const categories = [
  "Offers", "Burgers", "Fries", "Snacks", "Salads",
  "Cold drinks", "Happy Meal®", "Desserts", "Hot drinks", "Sauces", "Orbit®"
];

function OfferCategoryTabs({ activeCategory, onSelect }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
    {/* Mobile: dropdown */}
    <div className="lg:hidden flex justify-center items-center">
        <select
            value={activeCategory}
            onChange={(e) => onSelect(categories[Number(e.target.value)])}
            className="border border-orange-500 rounded-full px-4 py-4 text-sm font-medium text-black bg-white"
          >
            {categories.map((cat, index) => (
              <option key={cat} value={index}>{cat}</option>
            ))}
          </select>
    </div>
    <div className={`hidden lg:flex items-center justify-between gap-x-4 gap-y-2 px-6 py-4 font-poppins ${
                isDark ? "bg-brand-orange" : "bg-[#f3f3f3]"
              }`}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full font-bold text-sm md:text-base transition-colors cursor-pointer
            ${activeCategory === cat ? "bg-[#03081f] text-white" : "bg-transparent text-black"}`}
        >
          {cat}
        </button>
      ))}
    </div>
    </>
  );
}

export default OfferCategoryTabs;