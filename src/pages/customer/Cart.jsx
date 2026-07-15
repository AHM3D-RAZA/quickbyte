import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, changeItemQuantity, removeItemFromCart } from "../../redux/cartSlice";
import Navbar from "/src/components/layout/Navbar";
import Footer from "/src/components/layout/Footer";
import CartDetails from "/src/components/cart/CartDetails";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (item) => {
    dispatch(changeItemQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity <= 1) return; // don't let it go to 0 here — use delete instead
    dispatch(changeItemQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleDelete = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-brand-offwhite">
        {status === "loading" && <p className="text-center py-10">Loading your cart...</p>}
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