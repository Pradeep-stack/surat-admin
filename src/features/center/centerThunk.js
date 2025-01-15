import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCenters, deleteCenter, updateCenter } from "../../api/center";
import { setLoading, setError } from "./centerSlice";

export const getCentersAsync = createAsyncThunk(
  "center/getCenters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCenters();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCenterAsync = createAsyncThunk(
  "center/deleteCenter",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCenter(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCenterAsync = createAsyncThunk(
  "center/updateCenter",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateCenter(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
