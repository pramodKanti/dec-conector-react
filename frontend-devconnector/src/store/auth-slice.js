import { createSlice } from "@reduxjs/toolkit";

const authState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  username: null,
  currentUser: JSON.parse(localStorage.getItem("currentUser")),
};

authState.isAuthenticated = !!authState.token;

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    login(state, action) {
      state.token = action.payload;

      localStorage.setItem("token", action.payload);

      if (state.token) {
        state.isAuthenticated = true;
      }
    },
    logout(state) {
      localStorage.removeItem("token");

      localStorage.removeItem("currentUser");
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    resister(state, action) {
      state.username = action.payload;
    },
    profile(state, action) {
      state.currentUser = action.payload;
      console.log(state.currentUser);
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
