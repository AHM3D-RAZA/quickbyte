import api from "./axios";

export const getOrders = async () => {
    const response = await api.get("/order/orders/");
    return response.data.data;
};

export const cancelOrder = async (orderId) => {
  const res = await api.patch(`/order/order/${orderId}/cancel/`);
  return res.data.data;
};