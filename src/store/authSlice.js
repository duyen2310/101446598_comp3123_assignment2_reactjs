import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage || null, // Load token from localStorage
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save token to localStorage
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token'); // Clear token from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
