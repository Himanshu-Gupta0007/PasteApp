// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { Pasteslice } from '../redux/Pasteslice';

export const store = configureStore({
  reducer: {
    paste: Pasteslice.reducer, // ✅ naam "paste" rakh le jo tu selector me use kar raha hai
  },
});
