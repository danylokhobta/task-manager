import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./authSlice";
import userReducer from "./userSlice";
import tasksReducer from "./tasksSlice"

export const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
