import { createSlice } from "@reduxjs/toolkit";
import {
  getParentsAsync,
  deleteParentAsync,
  updateParentAsync,
} from "./parentsThunk";

const initialState = {
  parents: [],
  loading: false,
  error: null,
};

const parentsSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getParentsAsync.fulfilled, (state, action) => {
        state.parents = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getParentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteParentAsync.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.parents = state.parents.filter(
          (parent) => parent._id !== deletedId
        );
      })
      .addCase(updateParentAsync.fulfilled, (state, action) => {
        const updatedParent = action.payload;
        const index = state.parents.findIndex(
          (parent) => parent._id === updatedParent._id
        );
        if (index !== -1) {
          state.parents[index] = updatedParent;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateParentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setError, deleteParent } = parentsSlice.actions;

export default parentsSlice.reducer;
