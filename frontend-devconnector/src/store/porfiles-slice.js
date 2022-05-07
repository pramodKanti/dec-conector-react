import { createSlice } from "@reduxjs/toolkit";

const profilesSlice = createSlice({
  name: "profile",
  initialState: { allUser: null },
  reducers: {
    profiles(state, action) {
      state.allUser = action.payload;
      console.log(state.allUser);
    },
  },
});

export const profilesActions = profilesSlice.actions;

export default profilesSlice;
