import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Store,
  UtensilsCrossed,
  Tags,
  Percent,
  LogOut,
  Plus,
  Search,
  Check,
  X,
  Edit2,
  Trash2,
  TrendingUp,
  User,
  ShoppingBag,
  Sliders,
  Sparkles
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // --- Mock Databases / Local state to run full CRUD simulator ---

  // 1. Orders
  const [orders, setOrders] = useState([
    { order_id: "QB-9482", customer: "Sarah Jenkins", restaurant: "Pizza Express", items: "1x Margherita, 1x Garlic Bread", total_price: 18.50, current_status: "pending", created_at: "2026-07-13T16:10:00Z" },
    { order_id: "QB-9481", customer: "David Miller", restaurant: "Burger Joint", items: "2x Cheeseburger, 1x Large Fries", total_price: 24.90, current_status: "preparing", created_at: "2026-07-13T15:55:00Z" },
    { order_id: "QB-9480", customer: "Emma Watson", restaurant: "Sushi Wok", items: "1x Salmon Roll, 1x Miso Soup", total_price: 15.20, current_status: "delivered", created_at: "2026-07-13T15:12:00Z" },
    { order_id: "QB-9479", customer: "Michael Brown", restaurant: "Taco Loco", items: "3x Beef Tacos, 1x Nachos", total_price: 22.00, current_status: "cancelled", created_at: "2026-07-13T14:40:00Z" },
  ]);

  // 2. Restaurants
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: "Pizza Express", cuisines: "Italian, Pizza", address: "45 Regent St, London", rating: 4.7, status: "Active" },
    { id: 2, name: "Burger Joint", cuisines: "Burgers, Fast Food", address: "12 Piccadilly Circus, London", rating: 4.5, status: "Active" },
    { id: 3, name: "Sushi Wok", cuisines: "Japanese, Sushi", address: "88 Soho W1D, London", rating: 4.8, status: "Active" },
    { id: 4, name: "Taco Loco", cuisines: "Mexican, Street Food", address: "31 Camden High St, London", rating: 4.2, status: "Inactive" },
  ]);

  // 3. Categories
  const [categories, setCategories] = useState([
    { id: 1, name: "Pizza", slug: "pizza" },
    { id: 2, name: "Burgers", slug: "burgers" },
    { id: 3, name: "Sushi", slug: "sushi" },
    { id: 4, name: "Sides", slug: "sides" },
    { id: 5, name: "Drinks", slug: "drinks" },
  ]);

  // 4. Menu Items
  const [menuItems, setMenuItems] = useState([
    { id: 101, name: "Margherita Pizza", restaurant: "Pizza Express", category: "Pizza", price: 10.50, description: "Classic tomato sauce, fresh mozzarella, and basil leaves." },
    { id: 102, name: "Cheeseburger", restaurant: "Burger Joint", category: "Burgers", price: 8.90, description: "Flame-grilled beef patty, cheddar cheese, pickles, and burger sauce." },
    { id: 103, name: "Salmon Roll (8pcs)", restaurant: "Sushi Wok", category: "Sushi", price: 12.00, description: "Fresh Scottish salmon, avocado, cucumber, and sesame seeds." },
    { id: 104, name: "Large Fries", restaurant: "Burger Joint", category: "Sides", price: 3.50, description: "Crispy golden french fries salted to perfection." },
  ]);

  // 5. Deals
  const [deals, setDeals] = useState([
    { id: 201, title: "Double Deal Wednesday", description: "Buy 1 Get 1 Free on all Medium Pizzas.", discount_percentage: 50, status: "Active" },
    { id: 202, title: "Lunch Combo Box", description: "Any Burger + Fries + Drink for only £12.", discount_percentage: 15, status: "Active" },
  ]);

  // --- CRUD States & Modals ---
  const [modalType, setModalType] = useState(null); // 'add-restaurant' | 'edit-restaurant' | 'add-category' | 'edit-category' | 'add-menuitem' | 'edit-menuitem' | 'add-deal' | 'edit-deal'
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [restaurantForm, setRestaurantForm] = useState({ name: "", cuisines: "", address: "", status: "Active" });
  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "" });
  const [menuitemForm, setMenuitemForm] = useState({ name: "", restaurant: "", category: "", price: "", description: "" });
  const [dealForm, setDealForm] = useState({ title: "", description: "", discount_percentage: "", status: "Active" });

  // --- Helper Functions ---
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
      setMenuitemForm({ name: "", restaurant: restaurants[0]?.name || "", category: categories[0]?.name || "", price: "", description: "" });
      setDealForm({ title: "", description: "", discount_percentage: "", status: "Active" });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
  };

  // --- CRUD Handlers ---

  // Order Status PATCH Simulator
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => (o.order_id === orderId ? { ...o, current_status: newStatus } : o))
    );
  };

  // Restaurant CRUD
  const handleRestaurantSubmit = (e) => {
    e.preventDefault();
    if (selectedItem) {
      setRestaurants(prev => prev.map(r => (r.id === selectedItem.id ? { ...r, ...restaurantForm } : r)));
    } else {
      setRestaurants(prev => [...prev, { id: Date.now(), ...restaurantForm, rating: 5.0 }]);
    }
    closeModal();
  };

  const handleDeleteRestaurant = (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      setRestaurants(prev => prev.filter(r => r.id !== id));
    }
  };

  // Category CRUD
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (selectedItem) {
      setCategories(prev => prev.map(c => (c.id === selectedItem.id ? { ...c, ...categoryForm } : c)));
    } else {
      setCategories(prev => [...prev, { id: Date.now(), ...categoryForm }]);
    }
    closeModal();
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  // Menu Item CRUD
  const handleMenuitemSubmit = (e) => {
    e.preventDefault();
    const formattedPrice = parseFloat(menuitemForm.price) || 0;
    if (selectedItem) {
      setMenuItems(prev => prev.map(item => (item.id === selectedItem.id ? { ...item, ...menuitemForm, price: formattedPrice } : item)));
    } else {
      setMenuItems(prev => [...prev, { id: Date.now(), ...menuitemForm, price: formattedPrice }]);
    }
    closeModal();
  };

  const handleDeleteMenuitem = (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // Deal CRUD
  const handleDealSubmit = (e) => {
    e.preventDefault();
    const formattedDiscount = parseInt(dealForm.discount_percentage) || 0;
    if (selectedItem) {
      setDeals(prev => prev.map(d => (d.id === selectedItem.id ? { ...d, ...dealForm, discount_percentage: formattedDiscount } : d)));
    } else {
      setDeals(prev => [...prev, { id: Date.now(), ...dealForm, discount_percentage: formattedDiscount }]);
    }
    closeModal();
  };

  const handleDeleteDeal = (id) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      setDeals(prev => prev.filter(d => d.id !== id));
    }
  };

  // Analytical Calculations
  const deliveredSales = orders
    .filter(o => o.current_status === "delivered")
    .reduce((sum, o) => sum + o.total_price, 0);

  const activeOrdersCount = orders.filter(o => ["pending", "accepted", "preparing", "out_for_delivery"].includes(o.current_status)).length;

  return (
    <div className="min-h-screen bg-brand-offwhite flex font-body text-brand-dark">
      {/* Sidebar matching primary Brand Dark color */}
      <aside className="bg-brand-dark text-white w-64 flex-shrink-0 hidden md:flex flex-col border-r border-black/20">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black text-brand-orange tracking-tight">
            QuickByte<span className="text-xs text-gray-400 font-normal ml-2 bg-white/5 px-2 py-0.5 rounded">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "orders", label: "Manage Orders", icon: ClipboardList, badge: activeOrdersCount },
            { id: "restaurants", label: "Restaurants", icon: Store },
            { id: "menu", label: "Menu Items", icon: UtensilsCrossed },
            { id: "categories", label: "Categories", icon: Tags },
            { id: "deals", label: "Deals & Offers", icon: Percent },
          ].map(tab => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery("");
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isTabActive
                    ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    isTabActive ? "bg-white text-brand-orange" : "bg-brand-orange text-white"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Store Front</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200/80 h-16 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-brand-dark capitalize">
              {activeTab === "menu" ? "Menu Items" : activeTab.replace("-", " ")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-black text-sm">
                A
              </div>
              <span className="text-sm font-semibold text-brand-dark">Manager Panel</span>
            </div>
          </div>
        </header>

        {/* Outer Tab Views */}
        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Top Analytical Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: "Total Revenue", value: `£${deliveredSales.toFixed(2)}`, desc: "From completed orders", icon: TrendingUp },
                  { label: "Active Orders", value: activeOrdersCount, desc: "Pending processing", icon: ShoppingBag },
                  { label: "Partner Restaurants", value: restaurants.length, desc: "Locations onboarded", icon: Store },
                  { label: "Menu Catalogue", value: menuItems.length, desc: "Total registered dishes", icon: UtensilsCrossed },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                          <p className="text-2xl font-black text-brand-dark mt-2">{stat.value}</p>
                        </div>
                        <div className="bg-orange-50 text-brand-orange p-2 rounded-xl group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{stat.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Lists Side-by-side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Popular Dishes */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200/80">
                    <h3 className="font-bold text-brand-dark flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-brand-orange" /> Popular Menu Items
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {menuItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                        <div>
                          <p className="font-bold text-brand-dark">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.restaurant} • {item.category}</p>
                        </div>
                        <span className="font-bold text-brand-dark">£{item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Deals */}
                <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200/80">
                    <h3 className="font-bold text-brand-dark flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-brand-orange" /> Popular Active Deals
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {deals.map((deal) => (
                      <div key={deal.id} className="p-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                        <div>
                          <p className="font-bold text-brand-dark">{deal.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{deal.description}</p>
                        </div>
                        <span className="text-xs font-black text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100 shrink-0">
                          {deal.discount_percentage}% OFF
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE ORDERS */}
          {activeTab === "orders" && (
            <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200/80 flex justify-between items-center">
                <h3 className="font-bold text-brand-dark">Active System Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 font-bold text-xs uppercase tracking-wider">
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Restaurant</th>
                      <th className="px-6 py-4">Items</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map(order => (
                      <tr key={order.order_id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-brand-dark">{order.order_id}</td>
                        <td className="px-6 py-4 font-semibold">{order.customer}</td>
                        <td className="px-6 py-4 text-gray-600">{order.restaurant}</td>
                        <td className="px-6 py-4 text-gray-500 text-xs truncate max-w-xs">{order.items}</td>
                        <td className="px-6 py-4 font-bold text-brand-dark">£{order.total_price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            order.current_status === "delivered" ? "bg-green-50 text-brand-green border border-green-200" :
                            order.current_status === "preparing" || order.current_status === "accepted" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                            order.current_status === "pending" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                            "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}>
                            {order.current_status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex gap-1.5 justify-end">
                            {order.current_status === "pending" && (
                              <button
                                onClick={() => handleUpdateOrderStatus(order.order_id, "accepted")}
                                className="px-2.5 py-1 text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange/90 rounded-lg transition-colors"
                              >
                                Accept
                              </button>
                            )}
                            {order.current_status === "accepted" && (
                              <button
                                onClick={() => handleUpdateOrderStatus(order.order_id, "preparing")}
                                className="px-2.5 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                              >
                                Prepare
                              </button>
                            )}
                            {order.current_status === "preparing" && (
                              <button
                                onClick={() => handleUpdateOrderStatus(order.order_id, "out_for_delivery")}
                                className="px-2.5 py-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                              >
                                Send Out
                              </button>
                            )}
                            {order.current_status === "out_for_delivery" && (
                              <button
                                onClick={() => handleUpdateOrderStatus(order.order_id, "delivered")}
                                className="px-2.5 py-1 text-xs font-bold text-white bg-brand-green hover:bg-brand-green/95 rounded-lg transition-colors"
                              >
                                Deliver
                              </button>
                            )}
                            {!["delivered", "cancelled"].includes(order.current_status) && (
                              <button
                                onClick={() => handleUpdateOrderStatus(order.order_id, "cancelled")}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                                title="Cancel Order"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                            {["delivered", "cancelled"].includes(order.current_status) && (
                              <span className="text-xs text-gray-400 font-medium px-2">—</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: RESTAURANTS (CRUD) */}
          {activeTab === "restaurants" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm">
                <span className="text-sm text-gray-500 font-semibold">Registered Restaurant Brands</span>
                <button
                  onClick={() => openModal("add-restaurant")}
                  className="bg-brand-orange hover:bg-brand-orange/95 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-brand-orange/15 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Register Restaurant
                </button>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 font-bold text-xs uppercase tracking-wider">
                        <th className="px-6 py-4">Restaurant</th>
                        <th className="px-6 py-4">Cuisines</th>
                        <th className="px-6 py-4">Address</th>
                        <th className="px-6 py-4">Rating</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {restaurants.map(r => (
                        <tr key={r.id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="px-6 py-4 font-bold text-brand-dark">{r.name}</td>
                          <td className="px-6 py-4 text-gray-600">{r.cuisines}</td>
                          <td className="px-6 py-4 text-gray-500 text-xs truncate max-w-xs">{r.address}</td>
                          <td className="px-6 py-4 font-semibold">⭐ {r.rating.toFixed(1)}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              r.status === "Active" ? "bg-green-50 text-brand-green border border-green-200" :
                              "bg-gray-100 text-gray-500 border border-gray-200"
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => openModal("edit-restaurant", r)}
                                className="p-2 text-gray-500 hover:text-brand-orange hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteRestaurant(r.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MENU ITEMS (CRUD) */}
          {activeTab === "menu" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search menu..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 focus:border-brand-orange focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-3" />
                </div>
                <button
                  onClick={() => openModal("add-menuitem")}
                  className="bg-brand-orange hover:bg-brand-orange/95 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-brand-orange/15 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <Plus className="w-4 h-4" /> Create Menu Item
                </button>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 font-bold text-xs uppercase tracking-wider">
                        <th className="px-6 py-4">Dish</th>
                        <th className="px-6 py-4">Restaurant</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {menuItems
                        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(item => (
                          <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                            <td className="px-6 py-4 font-bold text-brand-dark">{item.name}</td>
                            <td className="px-6 py-4 text-gray-600">{item.restaurant}</td>
                            <td className="px-6 py-4">
                              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold">
                                {item.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-black text-brand-dark">£{item.price.toFixed(2)}</td>
                            <td className="px-6 py-4 text-xs text-gray-400 truncate max-w-xs">{item.description}</td>
                            <td className="px-6 py-4 text-right">
                              <div className="inline-flex gap-2">
                                <button
                                  onClick={() => openModal("edit-menuitem", item)}
                                  className="p-2 text-gray-500 hover:text-brand-orange hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteMenuitem(item.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CATEGORIES (CRUD) */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm">
                <span className="text-sm text-gray-500 font-semibold">Menu Categories</span>
                <button
                  onClick={() => openModal("add-category")}
                  className="bg-brand-orange hover:bg-brand-orange/95 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-brand-orange/15 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Category
                </button>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden max-w-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 font-bold text-xs uppercase tracking-wider">
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Slug</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {categories.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="px-6 py-4 font-mono text-gray-400">{c.id}</td>
                          <td className="px-6 py-4 font-bold text-brand-dark">{c.name}</td>
                          <td className="px-6 py-4 font-mono text-xs text-gray-600">/{c.slug}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => openModal("edit-category", c)}
                                className="p-2 text-gray-500 hover:text-brand-orange hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(c.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DEALS (CRUD) */}
          {activeTab === "deals" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm">
                <span className="text-sm text-gray-500 font-semibold">Active Offers & Promo Deals</span>
                <button
                  onClick={() => openModal("add-deal")}
                  className="bg-brand-orange hover:bg-brand-orange/95 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-brand-orange/15 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Promo Deal
                </button>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 font-bold text-xs uppercase tracking-wider">
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Discount</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {deals.map(d => (
                        <tr key={d.id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="px-6 py-4 font-bold text-brand-dark">{d.title}</td>
                          <td className="px-6 py-4 text-gray-600 text-xs max-w-sm truncate">{d.description}</td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-black text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                              {d.discount_percentage}% OFF
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              d.status === "Active" ? "bg-green-50 text-brand-green border border-green-200" :
                              "bg-gray-100 text-gray-500 border border-gray-200"
                            }`}>
                              {d.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => openModal("edit-deal", d)}
                                className="p-2 text-gray-500 hover:text-brand-orange hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteDeal(d.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- CRUD POPUP MODALS --- */}

      {/* 1. Restaurant Add/Edit Modal */}
      {modalType && modalType.includes("restaurant") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-brand-dark">{selectedItem ? "Modify Restaurant Brand" : "Register Restaurant"}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleRestaurantSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Restaurant Name</label>
                <input
                  type="text"
                  required
                  value={restaurantForm.name}
                  onChange={e => setRestaurantForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cuisines</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Burgers, Pizza"
                  value={restaurantForm.cuisines}
                  onChange={e => setRestaurantForm(prev => ({ ...prev, cuisines: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={restaurantForm.address}
                  onChange={e => setRestaurantForm(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                <select
                  value={restaurantForm.status}
                  onChange={e => setRestaurantForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-brand-orange text-white rounded-lg text-sm font-bold hover:bg-brand-orange/95">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Category Add/Edit Modal */}
      {modalType && modalType.includes("category") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-brand-dark">{selectedItem ? "Modify Category" : "Add Food Category"}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Desserts"
                  value={categoryForm.name}
                  onChange={e => {
                    const val = e.target.value;
                    setCategoryForm({ name: val, slug: val.toLowerCase().replace(/[^a-z0-9]+/g, "-") });
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Slug URL</label>
                <input
                  type="text"
                  required
                  readOnly
                  value={categoryForm.slug}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-brand-orange text-white rounded-lg text-sm font-bold hover:bg-brand-orange/95">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Menu Item Add/Edit Modal */}
      {modalType && modalType.includes("menuitem") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-brand-dark">{selectedItem ? "Modify Dish" : "Create Menu Item"}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleMenuitemSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={menuitemForm.name}
                  onChange={e => setMenuitemForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Restaurant</label>
                  <select
                    value={menuitemForm.restaurant}
                    onChange={e => setMenuitemForm(prev => ({ ...prev, restaurant: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none bg-white"
                  >
                    {restaurants.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                  <select
                    value={menuitemForm.category}
                    onChange={e => setMenuitemForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none bg-white"
                  >
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (£)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={menuitemForm.price}
                  onChange={e => setMenuitemForm(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea
                  value={menuitemForm.description}
                  onChange={e => setMenuitemForm(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-brand-orange text-white rounded-lg text-sm font-bold hover:bg-brand-orange/95">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Deal Add/Edit Modal */}
      {modalType && modalType.includes("deal") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-brand-dark">{selectedItem ? "Modify Promo Offer" : "Add Discount Deal"}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleDealSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Deal Title</label>
                <input
                  type="text"
                  required
                  value={dealForm.title}
                  onChange={e => setDealForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={dealForm.description}
                  onChange={e => setDealForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Discount %</label>
                  <input
                    type="number"
                    required
                    value={dealForm.discount_percentage}
                    onChange={e => setDealForm(prev => ({ ...prev, discount_percentage: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                  <select
                    value={dealForm.status}
                    onChange={e => setDealForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-brand-orange text-white rounded-lg text-sm font-bold hover:bg-brand-orange/95">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}