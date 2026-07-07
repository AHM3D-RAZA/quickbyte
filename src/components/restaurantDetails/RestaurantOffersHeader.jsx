import OfferCategoryTabs from "./OfferCategoryTab";
import OfferSearchBar from "/src/components/restaurantDetails/OfferSearchBar";

function RestaurantOffersHeader({ restaurantName, searchValue, onSearchChange }) {
  return (
    <div className="flex w-full flex-col md:flex-row md:items-center md:justify-center md:text-center gap-4 px-6">
      <h2 className="text-2xl md:text-[32px] font-bold text-black font-poppins">
        All Offers from {restaurantName}
      </h2>
      <div className="flex flex-row md:ml-auto md:justify-center md:items-center">
        <OfferSearchBar value={searchValue} onChange={onSearchChange} />
      </div>
    </div>
  );
}

export default RestaurantOffersHeader;