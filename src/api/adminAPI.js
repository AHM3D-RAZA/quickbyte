import api from "./axios";
import { buildMenuItemFormData, buildRestaurantFormData, buildDealFormData } from "../utils/createFormData";

// Analytics
export const getAnalyticsOverview = async () => {
    const response = await api.get("/order/admin/analytics/overview/");
    return response.data.data;
};

export const getOrderStatusAnalytics = async () => {
    const response = await api.get("/order/admin/analytics/orders-by-status/");
    return response.data.data;
};

export const getRevenueByRestaurant = async () => {
    const response = await api.get("/order/admin/analytics/revenue-by-restaurant/");
    return response.data.data;
};

export const getRevenueOverTime = async () => {
    const response = await api.get("/order/admin/analytics/revenue-over-time/");
    return response.data.data;
};

export const getPopularDeals = async () => {
    const response = await api.get("/order/admin/analytics/popular-deals/");
    return response.data.data;
};

export const getPopularItems = async () => {
    const response = await api.get("/order/admin/analytics/popular-items/");
    return response.data.data;
};


//Orders
export const getAllOrders = async () => {
    const response = await api.get("/order/admin/orders");
    return response.data.data;
};

export const updateOrderStatus = async (orderId, status) => {
    const response = await api.patch(
        `/order/admin/orders/${orderId}/status/`,
        { status }
    );
    return response.data.data;
};


//Categories
export const getCategories = async () => {
    const response = await api.get("/restaurants/all-category");
    return response.data.data;
};


export const createCategory = async (categoryData) => {
    const response = await api.post("/restaurants/create-category/", categoryData);
    return response.data.data;
};

export const deleteCategory = async (categoryId) => {
    const response = await api.delete(`/restaurants/delete-category/${categoryId}/`);
    return response.data.data;
};

export const editCategory = async (categoryId, categoryData) => {
    const response = await api.patch(`/restaurants/update-category/${categoryId}/`, categoryData);
    return response.data.data;
};

//Deals
export const createDealItem = async (dealItemData) => {
    const response = await api.post("/restaurants/create-deal-item/", dealItemData);
    return response.data.data;
};

export const createDeal = async (dealData) => {
    const formData = buildDealFormData(dealData);
    const response = await api.post("/restaurants/create-deal/", formData);
    return response.data.data;
};

export const deleteDealItem = async (itemId) => {
    const response = await api.delete(`/restaurants/delete-deal-item/${itemId}/`);
    return response.data.data;
};

export const deleteDeal = async (dealId) => {
    const response = await api.delete(`/restaurants/delete-deal/${dealId}/`);
    return response.data.data;
};

export const editDealItem = async (itemId, itemData) => {
    const response = await api.patch(`/restaurants/update-deal-item/${itemId}/`, itemData);
    return response.data.data;
};

export const editDeal = async (dealId, dealData) => {
    const formData = buildDealFormData(dealData);
    const response = await api.patch(`/restaurants/update-deal/${dealId}/`, formData);
    return response.data.data;
};

//MenuItems
export const createMenuItem = async (menuItemData) => {
    const formData = buildMenuItemFormData(menuItemData);
    const response = await api.post("/restaurants/create-menuitem/", formData);
    return response.data.data;
};

export const deleteMenuItem = async (menuId) => {
    const response = await api.delete(`/restaurants/delete-menuitem/${menuId}/`);
    return response.data.data;
};

export const editMenuItem = async (menuId, menuData) => {
    const formData = buildMenuItemFormData(menuData);
    const response = await api.patch(`/restaurants/update-menuitem/${menuId}/`, formData);
    return response.data.data;
};

//Restuarants
export const getRestaurants = async () => {
    const response = await api.get("/restaurants/all-restaurant");
    return response.data.data;
}

export const createRestaurant = async (restaurantData) => {
    const formData = buildRestaurantFormData(restaurantData);
    const response = await api.post(
        "/restaurants/create-restaurant/", formData);
    return response.data.data;
};

export const deleteRestaurant = async (restaurantId) => {
    const response = await api.delete(
        `/restaurants/delete-restaurant/${restaurantId}/`);
    return response.data.data;
};

export const editRestaurant = async (restaurantId, restaurantData) => {
    const formData = buildRestaurantFormData(restaurantData);
    const response = await api.patch(`/restaurants/update-restaurant/${restaurantId}/`, formData);
    return response.data.data;
};