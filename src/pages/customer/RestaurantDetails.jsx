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

      <div className="space-y-6 p-6 mx-6 lg:mx-16">
        <RestaurantOffersHeader restaurantName="McDolands" />
      </div>
      <OfferCategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />
      <OffersGrid onAddOffer={(offer) => console.log(`Added offer: ${offer.title}`)} />
      
      <RenderRestaurant />
      <Location />
      
      
      <div className="relative py-10 lg:py-30">
          <Reviews />
        </div>

      <div className="mx-auto  lg:px-15 lg:pb-15">
        <RestaurantGrid type="Similar" />
      </div>
      
      <Footer />
    </>
  )
}

export default RestaurantDetails