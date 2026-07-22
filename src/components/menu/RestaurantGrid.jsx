import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import { useEffect } from "react";
import { getRestaurants } from "/src/api/restaurantAPI";
import { useNavigate } from "react-router-dom";

function RestaurantGrid({ type }) {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {

    const fetchRestaurants = async () => {
        try {
            const data = await getRestaurants();
            // console.log(Array.isArray(data)); // true or false
            console.log(data);
            setRestaurants(data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchRestaurants();
  }, []);

  return (
    <section className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">{type} Restaurants</h2>
      
      {/* Mobile: sliding row */}
      <div className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
        {restaurants.map((r) => (
          <div key={r.id} className="shrink-0 w-40 snap-start">
            <RestaurantCard {...r} image={`${BASE_URL}${r.image}`}
             onClick={() => navigate(`/restaurant/${r.id}`)} />
          </div>
        ))}
      </div>

      {/* Desktop: unchanged grid */}
      <div className="hidden lg:grid grid-cols-6 gap-5">
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} {...r} image={`${BASE_URL}${r.image}`}
           onClick={() => navigate(`/restaurant/${r.id}`)} />
        ))}
      </div>

    </section>
  );
}

export default RestaurantGrid;