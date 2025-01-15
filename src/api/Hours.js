import axios from "axios";
import { API_URL } from "../config";

export const addHours = async (hoursData) => {
  try {
    const response = await axios.put(`${API_URL}/object`, hoursData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getHours = async () => {
  try {
    const response = await axios.get(`${API_URL}/object`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
