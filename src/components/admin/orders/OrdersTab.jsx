import { X } from "lucide-react";
import StatusPill from "../shared/StatusPill";

export default function OrderStatusActions({ order, onUpdateStatus }) {
  const { order_id, current_status } = order;

  return (
    <div className="inline-flex gap-1.5 justify-end">
      {current_status === "pending" && (
        <button
          onClick={() => onUpdateStatus(order_id, "accepted")}
          className="px-2.5 py-1 text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange/90 rounded-lg transition-colors"
        >
          Accept
        </button>
      )}
      {current_status === "accepted" && (
        <button
          onClick={() => onUpdateStatus(order_id, "preparing")}
          className="px-2.5 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Prepare
        </button>
      )}
      {current_status === "preparing" && (
        <button
          onClick={() => onUpdateStatus(order_id, "out_for_delivery")}
          className="px-2.5 py-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          Send Out
        </button>
      )}
      {current_status === "out_for_delivery" && (
        <button
          onClick={() => onUpdateStatus(order_id, "delivered")}
          className="px-2.5 py-1 text-xs font-bold text-white bg-brand-green hover:bg-brand-green/95 rounded-lg transition-colors"
        >
          Deliver
        </button>
      )}
      {!["delivered", "cancelled"].includes(current_status) && (
        <button
          onClick={() => onUpdateStatus(order_id, "cancelled")}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
          title="Cancel Order"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      {["delivered", "cancelled"].includes(current_status) && (
        <span className="text-xs text-gray-400 font-medium px-2">—</span>
      )}
    </div>
  );
}

export function OrdersTable({ orders, onUpdateStatus }) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200/80 flex justify-between items-center">
        <h3 className="font-bold text-brand-dark">Active System Orders</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 font-bold text-xs uppercase tracking-wider">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Restaurant</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.order_id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-brand-dark">{order.order_id}</td>
                <td className="px-6 py-4 font-semibold">{order.customer}</td>
                <td className="px-6 py-4 text-gray-600">{order.restaurant}</td>
                <td className="px-6 py-4 text-gray-500 text-xs truncate max-w-xs">{order.items}</td>
                <td className="px-6 py-4 font-bold text-brand-dark">
                  £{order.total_price.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <StatusPill status={order.current_status} variant="order" />
                </td>
                <td className="px-6 py-4 text-right">
                  <OrderStatusActions order={order} onUpdateStatus={onUpdateStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function OrdersTab({ orders, onUpdateStatus }) {
  return <OrdersTable orders={orders} onUpdateStatus={onUpdateStatus} />;
}
