import OfferCard from "./OfferCard";
import { getDeals } from "/src/api/restaurantAPI";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "/src/redux/cartSlice";

function OffersGrid({ restaurantId }) {
  const dispatch = useDispatch();
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getDeals();
        setOffers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOffers();
  }, [restaurantId]);

  const filteredOffers = offers.filter(
    item => item?.items?.[0]?.menu_item?.restaurant?.id == restaurantId
  );

  const handleAddToCard = (item) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      image: item.image ? `http://127.0.0.1:8000${item.image}` : null,
      description: item.description,
    }));
    window.alert("Cart Updated");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:px-20 lg:py-20 px-6 py-6">
      {filteredOffers.map((offer) => (
        <OfferCard
          key={offer.id}
          restaurantLabel={offer.items[0].menu_item.restaurant.name}
          title={offer.name}
          discount={`$${offer.combo_price}`}
          image={offer.image ? `http://localhost:8000${offer.image}` : "/src/assets/offer3.png"}
          onAdd={() => handleAddToCard(offer)}
          onSelect={() => navigate(`/deal/${offer.id}`)}
        />
      ))}
    </div>
  );
}

export default OffersGrid