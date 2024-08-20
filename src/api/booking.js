// src/api/booking.js

import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:5000/api";

// Get all bookings for a user
export const getBookings = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch bookings");
  }
};

// Cancel a specific booking by its ID
export const cancelBooking = async (bookingId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/bookings/${bookingId}/cancel`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to cancel booking");
  }
};
