import React, { useState } from 'react'
import RestaurantOffersHeader from '../../components/restaurantDetails/RestaurantOffersHeader'
import OfferCategoryTabs from '../../components/restaurantDetails/OfferCategoryTab'
import OffersGrid from '../../components/restaurantDetails/OffersGrid'
import RestaurantHero from '../../components/restaurantDetails/RestaurantHeo'
import Navbar from "/src/components/layout/Navbar";
import Footer from "/src/components/layout/Footer.jsx";
import RenderRestaurant from "/src/components/restaurantDetails/RenderRestaurant.jsx";
import RestaurantGrid from "/src/components/menu/RestaurantGrid.jsx";
import Reviews from "/src/components/restaurantDetails/Reviews.jsx";
import Location from "/src/components/restaurantDetails/Location.jsx";
import OverallRatingImage from "/src/assets/OverallRating.png";


const RestaurantDetails = () => {
    const [activeCategory, setActiveCategory] = useState("Offers");

  return (
    <>
      <Navbar />
      <RestaurantHero />

      <div className="space-y-6 p-6 mx-14">
        <RestaurantOffersHeader restaurantName="McDolands" />
      </div>
      <OfferCategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />
      <OffersGrid onAddOffer={(offer) => console.log(`Added offer: ${offer.title}`)} />
      
      <RenderRestaurant />
      <Location />
      
      
      <div className="relative py-30">
          <Reviews />
          
          {/* Overall Rating Badge positioned perfectly centered on the bottom border line */}
          <div className="absolute left-1/2 bottom-30 transform -translate-x-1/2 translate-y-1/2 z-10">
            <img 
              src={OverallRatingImage} 
              alt="Overall Rating" 
              className="w-[153px] h-[178px] rounded-[12px] bg-white border border-gray-200 shadow-sm" // Dimensions matching {2BA58F3A-382A-4CF4-B27F-C0939466E606}.png exactly
            />
          </div>
        </div>

      <div className="mx-auto space-y-6 px-15 pb-15">
        <RestaurantGrid type="Similar" />
      </div>
      
      <Footer />
    </>
  )
}

export default RestaurantDetails