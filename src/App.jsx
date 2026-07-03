import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/customer/Home";
import RestaurantDetails from "./pages/customer/RestaurantDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<RestaurantDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;