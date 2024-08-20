// src/api/accommodation.js

import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:5000/api";

// Fetch accommodations based on a search query

export const fetchAccommodations = async (
  searchQuery = "",
  accommodationType = ""
) => {
  try {
    const response = await axiosInstance.get("/api/accommodations", {
      params: { searchQuery, accommodationType },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch accommodations");
  }
};

// Fetch details of a specific accommodation
export const fetchAccommodationDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/accommodations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch accommodation details");
  }
};
