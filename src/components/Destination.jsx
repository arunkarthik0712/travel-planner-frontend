import React from "react";
import { Link } from "react-router-dom";

const Destination = ({ destination }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">{destination.name}</h3>
      <p>{destination.formatted_address}</p>
      <Link
        to={`/destinations/${destination.place_id}`}
        className="text-blue-500"
      >
        View Details
      </Link>
    </div>
  );
};

export default Destination;
