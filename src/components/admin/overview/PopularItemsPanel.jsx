import { Sparkles } from "lucide-react";

export default function PopularItemsPanel({ menuItems }) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200/80">
        <h3 className="font-bold text-brand-dark flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-orange" /> Popular Menu Items
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {menuItems.slice(0, 3).map((item) => (
          <div
            key={item.menu_item__id}
            className="p-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors"
          >
            <div>
              <p className="font-bold text-brand-dark">{item.menu_item__name}</p>
              <p className="text-xs text-gray-500">
                {item.menu_item__restaurant_id__name}
              </p>
            </div>
            <span className="font-bold text-brand-dark">£{item.menu_item__price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
