export const buildRestaurantFormData = (restaurant) => {
    const formData = new FormData();

    formData.append("name", restaurant.name);
    formData.append("description", restaurant.description);
    formData.append("address", restaurant.address);
    formData.append("is_active", restaurant.is_active);
    formData.append("is_featured", restaurant.is_featured);

    if (restaurant.image instanceof File) {
        formData.append("image", restaurant.image);
    }

    return formData;
};

export const buildMenuItemFormData = (menuItem) => {
    const formData = new FormData();

    formData.append("name", menuItem.name);
    formData.append("description", menuItem.description);
    formData.append("restaurant", menuItem.restaurant);
    formData.append("category", menuItem.category);
    formData.append("price", menuItem.price);

    if (menuItem.image instanceof File) {
        formData.append("image", menuItem.image);
    }

    return formData;
};

export const buildDealFormData = (deal) => {
    const formData = new FormData();

    formData.append("name", deal.name);
    formData.append("description", deal.description);
    formData.append("combo_price", deal.combo_price);
    formData.append("restaurant", deal.restaurant);
    formData.append("is_active", deal.is_active);
    formData.append("is_featured", deal.is_featured);

    if (deal.image instanceof File) {
        formData.append("image", deal.image);
    }

    return formData;
};