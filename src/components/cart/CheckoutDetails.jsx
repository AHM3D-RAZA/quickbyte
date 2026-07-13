import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, CreditCard, DollarSign, Send, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CheckoutDetails() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryTime, setDeliveryTime] = useState("now");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Form states
  const [form, setForm] = useState({
    street: "123 Regent Street",
    apartment: "Apt 4B",
    city: "London",
    postcode: "W1B 5AH",
    phone: "+44 7700 900077",
    cardName: "John Doe",
    cardNumber: "4111 2222 3333 4444",
    cardExpiry: "12/28",
    cardCvv: "123",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("UserCart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Simulate placing order
    const randomOrderId = "QB-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomOrderId);
    setShowSuccessModal(true);

    // Clear cart on success
    localStorage.removeItem("UserCart");
  };

  const subTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const deliveryFee = subTotal > 0 ? 2.5 : 0;
  const discount = subTotal > 50 ? 10 : 0;
  const total = Math.max(0, subTotal + deliveryFee - discount);

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
        <p className="text-gray-500">Provide your delivery details and choose a payment method to place your order.</p>
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
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Mobile Number (for delivery rider updates)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Schedule */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-brand-dark mb-4 pb-2 border-b border-gray-100">
              2. Delivery Timing
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDeliveryTime("now")}
                className={`rounded-xl border p-4 text-center transition-all ${
                  deliveryTime === "now"
                    ? "border-brand-orange bg-orange-50/50 text-brand-orange font-bold"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <p className="text-sm">As soon as possible</p>
                <p className="text-xs text-gray-400 mt-1">20 - 35 mins</p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryTime("later")}
                className={`rounded-xl border p-4 text-center transition-all ${
                  deliveryTime === "later"
                    ? "border-brand-orange bg-orange-50/50 text-brand-orange font-bold"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <p className="text-sm">Schedule for later</p>
                <p className="text-xs text-gray-400 mt-1">Choose slot</p>
              </button>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-brand-dark mb-4 pb-2 border-b border-gray-100">
              3. Payment Details
            </h2>

            <div className="flex gap-2 mb-6">
              {[
                { id: "card", label: "Credit/Debit Card", icon: CreditCard },
                { id: "paypal", label: "PayPal", icon: CheckCircle },
                { id: "cod", label: "Cash on Delivery", icon: DollarSign },
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex-1 rounded-xl border p-3 flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      paymentMethod === method.id
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
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={form.cardName}
                    onChange={handleInputChange}
                    required={paymentMethod === "card"}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                  />
                </div>

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
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={form.cardExpiry}
                      onChange={handleInputChange}
                      required={paymentMethod === "card"}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      name="cardCvv"
                      maxLength="4"
                      value={form.cardCvv}
                      onChange={handleInputChange}
                      required={paymentMethod === "card"}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-center">
                <p className="text-sm text-blue-700 font-semibold">
                  You will be redirected to PayPal's official portal to authorize the transaction.
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
                    <span className="font-medium text-brand-dark truncate max-w-[140px]">{item.title}</span>
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

              <div className="flex justify-between text-gray-500 text-sm">
                <span>Delivery Fee</span>
                <span className="font-semibold text-brand-dark">£{deliveryFee.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 text-sm font-semibold">
                  <span>Discount</span>
                  <span>-£{discount.toFixed(2)}</span>
                </div>
              )}

              <hr className="border-gray-100" />

              <div className="flex justify-between text-lg font-bold text-brand-dark">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={cartItems.length === 0}
                className="mt-6 w-full rounded-xl bg-brand-orange py-4 text-center font-bold text-white shadow-lg hover:bg-brand-orange/95 hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order
                <Send className="w-4 h-4" />
              </button>
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
                onClick={() => navigate("/")}
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
