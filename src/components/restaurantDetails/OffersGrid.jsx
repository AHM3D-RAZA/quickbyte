import OfferCard from "./OfferCard";
import { getDeals } from "/src/api/restaurantAPI";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuthModal } from "../../context/AuthModalContext";
import { addItemToCart } from "../../redux/cartSlice";

function OffersGrid({ restaurantId, searchQuery = "" }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { openLogin } = useAuthModal();
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

  const filteredOffers = offers
    .filter(item => item?.items?.[0]?.menu_item?.restaurant?.id == restaurantId)
    .filter(item =>
      searchQuery.trim() === "" ||
      item.name?.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

  const handleAddToCard = (item) => {
    if (!user) {
      openLogin();
      return;
    }
    dispatch(addItemToCart({ dealId: item.id }));
    window.alert("Cart Updated");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:px-20 lg:py-20 px-6 py-6">
      {filteredOffers.length === 0 && (
        <p className="col-span-full text-sm text-gray-500 py-6">
          {searchQuery.trim() ? "No offers match your search." : "No offers available right now."}
        </p>
      )}
      {filteredOffers.map((offer) => (
        <OfferCard
          key={offer.id}
          restaurantLabel={offer.items[0].menu_item.restaurant.name}
          title={offer.name}
          discount={`$${offer.combo_price}`}
          image={offer.image ? `${import.meta.env.VITE_API_URL}${offer.image}` : "/src/assets/offer3.png"}
          onAdd={() => handleAddToCard(offer)}
          onSelect={() => navigate(`/deal/${offer.id}`)}
        />
      ))}
    </div>
  );
}

export default OffersGrid