import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";

const AccommodationCard = ({ accommodation }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookingClick = () => {
    if (!user) {
      toast.info("Please log in to book this accommodation");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-green-500 transform transition-transform duration-300 hover:-translate-y-1">
      <img
        src={accommodation.imageUrl}
        alt={accommodation.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-2xl font-semibold">{accommodation.name}</h3>
        <p className="text-gray-700 flex items-center mt-1">
          <FaMapMarkerAlt className="mr-1 text-red-500" />
          {accommodation.location}
        </p>
        <p className="text-gray-600 mt-2">{accommodation.details}</p>
        <p className="font-bold text-lg mt-2">
          Price: ${accommodation.pricePerBed}
        </p>
        <button
          onClick={handleBookingClick}
          className="bg-teal-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-teal-600 transition-colors"
        >
          Book Now
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        accommodation={accommodation}
        user={user}
      />
    </div>
  );
};

export default AccommodationCard;
