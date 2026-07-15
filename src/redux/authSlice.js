import { createSlice } from "@reduxjs/toolkit";

const getSavedUser = () => {
  try {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getSavedUser(),
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      const response = action.payload;
      if (response && response.token) {
        localStorage.setItem("access", response.token.access);
        localStorage.setItem("refresh", response.token.refresh);
        localStorage.setItem("user", JSON.stringify(response.data));
        state.user = response.data;
      } else {
        state.user = response;
      }
    },
    logout: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
