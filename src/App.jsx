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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<RestaurantDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/popup" element={<ForPopupTest />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
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