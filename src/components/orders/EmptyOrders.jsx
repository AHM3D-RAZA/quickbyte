import { ShoppingBag } from "lucide-react";

export default function EmptyOrders() {
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-6">
        <ShoppingBag className="w-10 h-10 text-orange-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        No orders yet
      </h2>

      <p className="text-gray-500">
        Start ordering delicious food from your favorite restaurants.
      </p>
    </div>
  );
}