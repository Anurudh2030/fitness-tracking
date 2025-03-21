import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Adjust path as needed

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your reducers here
  },
});

export default store;
