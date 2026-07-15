import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, addCartItem, updateCartItem, removeCartItem, orderCheckout } from "/src/api/cartAPI";

// Each thunk wraps one API call. Redux Toolkit auto-generates
// pending/fulfilled/rejected actions for each of these.

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  return await getCart();
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ menuItemId, dealId }) => {
    return await addCartItem(menuItemId, dealId);
  }
);

// update and delete don't return a full Cart from the backend,
// so we just re-fetch the cart afterward to stay in sync.
export const changeItemQuantity = createAsyncThunk(
  "cart/changeItemQuantity",
  async ({ id, quantity }) => {
    await updateCartItem(id, quantity);
    return await getCart();
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (id) => {
    await removeCartItem(id);
    return await getCart();
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (checkoutData) => {
    return await orderCheckout(checkoutData);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total_price: "0",
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // kept for things like logging out, where we want to
    // instantly wipe the cart locally without an API call
    clearCartLocally: (state) => {
      state.items = [];
      state.total_price = "0";
    },
  },
  extraReducers: (builder) => {
    // small helper so we don't repeat this four times
    const handleCartResponse = (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.items;
      state.total_price = action.payload.total_price;
    };
    const handlePending = (state) => {
      state.status = "loading";
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    };

    builder
      .addCase(fetchCart.pending, handlePending)
      .addCase(fetchCart.fulfilled, handleCartResponse)
      .addCase(fetchCart.rejected, handleRejected)

      .addCase(addItemToCart.pending, handlePending)
      .addCase(addItemToCart.fulfilled, handleCartResponse)
      .addCase(addItemToCart.rejected, handleRejected)

      .addCase(changeItemQuantity.pending, handlePending)
      .addCase(changeItemQuantity.fulfilled, handleCartResponse)
      .addCase(changeItemQuantity.rejected, handleRejected)

      .addCase(removeItemFromCart.pending, handlePending)
      .addCase(removeItemFromCart.fulfilled, handleCartResponse)
      .addCase(removeItemFromCart.rejected, handleRejected)

      .addCase(checkoutCart.fulfilled, (state) => {
        // order placed successfully — server-side cart is now empty
        state.items = [];
        state.total_price = "0";
      });
  },
});

export const { clearCartLocally } = cartSlice.actions;
export default cartSlice.reducer;