import StatusBadge from "./StatusBadge";

export default function OrderSidebar({
  orders,
  selectedOrder,
  onSelect,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
      <h2 className="text-lg font-bold text-gray-900">Your Orders</h2>

      {orders.map((order) => (
        <button
          key={order.order_id}
          onClick={() => onSelect(order)}
          className={`w-full text-left p-4 rounded-xl border transition-all ${
            selectedOrder?.order_id === order.order_id
              ? "border-orange-500 bg-orange-50"
              : "border-gray-100 hover:border-orange-200 hover:bg-orange-50/50"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-bold text-gray-900">
                #{order.order_id}
              </p>
              <p className="text-sm text-gray-500">
                {order.restaurant?.name || "Restaurant"}
              </p>
            </div>
            <StatusBadge status={order.current_status} />
          </div>

          <div className="flex justify-between text-sm">
            <span className="font-semibold text-orange-600">
              £{Number(order.total_price || 0).toFixed(2)}
            </span>
            <span className="text-gray-400">
              {new Date(order.created_at).toLocaleDateString()}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}