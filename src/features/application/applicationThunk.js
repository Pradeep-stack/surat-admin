import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getApplication,
  addApplication,
  updateApplication,
  addApplicationForm,
  getApplicationById,
} from "../../api/application";
import { setLoading, setError } from "./applicationSlice";

export const getApplicationAsync = createAsyncThunk(
  "application/getApplication",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getApplication(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getApplicationByIdAsync = createAsyncThunk(
  "application/getApplicationById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getApplicationById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addApplicationAsync = createAsyncThunk(
  "application/addApplication",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addApplication(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateApplicationAsync = createAsyncThunk(
  "application/updateApplication",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await updateApplication(userId, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addApplicationFormAsync = createAsyncThunk(
  "application/addApplicationForm",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addApplicationForm(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
