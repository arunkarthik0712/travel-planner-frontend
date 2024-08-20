import React from "react";
import Loader from "./Loader";
import { FaMapMarkerAlt } from "react-icons/fa";

const DestinationDetails = ({ destination }) => {
  if (!destination) {
    return (
      <div className="flex flex-col justify-center items-center h-full text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-md shadow-green-500">
      <h2 className="text-4xl font-bold mb-6 text-center">
        {destination.name}
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start mb-8 bg-gray-100 p-4 rounded-lg shadow-md ">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full md:w-1/2 h-auto object-cover rounded shadow-lg mb-6 md:mb-0 md:mr-8"
        />
        <div className="flex-1">
          <p className="flex items-center text-lg mb-4">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            {destination.location}
          </p>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md shadow-green-500">
            <h3 className="text-xl font-semibold mb-2">Price:</h3>
            <p className="text-2xl font-bold text-gray-900">
              ${destination.price}
            </p>
          </div>
        </div>
      </div>
      <p className="text-lg text-gray-700 mb-4">{destination.description}</p>
    </div>
  );
};

export default DestinationDetails;
