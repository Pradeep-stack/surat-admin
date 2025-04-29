import axios from "axios";
import { API_URL } from "../config";

export const getParents = async () => {
  try {
    const response = await axios.get(
      `https://api.indusdigicart.com/api/v1/expo/allusers`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteParent = async (id) => {
  try {
    const response = await axios.delete(
      `https://api.indusdigicart.com/api/v1/expo/delete-user/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserByPhone = async (id) => {
  try {
    const response = await axios.get(
      `https://api.indusdigicart.com/api/v1/expo/get-user/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateParent = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/update-user/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const upadateStallNumber = async (phone, stallNumber) => {
  try {
    const response = await axios.put(
      `https://api.indusdigicart.com/api/v1/expo/update-user/${phone}`,
      {
        stall_number: stallNumber,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const importUsers = async (data) => {
  try {
    const response = await axios.post(
      `https://api.indusdigicart.com/api/v1/expo/import`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
