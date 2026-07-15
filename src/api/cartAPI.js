import api from "./axios";

export const getCart = async () => {
    const response = await api.get("/order/cart/");
    return response.data.data;
};

export const addCartItem = async (menuItemId, dealId) => {
    const payload = menuItemId ? { menu_item_id: menuItemId } : { deal_id: dealId };
    const response = await api.post("/order/cart/add/", payload);
    return response.data.data;
};

export const updateCartItem = async (id, quantity) => {
    const response = await api.patch(`/order/cart/update-item/${id}/`, { quantity });
    return response.data.data;
};

export const removeCartItem = async (id) => {
    const response = await api.delete(`/order/cart/delete-item/${id}/`);
    return response.data.data;
};

export const orderCheckout = async ({ delivery_address, payment_method, transaction_id }) => {
    const response = await api.post("/order/checkout/", {
        delivery_address,
        payment_method,
        transaction_id,
    });
    return response.data.data;
};