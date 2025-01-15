import axios from "axios";
import { API_URL } from "../config";

export const addTestimonial = async (testimonialData) => {
  try {
    const response = await axios.post(
      `${API_URL}/create-testimonial`,
      testimonialData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getTestimonial = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAll-testimonials`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteTestimonial = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-testimonial/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
