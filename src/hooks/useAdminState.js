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
import { getCategories, getPopularDeals, getPopularItems, getRestaurants } from "../api/adminAPI";
import { getMenuItems } from "../api/restaurantAPI";

const INITIAL_DEALS = [
  { id: 201, title: "Double Deal Wednesday", description: "Buy 1 Get 1 Free on all Medium Pizzas.", discount_percentage: 50, status: "Active" },
  { id: 202, title: "Lunch Combo Box", description: "Any Burger + Fries + Drink for only £12.", discount_percentage: 15, status: "Active" },
];

export default function useAdminState() {
  const [activeTab, setActiveTab] = useState("overview");
  const [popularItems, setPopularItems] = useState([]);
  const [popularDeals, setPopularDeals] = useState([]);

  const [orders, setOrders] = useState([]);

  const [restaurants, setRestaurants] = useState();
  const [categories, setCategories] = useState();
  const [menuItems, setMenuItems] = useState();
  const [deals, setDeals] = useState(INITIAL_DEALS);

  const [analytics, setAnalytics] = useState({
    total_orders: 0,
    total_revenue: 0,
    active_restaurants: 0,
    total_users: 0,
  });

  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [restaurantForm, setRestaurantForm] = useState({ name: "", description: "", address: "", image: null, is_active: true, is_featured: false });
  const [categoryForm, setCategoryForm] = useState({ name: "" });
  const [menuitemForm, setMenuitemForm] = useState({ name: "", restaurant: "", category: "", price: "", description: "", image: null });
  const [dealForm, setDealForm] = useState({ title: "", description: "", discount_percentage: "", status: "Active" });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOverview = async () => {
        try {
          setLoading(true);
          const data = await getAnalyticsOverview();
          setAnalytics(data);
        } catch (err) {
          console.error(err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

  const loadPopularItemsAndDeals = async () => {
        try {
          setLoading(true);
          const items = await getPopularItems();
          const deals = await getPopularDeals();
          setPopularItems(items);
          setPopularDeals(deals);
        } catch (err) {
          console.error(err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

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

  const loadRestaurants = async () => {
        try {
          setLoading(true);
          const data = await getRestaurants();
          setRestaurants(data);
        } catch (err) {
          console.error(err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

  const loadMenuItems = async () => {
        try {
          setLoading(true);
          const data = await getMenuItems();
          setMenuItems(data);
        } catch (err) {
          console.error(err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

  const loadCategories = async () => {
        try {
          setLoading(true);
          const data = await getCategories();
          setCategories(data);
        } catch (err) {
          console.error(err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
  useEffect(() => {
    Promise.all([
      loadOverview(),
      loadPopularItemsAndDeals(),
      loadOrders(),
      loadRestaurants(),
      loadMenuItems(),
      loadCategories()
    ]);
  }, []);

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    console.log('eh', item);
    if (item) {
      if (type.includes("restaurant")) setRestaurantForm({
          name: item.name || "",
          description: item.description || "",
          address: item.address || "",
          image: item.image || null,
          is_active: item.is_active ?? false,
          is_featured: item.is_featured ?? false,
      });
      else if (type.includes("category")) setCategoryForm({
        name: item.name || "",
      });
      else if (type.includes("menuitem")) setMenuitemForm({
          name: item.name || "",
          description: item.description || "",
          restaurant: item.restaurant?.id || "",
          image: item.image || null,
          price: item.price || "",
          category: item.category?.id || "",
      });
      else if (type.includes("deal")) setDealForm(item);
    } else {
      setRestaurantForm({ name: "", description: "", address: "", image: null, is_active: true, is_featured: false });
      setCategoryForm({ name: "", });
      setMenuitemForm({
              name: "",
              restaurant: "",
              category: "",
              price: "",
              description: "",
              image: null,
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

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    try{
      if (selectedItem) {
      await editRestaurant(
                selectedItem.id,
                restaurantForm
            );
    } else {
      await createRestaurant(
                restaurantForm
            );
    }
    await loadRestaurants();
    closeModal();
    } 
    catch (err) {
      console.log(err.response?.data);
      console.error(err);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try{
        await deleteRestaurant(id);
        await loadRestaurants();

      } catch (err){
        console.error(err)
        alert("Failed to delete the restaurant!");
      }
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try{
      if (selectedItem) {
      await editCategory(
                selectedItem.id,
                categoryForm
            );
    } else {
      await createCategory(
                categoryForm
            );
    }
    await loadCategories();
    closeModal();
    } 
    catch (err) {
      console.log(err.response?.data);
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try{
        await deleteCategory(id);
        await loadCategories();
      } catch (err){
        console.error(err)
        alert("Failed to delete the category!");
      }
    }
  };

  const handleMenuitemSubmit = async (e) => {
    e.preventDefault();
    try{
      if (selectedItem) {
      await editMenuItem(
                selectedItem.id,
                menuitemForm
            );
    } else {
      await createMenuItem(
                menuitemForm
            );
    }
    await loadMenuItems();
    closeModal();
    } 
    catch (err) {
      console.log(err.response?.data);
      console.error(err);
    }
  };

  const handleDeleteMenuitem = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try{
        await deleteMenuItem(id);
        await loadMenuItems();

      } catch (err){
        console.error(err)
        alert("Failed to delete the menu item!");
      }
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
  };

  return {
    activeTab,
    setActiveTab,
    handleTabChange,
    orders,
    analytics,
    popularItems,
    popularDeals,
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
  };
}
