import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, CreditCard, DollarSign, Send, ArrowLeft, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCartLocally, checkoutCart } from "/src/redux/cartSlice";

export default function CheckoutDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const [form, setForm] = useState({
    street: "",
    apartment: "",
    city: "",
    postcode: "",
    cardName: "",
    cardNumber: "",
  });

  const paymentMethodMap = {
    cod: "cash",
    card: "stripe",
    stripe: "stripe",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setOrderError(null);
    setIsPlacingOrder(true);

    try {
      const result = await dispatch(
        checkoutCart({
          delivery_address: `${form.street}, ${form.apartment}, ${form.city}, ${form.postcode}`,
          payment_method: paymentMethodMap[paymentMethod],
          transaction_id: paymentMethod !== "cod" ? form.cardNumber : undefined,
        })
      ).unwrap();

      setOrderId(result.id ?? result.order_id ?? "");
      setShowSuccessModal(true);
    } catch (err) {
      setOrderError("We couldn't place your order. Please check your details and try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const subTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const total = Math.max(0, subTotal);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 font-body lg:px-8 relative">
      {/* Back button */}
      <Link
        to="/cart"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-orange transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>

      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-4xl font-extrabold text-brand-dark">Checkout</h1>
        <p className="text-gray-500">Provide your details and choose a payment method to place your order.</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side: Delivery Details & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Delivery Address */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-brand-dark mb-4 pb-2 border-b border-gray-100">
              1. Delivery Address
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={handleInputChange}
                  required
                  placeholder="123 Regent Street"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Apartment / Suite / Unit
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={form.apartment}
                  onChange={handleInputChange}
                  placeholder="Apt 4B"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  required
                  placeholder="London"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Postcode
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={form.postcode}
                  onChange={handleInputChange}
                  required
                  placeholder="W1B 5AH"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-brand-dark mb-4 pb-2 border-b border-gray-100">
              2. Payment Details
            </h2>

            <div className="flex gap-2 mb-6">
              {[
                { id: "card", label: "Credit/Debit Card", icon: CreditCard },
                { id: "stripe", label: "Stripe", icon: CheckCircle },
                { id: "cod", label: "Cash on Delivery", icon: DollarSign },
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex-1 rounded-xl border p-3 flex items-center justify-center gap-2 text-xs font-bold transition-all ${paymentMethod === method.id
                      ? "border-brand-orange bg-orange-50/50 text-brand-orange"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="hidden sm:inline">{method.label}</span>
                  </button>
                );
              })}
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleInputChange}
                    required={paymentMethod === "card"}
                    placeholder="4111 2222 3333 4444"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "stripe" && (
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-center">
                <p className="text-sm text-blue-700 font-semibold">
                  You will be redirected to Stripe's official portal to authorize the transaction.
                </p>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="rounded-xl bg-green-50 border border-green-100 p-4 text-center">
                <p className="text-sm text-green-700 font-semibold">
                  Pay the delivery driver in cash or with card reader when your meal arrives!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Sticky Checkout Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-brand-dark border-b border-gray-100 pb-4 mb-4">
              Order Summary
            </h2>

            {/* List of items */}
            <div className="max-h-60 overflow-y-auto mb-6 divide-y divide-gray-100 pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-brand-orange bg-orange-50 px-2 py-0.5 rounded text-xs">
                      {item.quantity}x
                    </span>
                    <span className="font-medium text-brand-dark truncate max-w-[140px]">{item.name}</span>
                  </div>
                  <span className="font-bold text-brand-dark">£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {cartItems.length === 0 && (
                <p className="text-gray-500 text-sm py-4">No items in your cart.</p>
              )}
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span className="font-semibold text-brand-dark">£{subTotal.toFixed(2)}</span>
              </div>

              <hr className="border-gray-100" />

              <div className="flex justify-between text-lg font-bold text-brand-dark">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={cartItems.length === 0 || isPlacingOrder}
                className="mt-6 w-full rounded-xl bg-brand-orange py-4 text-center font-bold text-white shadow-lg hover:bg-brand-orange/95 hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
                <Send className="w-4 h-4" />
              </button>

              {orderError && (
                <p className="mt-3 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-semibold text-red-600 text-center">
                  {orderError}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl border border-gray-100 transform scale-100 transition-all duration-300">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600 mb-6">
              <CheckCircle className="h-12 w-12" />
            </div>

            <h3 className="text-2xl font-extrabold text-brand-dark mb-2">Order Confirmed!</h3>
            <p className="text-gray-500 text-sm mb-4">
              Your delicious meal is being prepared and will be with you shortly.
            </p>

            <div className="rounded-2xl bg-gray-50 p-4 text-left space-y-2 mb-6 border border-gray-100">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Order ID</span>
                <span className="font-bold text-brand-dark">{orderId}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Estimated Arrival</span>
                <span className="font-bold text-brand-orange">25 - 35 Minutes</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Delivery Address</span>
                <span className="font-bold text-brand-dark text-right truncate max-w-[180px]">
                  {form.street}, {form.city}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate("/")}
                className="w-full rounded-xl bg-brand-orange py-3.5 font-bold text-white shadow hover:bg-brand-orange/95 transition-all"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate("/orders/track")}
                className="w-full rounded-xl bg-gray-100 py-3.5 font-bold text-brand-dark hover:bg-gray-200 transition-all"
              >
                Track Live Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}