import React, { useEffect, useState } from "react";
import MenuItemCard from "/src/components/restaurantDetails/MenuItemCard";
import { getMenuItems } from "/src/api/restaurantAPI";

export default function RestaurantDetail({ restaurantId }) {
  const [userCart, setUserCart] = useState([]);
  const [restaurantItems, setRestaurantItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("UserCart")) || [];
    setUserCart(storedCart);
  }, []);


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
    // const updatedCart = [...userCart, item];
    // setUserCart(updatedCart);

    const existingItem = userCart.find((cartItem) => cartItem.id === item.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = userCart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        console.log("This is cart item", cartItem);
        console.log(
          "If Updated Cart When quantity is more than 1",
          updatedCart,
        );
        return cartItem;
      });
    } else {
      updatedCart = [...userCart, { ...item }];
      console.log("else Updated Cart When the item is new", updatedCart);
    }

    localStorage.setItem("UserCart", JSON.stringify(updatedCart));
    setUserCart(updatedCart);

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