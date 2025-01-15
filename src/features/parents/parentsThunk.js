import { createAsyncThunk } from "@reduxjs/toolkit";
import { getParents, deleteParent, updateParent } from "../../api/parents";
import { setLoading, setError } from "./parentsSlice";

export const getParentsAsync = createAsyncThunk(
  "parent/getParents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getParents();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteParentAsync = createAsyncThunk(
  "parent/deleteParent",
  async (id, { rejectWithValue }) => {
    try {
      await deleteParent(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateParentAsync = createAsyncThunk(
  "parent/updateParent",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateParent(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
