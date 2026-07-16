import { MapPin } from "lucide-react";

export default function DeliveryInfo({ address }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-orange-600" />
        <h3 className="font-bold text-gray-900">Delivery Address</h3>
      </div>

      <p className="text-gray-700 leading-relaxed">
        {address || "No delivery address provided."}
      </p>
    </div>
  );
}