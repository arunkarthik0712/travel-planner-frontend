import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const DestinationCard = ({ destination }) => {
  const truncatedDescription =
    destination.description.length > 100
      ? destination.description.substring(0, 100) + "..."
      : destination.description;

  return (
    <div className="destination-card border rounded-lg shadow-lg hover:shadow-green-500 overflow-hidden transform transition-transform duration-300 hover:-translate-y-1">
      <img
        src={destination.imageUrl}
        alt={destination.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-2xl font-semibold mb-2">{destination.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          <span>{destination.location}</span>
        </div>
        <p className="text-gray-700 mb-4">{truncatedDescription}</p>
        <p className="text-lg font-bold text-gray-800">${destination.price}</p>
        <Link
          to={`/tourdetails/${destination._id}`}
          className="mt-4 inline-block bg-teal-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-teal-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
