import React, { useEffect, useState } from "react";
import MenuItemCard from "/src/components/restaurantDetails/MenuItemCard";
import { getMenuItems } from "/src/api/restaurantAPI";
import { useDispatch } from "react-redux";
import { addToCart } from "/src/redux/cartSlice";
import { useSelector } from "react-redux";
import { useAuthModal } from "../../context/AuthModalContext";

export default function RestaurantDetail({ restaurantId }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { openLogin } = useAuthModal();
  const [restaurantItems, setRestaurantItems] = useState([]);


  useEffect(() => {
    const fetchRestaurantItems = async () => {
      try {
        const data = await getMenuItems();
        console.log("All data from menu Items API", data);
        setRestaurantItems(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRestaurantItems();
  }, [restaurantId]);

  const filteredItems = restaurantItems.filter(
    item => item.restaurant.id == restaurantId
  );

  const categories = [];
  filteredItems.forEach((item) => {
    const categoryId = item.category?.id || "others";
    const categoryName = item.category?.name || "Others";

    const existingCategory = categories.find(
      (cat) => cat.id === categoryId
    );

    if (existingCategory) {
      existingCategory.items.push(item);
    } else {
      categories.push({
        id: categoryId,
        name: categoryName,
        items: [item],
      });
    }
  });

  const handleAddToCard = (item) => {
    if(!user) {
      openLogin();
      return;
    }
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
    <div className="mx-auto max-w-6xl space-y-2 p-3">

      {/* Restaurant Categories With Items */}
      <div className="space-y-14">
        {categories.map((category) => (
          <section key={category.id} id={`category-${category.id}`}>
            <h2 className="mb-6 text-[32px] font-bold text-[#03081F]">
              {category.name}
            </h2>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
              {category.items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAdd={() => handleAddToCard(item)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}