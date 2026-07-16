import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight } from "lucide-react";
import Button from "/src/components/common/Button";

export default function CartDetails({ cartItems = [], onIncrease, onDecrease, onDelete }) {
  const navigate = useNavigate();

  const subTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const total = Math.max(0, subTotal);

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center font-body">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-brand-orange mb-6 animate-bounce">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-brand-dark mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Add some delicious items from our local partner restaurants and satisfy your cravings today!
        </p>
        <Link to="/">
          <Button className="px-8 py-3 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold transition-all transform hover:scale-105">
            Browse Restaurants
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 font-body lg:px-8">
      {/* Back to shop */}
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-orange transition-colors"
      >
        ← Continue Shopping
      </Link>

      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-4xl font-extrabold text-brand-dark">Review Your Order</h1>
        <p className="text-gray-500">Manage your items before checking out.</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side: Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
              <span className="font-bold text-brand-dark flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-orange" />
                Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-gray-50/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={`http://127.0.0.1:8000${item.image}` || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover border border-gray-100 shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-brand-dark hover:text-brand-orange transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {item.description || "Freshly made with choice ingredients."}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          Standard Portion
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-4 sm:pt-0">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-gray-100/80 rounded-full px-3 py-1.5 border border-gray-200">
                      <button
                        onClick={() => onDecrease(item)}
                        className="text-gray-600 hover:text-brand-orange transition-colors p-1"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-brand-dark w-6 text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onIncrease(item)}
                        className="text-gray-600 hover:text-brand-orange transition-colors p-1"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price and Delete */}
                    <div className="text-right flex items-center gap-4">
                      <div className="font-bold text-brand-dark text-lg min-w-[70px]">
                        £{(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Sticky Cart Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-brand-dark border-b border-gray-100 pb-4 mb-4">
              Cart Summary
            </h2>

            <div className="space-y-4">
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
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full rounded-xl bg-brand-orange py-4 text-center font-bold text-white shadow-lg hover:bg-brand-orange/95 hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
