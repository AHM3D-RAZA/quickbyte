import React, { useState } from 'react'
import RestaurantOffersHeader from '../../components/restaurantDetails/RestaurantOffersHeader'
import OfferCategoryTabs from '../../components/restaurantDetails/OfferCategoryTab'
import OffersGrid from '../../components/restaurantDetails/OffersGrid'
import RestaurantHero from '../../components/restaurantDetails/RestaurantHeo'
import Navbar from "/src/components/layout/Navbar";
import Footer from "/src/components/layout/Footer.jsx";
import RenderRestaurant from "/src/components/restaurantDetails/RenderRestaurant.jsx";
import RestaurantGrid from "/src/components/menu/RestaurantGrid.jsx";

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
      <div className="mx-auto space-y-6 px-15 pb-15">
        <RestaurantGrid type="Similar" />
      </div>
      
      <Footer />
    </>
  )
}

export default RestaurantDetails