import { useEffect, useState } from "react";
import { getOrders, cancelOrder as cancelOrderAPI } from "/src/api/ordersAPI";

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    await cancelOrderAPI(orderId); // create this endpoint later
    await fetchOrders();
  };

  return {
    orders,
    loading,
    error,
    refreshOrders: fetchOrders,
    cancelOrder,
  };
}