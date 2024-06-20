// slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  photoURL: "",
  email: "",
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    clearUser: (state) => {
      state.displayName = "";
      state.photoURL = "";
      state.email = "";
      state.uid = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
