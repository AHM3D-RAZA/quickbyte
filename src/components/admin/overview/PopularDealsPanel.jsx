import { Sliders } from "lucide-react";

export default function PopularDealsPanel({ deals }) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200/80">
        <h3 className="font-bold text-brand-dark flex items-center gap-2">
          <Sliders className="w-5 h-5 text-brand-orange" /> Popular Active Deals
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {deals.map((deal) => (
          <div
            key={deal.deal__id}
            className="p-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors"
          >
            <div>
              <p className="font-bold text-brand-dark">{deal.deal__name}</p>
            </div>
            <span className="text-xs font-black text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100 shrink-0">
              ${deal.deal__combo_price} ONLY
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
