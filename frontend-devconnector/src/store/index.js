import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alert-slice";
import authSlice from "./auth-slice";
import profilesSlice from "./porfiles-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    alert: alertSlice.reducer,
    profiles: profilesSlice.reducer,
  },
});

export default store;
