// src/api/user.js

import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:5000/api";

// Get user details by user ID
export const getUserDetails = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/auth/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
};
