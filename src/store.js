// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import videoReducer from "./slices/videoSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    videos: videoReducer,
  },
});

export default store;
