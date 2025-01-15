import axios from "axios";
import { API_URL } from "../config";

export const getApplication = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/get-forms-user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addApplication = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-form`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateApplication = async (id, formData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/application-update/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getApplicationForCenter = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/get-applications-center/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getApplicationForAdmin = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-applications-admin`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getApplicationForUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get-application-user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addApplicationForm = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/submit-application`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getApplicationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get-application-id/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const uploadImage = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signature`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteApplication = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-application/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};