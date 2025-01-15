import { createAsyncThunk } from "@reduxjs/toolkit";
import { addVideo, getVideos, deleteVideo } from "../../api/videos";
import { setVideos, setLoading, setError } from "./videoSlice";

export const addVideoAsync = createAsyncThunk(
  "videos/addVideos",
  async (videoData, { rejectWithValue }) => {
    try {
      const response = await addVideo(videoData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getVideoAsync = createAsyncThunk(
  "videos/getVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getVideos();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteVideoAsync = createAsyncThunk(
  "videos/deleteVideo",
  async (id, { rejectWithValue }) => {
    try {
      await deleteVideo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
