import { createSlice } from "@reduxjs/toolkit";
import {
  getTestimonialsAsync,
  deleteTestimonialAsync,
} from "./testinmonialThunks";

const initialState = {
  testimonials: [],
  loading: false,
  error: null,
};

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
    setTestimonials: (state, action) => {
      state.testimonials = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestimonialsAsync.fulfilled, (state, action) => {
        state.testimonials = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getTestimonialsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestimonialsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTestimonialAsync.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.testimonials = state.testimonials.filter(
          (testimonial) => testimonial._id !== deletedId
        );
      });
  },
});

export const { setTestimonials, setLoading, setError } =
  testimonialSlice.actions;

export default testimonialSlice.reducer;
