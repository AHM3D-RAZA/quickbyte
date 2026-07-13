import { useState } from "react";
import QuantitySelector from "./QuantitySelector";

function DealInfoPanel({ deal, onAddToCart, onAddToWishlist }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full font-poppins">
      {/* Deal of the day badge */}
      <span className="inline-flex items-center gap-1 bg-orange-50 text-[#fc8a06] font-semibold text-sm px-3 py-1.5 rounded-full mb-4">
        🛍️ DEAL OF THE DAY
      </span>

      <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">{deal.name}</h1>

      {/* Rating row */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span className="text-[#fc8a06]">★</span>
        <span className="font-semibold text-black">{deal.rating}</span>
        <span>({deal.reviewCount} reviews)</span>
        <span>|</span>
        <span>{deal.orderCount}+ orders</span>
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed">{deal.description}</p>

      {/* Price row */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-bold text-[#fc8a06]">Rs. {deal.price}</span>
        <span className="text-lg text-gray-400 line-through">Rs. {deal.originalPrice}</span>
        <span className="bg-red-50 text-[#e12b25] font-semibold text-sm px-2.5 py-1 rounded-md">
          {deal.discountLabel}
        </span>
      </div>

      {/* Info list */}
      <div className="flex flex-col gap-4 mb-6">
        <InfoRow icon="clock" title={deal.deliveryTime} subtitle="Delivery Time" />
        <InfoRow icon="truck" title="Free Delivery" subtitle={`On orders above Rs. ${deal.freeDeliveryMin}`} />
        <InfoRow icon="badge" title="Best Deal" subtitle={`You save Rs. ${deal.savings}`} />
      </div>

      {/* Quantity + Add to cart */}
      <div className="flex items-center gap-4 mb-4">
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => setQuantity((q) => q + 1)}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
        />
        <button
          onClick={() => onAddToCart(quantity)}
          className="flex-1 bg-[#fc8a06] hover:bg-[#e57c05] text-white font-semibold text-lg py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          🛒 Add to Cart
        </button>
      </div>

      <button
        onClick={onAddToWishlist}
        className="flex items-center gap-2 text-gray-600 hover:text-black text-sm cursor-pointer"
      >
        ♡ Add to Wishlist
      </button>
    </div>
  );
}

function InfoRow({ icon, title, subtitle }) {
  const icons = {
    clock: "🕐",
    truck: "🚚",
    badge: "🛡️",
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xl text-[#fc8a06]">{icons[icon]}</span>
      <div>
        <p className="font-semibold text-black text-sm">{title}</p>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

export default DealInfoPanel;