import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, getUserData } from "../../api/auth";
import { setUser, setLoading, setError, logout } from "./userSlice";

export const registerUserAsync = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await registerUser(userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await loginUser(credentials);

      localStorage.setItem("userData", JSON.stringify(response.data.user));
      dispatch(setUser(response.data.user));
      return response.data.user;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserDataAsync = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const userData = await getUserData();
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
