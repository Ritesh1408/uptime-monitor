import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../services/api";
import type { Monitor } from "./monitorTypes";

export const fetchMonitors =
  createAsyncThunk(
    "monitor/fetchMonitors",
    async () => {
      const response =
        await api.get("/monitors");

      return response.data.data as Monitor[];
    }
  );

export const createMonitor =
  createAsyncThunk(
    "monitor/createMonitor",
    async (
      url: string,
      { rejectWithValue }
    ) => {
      try {
        await api.post(
          "/monitors",
          { url }
        );

        return url;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data
            ?.message ??
            "Failed to create monitor"
        );
      }
    }
  );

export const deleteMonitor =
  createAsyncThunk(
    "monitor/deleteMonitor",
    async (
      id: string,
      { rejectWithValue }
    ) => {
      try {
        await api.delete(
          `/monitors/${id}`
        );

        return id;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data
            ?.message ??
            "Failed to delete monitor"
        );
      }
    }
  );