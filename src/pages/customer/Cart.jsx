import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, deleteItem } from "../../redux/cartSlice";
import Navbar from "/src/components/layout/Navbar";
import Footer from "/src/components/layout/Footer";
import CartDetails from "/src/components/cart/CartDetails";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-brand-offwhite">
        <CartDetails
          cartItems={cartItems}
          onIncrease={(id) => dispatch(increaseQuantity(id))}
          onDecrease={(id) => dispatch(decreaseQuantity(id))}
          onDelete={(id) => dispatch(deleteItem(id))}
        />
      </main>
      <Footer />
    </div>
  );
}