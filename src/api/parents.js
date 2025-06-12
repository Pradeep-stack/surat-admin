import axios from "axios";
import { API_URL } from "../config";

export const getParents = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/expo/allusers`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteParent = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/expo/delete-user/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserByPhone = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/expo/get-user/${id}`
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

export const upadateStallNumber = async (phone, stallNumber, stallSize, company, mobile) => {
  try {
    const response = await axios.patch(
      `${API_URL}/expo/update-user/${phone}`,
      {
        stall_number: stallNumber,
        stall_size: stallSize,
        company: company,
        mobile: mobile,
        userType: "exhibitor",
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
      `${API_URL}/expo/import`,
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
