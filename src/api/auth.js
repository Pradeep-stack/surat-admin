// src/api/auth.js

import axios from "axios";
import { API_URL } from "../config";




export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem("userData", response.data.data.user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
