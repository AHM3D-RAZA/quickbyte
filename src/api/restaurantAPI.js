import api from "./axios";

export const getRestaurants = async () => {
    const response = await api.get("/restaurants/all-restaurant");
    return response.data.data;
};

// export const getRestaurant = async (id) => {
//     const response = await api.get(`/restaurants/${id}/`);
//     return response.data;
// };

