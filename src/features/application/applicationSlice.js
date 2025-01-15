import { createSlice } from "@reduxjs/toolkit";
import {
  getApplicationAsync,
  addApplicationAsync,
  updateApplicationAsync,
  addApplicationFormAsync,
  getApplicationByIdAsync,
} from "./applicationThunk";

const initialState = {
  applications: [],
  loading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplicationAsync.fulfilled, (state, action) => {
        state.applications = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getApplicationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getApplicationByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplicationByIdAsync.fulfilled, (state, action) => {
        state.applications = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getApplicationByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addApplicationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addApplicationAsync.fulfilled, (state, action) => {
        state.applications.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addApplicationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addApplicationFormAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addApplicationFormAsync.fulfilled, (state, action) => {
        state.applications.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addApplicationFormAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateApplicationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApplicationAsync.fulfilled, (state, action) => {
        const index = state.applications.findIndex(
          (app) => app._id === action.payload._id
        );
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateApplicationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setError } = applicationSlice.actions;

export default applicationSlice.reducer;
