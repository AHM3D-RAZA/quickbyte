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
  createDealItem,
  editDealItem,
  deleteDealItem,
} from "/src/api/adminAPI";
import { getCategories, getPopularDeals, getPopularItems, getRestaurants } from "../api/adminAPI";
import { getMenuItems, getDeals } from "../api/restaurantAPI";

export default function useAdminState() {
  const [activeTab, setActiveTab] = useState("overview");
  const [popularItems, setPopularItems] = useState([]);
  const [popularDeals, setPopularDeals] = useState([]);

  const [orders, setOrders] = useState([]);

  const [restaurants, setRestaurants] = useState();
  const [categories, setCategories] = useState();
  const [menuItems, setMenuItems] = useState();
  const [deals, setDeals] = useState([]);

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
  const [dealForm, setDealForm] = useState({
    name: "",
    description: "",
    combo_price: "",
    restaurant: "",
    image: null,
    is_active: true,
    is_featured: false,
    items: [], // [{ id?: <existing DealItem id>, menu_item_id, quantity }]
  });

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

  const loadDeals = async () => {
        try {
          setLoading(true);
          const data = await getDeals();
          setDeals(data);
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
      loadCategories(),
      loadDeals()
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
      else if (type.includes("deal")) setDealForm({
          name: item.name || "",
          description: item.description || "",
          combo_price: item.combo_price || "",
          // The deal itself may not always come back with a top-level `restaurant`
          // field depending on backend serialization, so fall back to inferring
          // it from the restaurant on the deal's first menu item.
          restaurant: item.restaurant?.id || item.restaurant || item.items?.[0]?.menu_item?.restaurant?.id || "",
          image: item.image || null,
          is_active: item.is_active ?? true,
          is_featured: item.is_featured ?? false,
          items: (item.items || []).map((dealItem) => ({
            id: dealItem.id,
            menu_item_id: dealItem.menu_item_id ?? dealItem.menu_item?.id ?? "",
            quantity: dealItem.quantity ?? 1,
          })),
      });
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
      setDealForm({
        name: "",
        description: "",
        combo_price: "",
        restaurant: "",
        image: null,
        is_active: true,
        is_featured: false,
        items: [],
      });
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

  const handleDealSubmit = async (e) => {
    e.preventDefault();

    const dealPayload = {
      name: dealForm.name,
      description: dealForm.description,
      combo_price: dealForm.combo_price,
      restaurant: dealForm.restaurant,
      image: dealForm.image,
      is_active: dealForm.is_active,
      is_featured: dealForm.is_featured,
    };

    try {
      let dealId;
      let originalItems = [];

      if (selectedItem) {
        dealId = selectedItem.id;
        originalItems = selectedItem.items || [];
        await editDeal(dealId, dealPayload);
      } else {
        const created = await createDeal(dealPayload);
        dealId = created.id;
      }

      // Diff the item rows against what the deal originally had:
      // anything that existed before but isn't in the form anymore gets deleted.
      const originalItemIds = originalItems.map((oi) => oi.id);
      const formItemIds = dealForm.items.filter((it) => it.id).map((it) => it.id);
      const removedItemIds = originalItemIds.filter((id) => !formItemIds.includes(id));

      for (const itemId of removedItemIds) {
        await deleteDealItem(itemId);
      }

      // Rows still in the form: update the ones that already existed,
      // create the ones that are brand new (no id yet).
      for (const row of dealForm.items) {
        if (!row.menu_item_id || !row.quantity) continue; // skip incomplete rows

        if (row.id) {
          await editDealItem(row.id, {
            deal_id: dealId,
            menu_item_id: row.menu_item_id,
            quantity: row.quantity,
          });
        } else {
          await createDealItem({
            deal_id: dealId,
            menu_item_id: row.menu_item_id,
            quantity: row.quantity,
          });
        }
      }

      await loadDeals();
      closeModal();
    } catch (err) {
      console.error(err);
      console.log(err.response?.data);
      alert("Failed to save the deal. Please check the form and try again.");
    }
  };

  const handleDeleteDeal = async (id) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      try {
        await deleteDeal(id);
        await loadDeals();
      } catch (err) {
        console.error(err);
        alert("Failed to delete the deal!");
      }
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
  };

  const activeOrdersCount = orders.filter((order) =>
    ACTIVE_ORDER_STATUSES.includes(order.current_status)
  ).length;

  return {
    activeTab,
    setActiveTab,
    handleTabChange,
    orders,
    activeOrdersCount,
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