// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import videoReducer from "./slices/videoSlice";
import darkModeReducer from "./slices/darkModeSlice";
const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    user: userReducer,
    category: categoryReducer,
    videos: videoReducer,
  },
});

export default store;
