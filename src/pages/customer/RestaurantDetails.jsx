import React, { useEffect, useState } from 'react'
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
import { useParams } from 'react-router-dom'
import { getRestaurantById } from "/src/api/restaurantAPI";


const RestaurantDetails = () => {
    const { restaurantId } = useParams();
    const [activeCategory, setActiveCategory] = useState("Offers");
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
      const fetchRestaurant = async () => {
        try {
          const data = await getRestaurantById(restaurantId);
          console.log(data);
          setRestaurant(data);
          
        } catch (err) {
          console.error(err);
        }
      };

      fetchRestaurant();
    }, [restaurantId]);

  return (
    <>
      <Navbar />
      <RestaurantHero restaurant={restaurant?.name || "Restaurant"} description={restaurant?.description || "No description available"} />

      <div className="space-y-6 p-6 mx-6 lg:mx-16">
        <RestaurantOffersHeader restaurantName={restaurant?.name || "Restaurant"} />
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