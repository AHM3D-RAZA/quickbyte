import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import useOrders from "/src/hooks/useOrders";
import OrderSidebar from "/src/components/orders/OrderSidebar";
import OrderStepper from "/src/components/orders/OrderStepper";
import OrderItems from "/src/components/orders/OrderItems";
import OrderSummary from "/src/components/orders/OrderSummary";
import DeliveryInfo from "/src/components/orders/DeliveryInfo";
import CancelOrderButton from "/src/components/orders/CancelOrder";
import StatusBadge from "/src/components/orders/StatusBadge";
import LoadingState from "/src/components/orders/LoadingState";
import EmptyOrders from "/src/components/orders/EmptyOrders";
import ErrorState from "/src/components/orders/ErrorState";

export default function OrderTrack() {
  const {
    orders,
    loading,
    error,
    refreshOrders,
    cancelOrder,
  } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (orders.length && !selectedOrder) {
      setSelectedOrder(orders[0]);
    }
  }, [orders]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={refreshOrders} />;
  if (!orders.length || !selectedOrder) return <EmptyOrders />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Track Your Orders
            </h1>
            <p className="text-gray-500 mt-1">
              View all your orders and track their progress in real time.
            </p>
          </div>

          <button
            onClick={refreshOrders}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div>
            <OrderSidebar
              orders={orders}
              selectedOrder={selectedOrder}
              onSelect={setSelectedOrder}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      #{selectedOrder.order_id}
                    </h2>
                    <StatusBadge status={selectedOrder.current_status} />
                  </div>

                  <p className="text-gray-600">
                    {selectedOrder.restaurant?.name}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Ordered on {new Date(selectedOrder.created_at).toLocaleString()}
                  </p>
                </div>

                <CancelOrderButton
                  order={selectedOrder}
                  onCancel={cancelOrder}
                />
              </div>

              <OrderStepper status={selectedOrder.current_status} />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5">
                Order Items
              </h3>
              <OrderItems items={selectedOrder.items} />
            </div>

            <OrderSummary order={selectedOrder} />

            <DeliveryInfo address={selectedOrder.delivery_address} />
          </div>
        </div>
      </div>
    </div>
  );
}