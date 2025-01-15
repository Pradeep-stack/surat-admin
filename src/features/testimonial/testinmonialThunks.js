import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTestimonial,
  getTestimonial,
  deleteTestimonial,
} from "../../api/testimonial";
import { setTestimonials, setLoading, setError } from "./testimonialSlice";

export const addTestimonialAsync = createAsyncThunk(
  "testimonial/addTestimonial",
  async (testimonialData, { rejectWithValue }) => {
    try {
      const response = await addTestimonial(testimonialData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTestimonialsAsync = createAsyncThunk(
  "testimonial/getTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTestimonial();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTestimonialAsync = createAsyncThunk(
  "testimonial/deleteTestimonial",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTestimonial(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
