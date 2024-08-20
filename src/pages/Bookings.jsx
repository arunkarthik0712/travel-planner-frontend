import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getBookings, cancelBooking } from "../api/booking";
import { toast } from "react-toastify";
import {
  FaBed,
  FaCalendarAlt,
  FaUser,
  FaDollarSign,
  FaTrash,
} from "react-icons/fa";

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings(user._id);
        setBookings(data);
      } catch (error) {
        toast.error("Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel the booking?"
    );
    if (confirmDelete) {
      try {
        await cancelBooking(bookingId);
        toast.success("Booking canceled successfully");
        setBookings(bookings.filter((b) => b._id !== bookingId));
      } catch (error) {
        toast.error("Failed to cancel booking");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="bg-white shadow rounded-lg p-6">
        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings found.</p>
        ) : (
          <ul className="space-y-6">
            {bookings.map((booking) => (
              <li
                key={booking._id}
                className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:space-x-4 bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={booking.accommodationId?.imageUrl}
                  alt={booking.accommodationId?.name}
                  className="w-full h-48 object-cover rounded-lg mb-4 md:mb-0 md:w-48 md:h-32"
                />
                <div className="flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2 flex items-center space-x-2">
                    <FaBed className="text-gray-600" />
                    <span>{booking.accommodationId?.name}</span>
                  </h2>
                  <p className="text-gray-600 mb-1 flex items-center space-x-2">
                    <FaCalendarAlt />
                    <span>
                      Check-in:{" "}
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-1 flex items-center space-x-2">
                    <FaCalendarAlt />
                    <span>
                      Check-out:{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-1 flex items-center space-x-2">
                    <FaUser />
                    <span>Number of Members: {booking.numberOfMembers}</span>
                  </p>
                  <p className="text-gray-600 mb-2 flex items-center space-x-2">
                    <FaDollarSign />
                    <span>Total Price: ${booking.totalPrice}</span>
                  </p>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-red-600 transition-colors duration-300"
                  >
                    <FaTrash />
                    <span>Cancel Booking</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Bookings;
