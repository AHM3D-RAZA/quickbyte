import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/customer/Home";
import RestaurantDetails from "./pages/customer/RestaurantDetails";
import ForPopupTest from "./pages/customer/ForPopupTest";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import AuthModal from "/src/components/auth/AuthModal";
import Profile from "/src/pages/customer/Profile";
import ProtectedRoute from "/src/components/auth/ProtectedRoute";
import AdminDashboard from "/src/pages/admin/AdminDashboard";
import AdminRoute from "/src/pages/auth/AdminRoute";
import Checkout from "/src/components/cart/Checkout";
import Cart from "/src/pages/customer/Cart";
import CheckoutPage from "/src/pages/customer/CheckoutPage";
import CategoryItems from "/src/pages/customer/CategoryItems";
import DealDetails from "./pages/customer/DealDetails";
import TrackOrder from "./pages/customer/TrackOrder";
import NotFound from "./pages/customer/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/popup" element={<ForPopupTest />} />
        <Route path="/category/:categoryId" element={<CategoryItems />} />
        <Route path="/deal/:dealId" element={<DealDetails />} />
        <Route path="/orders/track" element={<TrackOrder />} />
        <Route path="/*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

      </Routes>
      <AuthModal />
    </BrowserRouter>
  );
}

export default App;