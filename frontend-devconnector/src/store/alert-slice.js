import { createSlice } from "@reduxjs/toolkit";

const alertState = { alertData: [] };

const alertSlice = createSlice({
  name: "alert",
  initialState: alertState,
  reducers: {
    alert(state, action) {
      state.alertData = [action.payload];
      console.log(state.alertData);
    },
    removeAlert(state) {
      state.alertData = null;
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
