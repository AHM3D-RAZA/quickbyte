import { useState, useEffect } from "react";
import { ACTIVE_ORDER_STATUSES } from "../components/admin/constants";
import {
  getAnalyticsOverview,
  getAllOrders,
  updateOrderStatus,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
  createCategory,
  editCategory,
  deleteCategory,
  createMenuItem,
  editMenuItem,
  deleteMenuItem,
  createDeal,
  editDeal,
  deleteDeal,
} from "/src/api/adminAPI";


const INITIAL_ORDERS = [
  { order_id: "QB-9482", customer: "Sarah Jenkins", restaurant: "Pizza Express", items: "1x Margherita, 1x Garlic Bread", total_price: 18.5, current_status: "pending", created_at: "2026-07-13T16:10:00Z" },
  { order_id: "QB-9481", customer: "David Miller", restaurant: "Burger Joint", items: "2x Cheeseburger, 1x Large Fries", total_price: 24.9, current_status: "preparing", created_at: "2026-07-13T15:55:00Z" },
  { order_id: "QB-9480", customer: "Emma Watson", restaurant: "Sushi Wok", items: "1x Salmon Roll, 1x Miso Soup", total_price: 15.2, current_status: "delivered", created_at: "2026-07-13T15:12:00Z" },
  { order_id: "QB-9479", customer: "Michael Brown", restaurant: "Taco Loco", items: "3x Beef Tacos, 1x Nachos", total_price: 22.0, current_status: "cancelled", created_at: "2026-07-13T14:40:00Z" },
];

const INITIAL_RESTAURANTS = [
  { id: 1, name: "Pizza Express", cuisines: "Italian, Pizza", address: "45 Regent St, London", rating: 4.7, status: "Active" },
  { id: 2, name: "Burger Joint", cuisines: "Burgers, Fast Food", address: "12 Piccadilly Circus, London", rating: 4.5, status: "Active" },
  { id: 3, name: "Sushi Wok", cuisines: "Japanese, Sushi", address: "88 Soho W1D, London", rating: 4.8, status: "Active" },
  { id: 4, name: "Taco Loco", cuisines: "Mexican, Street Food", address: "31 Camden High St, London", rating: 4.2, status: "Inactive" },
];

const INITIAL_CATEGORIES = [
  { id: 1, name: "Pizza", slug: "pizza" },
  { id: 2, name: "Burgers", slug: "burgers" },
  { id: 3, name: "Sushi", slug: "sushi" },
  { id: 4, name: "Sides", slug: "sides" },
  { id: 5, name: "Drinks", slug: "drinks" },
];

const INITIAL_MENU_ITEMS = [
  { id: 101, name: "Margherita Pizza", restaurant: "Pizza Express", category: "Pizza", price: 10.5, description: "Classic tomato sauce, fresh mozzarella, and basil leaves." },
  { id: 102, name: "Cheeseburger", restaurant: "Burger Joint", category: "Burgers", price: 8.9, description: "Flame-grilled beef patty, cheddar cheese, pickles, and burger sauce." },
  { id: 103, name: "Salmon Roll (8pcs)", restaurant: "Sushi Wok", category: "Sushi", price: 12.0, description: "Fresh Scottish salmon, avocado, cucumber, and sesame seeds." },
  { id: 104, name: "Large Fries", restaurant: "Burger Joint", category: "Sides", price: 3.5, description: "Crispy golden french fries salted to perfection." },
];

const INITIAL_DEALS = [
  { id: 201, title: "Double Deal Wednesday", description: "Buy 1 Get 1 Free on all Medium Pizzas.", discount_percentage: 50, status: "Active" },
  { id: 202, title: "Lunch Combo Box", description: "Any Burger + Fries + Drink for only £12.", discount_percentage: 15, status: "Active" },
];

export default function useAdminState() {
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState(INITIAL_RESTAURANTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
  const [deals, setDeals] = useState(INITIAL_DEALS);

  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [restaurantForm, setRestaurantForm] = useState({ name: "", cuisines: "", address: "", status: "Active" });
  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "" });
  const [menuitemForm, setMenuitemForm] = useState({ name: "", restaurant: "", category: "", price: "", description: "" });
  const [dealForm, setDealForm] = useState({ title: "", description: "", discount_percentage: "", status: "Active" });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
        try {
          setLoading(true);

          const data = await getAllOrders();

          setOrders(data);

        } catch (err) {
          console.error(err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
  useEffect(() => {
    loadOrders();
  }, []);

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    if (item) {
      if (type.includes("restaurant")) setRestaurantForm(item);
      else if (type.includes("category")) setCategoryForm(item);
      else if (type.includes("menuitem")) setMenuitemForm(item);
      else if (type.includes("deal")) setDealForm(item);
    } else {
      setRestaurantForm({ name: "", cuisines: "", address: "", status: "Active" });
      setCategoryForm({ name: "", slug: "" });
      setMenuitemForm({
        name: "",
        restaurant: restaurants[0]?.name || "",
        category: categories[0]?.name || "",
        price: "",
        description: "",
      });
      setDealForm({ title: "", description: "", discount_percentage: "", status: "Active" });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
      try {
        await updateOrderStatus(orderId, newStatus);

        await loadOrders();

      } catch (err) {
        console.error(err);
      }
  };

  const handleRestaurantSubmit = (e) => {
    e.preventDefault();
    if (selectedItem) {
      setRestaurants((prev) =>
        prev.map((r) => (r.id === selectedItem.id ? { ...r, ...restaurantForm } : r))
      );
    } else {
      setRestaurants((prev) => [...prev, { id: Date.now(), ...restaurantForm, rating: 5.0 }]);
    }
    closeModal();
  };

  const handleDeleteRestaurant = (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (selectedItem) {
      setCategories((prev) =>
        prev.map((c) => (c.id === selectedItem.id ? { ...c, ...categoryForm } : c))
      );
    } else {
      setCategories((prev) => [...prev, { id: Date.now(), ...categoryForm }]);
    }
    closeModal();
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleMenuitemSubmit = (e) => {
    e.preventDefault();
    const formattedPrice = parseFloat(menuitemForm.price) || 0;
    if (selectedItem) {
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id ? { ...item, ...menuitemForm, price: formattedPrice } : item
        )
      );
    } else {
      setMenuItems((prev) => [...prev, { id: Date.now(), ...menuitemForm, price: formattedPrice }]);
    }
    closeModal();
  };

  const handleDeleteMenuitem = (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleDealSubmit = (e) => {
    e.preventDefault();
    const formattedDiscount = parseInt(dealForm.discount_percentage) || 0;
    if (selectedItem) {
      setDeals((prev) =>
        prev.map((d) =>
          d.id === selectedItem.id ? { ...d, ...dealForm, discount_percentage: formattedDiscount } : d
        )
      );
    } else {
      setDeals((prev) => [...prev, { id: Date.now(), ...dealForm, discount_percentage: formattedDiscount }]);
    }
    closeModal();
  };

  const handleDeleteDeal = (id) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      setDeals((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const deliveredSales = orders
      .filter(o => o.current_status === "delivered")
      .reduce(
          (sum, o) => sum + Number(o.total_price),
          0
      );

  const activeOrdersCount = orders.filter((o) =>
    ACTIVE_ORDER_STATUSES.includes(o.current_status)
  ).length;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
  };

  return {
    activeTab,
    setActiveTab,
    handleTabChange,
    orders,
    restaurants,
    categories,
    menuItems,
    deals,
    modalType,
    selectedItem,
    searchQuery,
    setSearchQuery,
    restaurantForm,
    setRestaurantForm,
    categoryForm,
    setCategoryForm,
    menuitemForm,
    setMenuitemForm,
    dealForm,
    setDealForm,
    openModal,
    closeModal,
    handleUpdateOrderStatus,
    handleRestaurantSubmit,
    handleDeleteRestaurant,
    handleCategorySubmit,
    handleDeleteCategory,
    handleMenuitemSubmit,
    handleDeleteMenuitem,
    handleDealSubmit,
    handleDeleteDeal,
    deliveredSales,
    activeOrdersCount,
  };
}
