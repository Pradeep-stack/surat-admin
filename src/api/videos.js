import axios from "axios";
import { API_URL } from "../config";

export const addVideo = async (videoData) => {
  try {
    const response = await axios.post(`${API_URL}/add-video`, videoData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getVideos = async () => {
  try {
    const response = await axios.get(`https://getmodules-cxvlmk3efq-uc.a.run.app`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteVideo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-video/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const uploadImage = async ( image) => {
  try {
    const response = await axios.post(`https://indus-server.onrender.com/upload`, image);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`https://getcategories-cxvlmk3efq-uc.a.run.app`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const addCategory = async (videoData) => {
  try {
    const response = await axios.post(`https://createcategory-cxvlmk3efq-uc.a.run.app`, videoData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`https://getmodules-cxvlmk3efq-uc.a.run.app`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const addProducts = async (videoData) => {
  try {
    const response = await axios.post(`https://createmodule-cxvlmk3efq-uc.a.run.app`, videoData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};