import { createSlice } from "@reduxjs/toolkit";

import {
  fetchMonitors, deleteMonitor,
} from "./monitorThunks";

import type {
  MonitorState,
} from "./monitorTypes";

const initialState: MonitorState = {
  monitors: [],
  loading: false,
  error: null,
};

const monitorSlice = createSlice({
  name: "monitor",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMonitors.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchMonitors.fulfilled,
        (state, action) => {
          state.loading = false;
          state.monitors = action.payload;
        }
      )

      .addCase(
        fetchMonitors.rejected,
        (state) => {
          state.loading = false;
          state.error =
            "Failed to fetch monitors";
        }
      )

      .addCase(
        deleteMonitor.fulfilled,
        (state, action) => {
          state.monitors =
            state.monitors.filter(
              (monitor) =>
                monitor.id !==
                action.payload
            );
        }
      )

      .addCase(
        deleteMonitor.rejected,
        (state) => {
          state.error =
            "Failed to delete monitor";
        }
      );
  },
});

export default monitorSlice.reducer;
