import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDeals } from "/src/api/restaurantAPI";
import DealBreadcrumb from "./Breadcrumb";
import DealGallery from "./ImageGallery";
import DealInfoPanel from "./InfoPanel";

export default function DealDetailPage() {
  const { dealId } = useParams();
  const [deal, setDeal] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const data = await getDeals();

        const selectedDeal = data.find(
          (item) => item.id == dealId
        );

        setDeal(selectedDeal);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeal();
  }, [dealId]);

  if (!deal) {
    return <div>Loading...</div>;
  }

  const dealData = {
    name: deal.name,

    rating: 4.8,          // dummy for now
    reviewCount: 120,     // dummy
    orderCount: 340,      // dummy

    description: deal.description,

    price: deal.combo_price,

    originalPrice: null,  // API doesn't return this

    discountLabel: "",    // API doesn't return a discount

    deliveryTime: "30-40 mins", // dummy

    freeDeliveryMin: 999, // dummy

    savings: 0,

    image: `http://127.0.0.1:8000${deal.image}`,
  };

  return (
    <>
    <div className="max-w-6xl mx-auto px-6 py-8">
      <DealBreadcrumb category="Deals" dealName={dealData.name} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <DealGallery images={dealData.image} discount="25% OFF" />
        <DealInfoPanel
          deal={dealData}
          onAddToCart={(qty) => console.log("add to cart", qty)}
          onAddToWishlist={() => console.log("wishlist")}
        />
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-6 pb-10">
  <h3 className="text-2xl font-bold text-[#03081F] mb-6">
    Included Items
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {deal.items.map((item) => (
      <div
        key={item.id}
        className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
      >
        <img
          src={`http://127.0.0.1:8000${item.menu_item.image}`}
          alt={item.menu_item.name}
          className="w-20 h-20 rounded-xl object-cover"
        />

        <div className="flex-1">
          <h4 className="font-bold text-lg text-[#03081F]">
            {item.menu_item.name}
          </h4>

          <p className="text-[#FC8A06] font-semibold mt-1">
            ${item.menu_item.price}
          </p>

          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-orange-100 text-[#FC8A06] text-sm font-semibold">
            Qty: {item.quantity}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
    </>
  );
}