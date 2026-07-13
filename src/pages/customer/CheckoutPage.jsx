import React from "react";
import Navbar from "/src/components/layout/Navbar";
import Footer from "/src/components/layout/Footer";
import CheckoutDetails from "/src/components/cart/CheckoutDetails";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite">
      <Navbar />
      <main className="flex-grow">
        <CheckoutDetails />
      </main>
      <Footer />
    </div>
  );
}
