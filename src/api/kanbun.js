import axios from "axios";
import { API_URL } from "../config";

export const getColumn = async () => {
  try {
    const response = await axios.get(`${API_URL}/column/get-column`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addColumn = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/column/add-column`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateColumnData = async (id, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/column/update-column/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteColumnData = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/column/delete-column/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTask = async () => {
  try {
    const response = await axios.get(`${API_URL}/tsk/get-task`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addTask = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/tsk/add-task`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateTaskData = async (id, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/tsk/update-task/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteTaskData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tsk/delete-task/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
