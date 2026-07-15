import { useState, useEffect } from "react";
import Navbar from "/src/components/layout/Navbar";
import Footer from "/src/components/layout/Footer";
import CartDetails from "/src/components/cart/CartDetails";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const handleIncrease = (id) => {
    const updatedCart = cartItems.map((cart) => {
      if (cart.id === id) {
        return {
          ...cart,
          quantity: cart.quantity + 1,
        };
      }
      return cart;
    });

    setCartItems(updatedCart);
    localStorage.setItem("UserCart", JSON.stringify(updatedCart));
  };

  const handleDecrease = (id) => {
    const updatedCart = cartItems.map((cart) =>
      cart.id === id ? { ...cart, quantity: cart.quantity - 1 } : cart
    ).filter((cart) => cart.quantity > 0);
    setCartItems(updatedCart);
    localStorage.setItem("UserCart", JSON.stringify(updatedCart));
  };

  const handleDelete = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("UserCart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("UserCart")) || [];
    console.log(storedCart);
    setCartItems(storedCart);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-brand-offwhite">
        <CartDetails
          cartItems={cartItems}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onDelete={handleDelete}
        />
      </main>
      <Footer />
    </div>
  );
}