'use client';
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from './globalSlice';
import authReducer from './authSlice';
import userReducer from "./userSlice";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    user: userReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
