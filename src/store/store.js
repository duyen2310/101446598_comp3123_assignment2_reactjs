import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Ensure you have this slice created for managing authentication

const store = configureStore({
  reducer: {
    auth: authReducer, // Add other reducers if necessary
  },
});

export default store;
