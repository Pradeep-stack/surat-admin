import { createSlice } from "@reduxjs/toolkit";
import { getVideoAsync, deleteVideoAsync } from "./videoThunk";

const initialState = {
  videos: [],
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
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
      .addCase(getVideoAsync.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getVideoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVideoAsync.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.videos = state.videos.filter((video) => video._id !== deletedId);
      });
  },
});

export const { setVideos, setLoading, setError } = videoSlice.actions;

export default videoSlice.reducer;
