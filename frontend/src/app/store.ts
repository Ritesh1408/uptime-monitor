import { configureStore } from "@reduxjs/toolkit";
import monitorReducer from "../features/monitor/monitorSlice";

export const store = configureStore({
  reducer: {
    monitor: monitorReducer,
  },
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;