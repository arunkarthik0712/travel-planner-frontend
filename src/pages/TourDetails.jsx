import React, { useState, useEffect } from "react";
import DestinationDetails from "../components/DestinationDetails";
import TravelPlanForm from "../components/TravelPlanForm";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Loader from "../components/Loader";
import { FaArrowCircleLeft } from "react-icons/fa";

const TourDetailsPage = () => {
  const [destination, setDestination] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axiosInstance.get(`/api/destinations/${id}`);
        setDestination(response.data);
      } catch (error) {
        console.error("Error fetching destination:", error);
      }
    };

    fetchDestination();
  }, [id]);

  if (!destination) {
    return (
      <div className="flex flex-col justify-center items-center text-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        {/* Left: Destination Details */}
        <FaArrowCircleLeft
          className="text-gray-600 cursor-pointer size-10 hover:text-green-500 transition"
          size={24}
          onClick={() => navigate(-1)}
        />
        <div className="md:w-1/2 p-4">
          <DestinationDetails destination={destination} />
        </div>

        {/* Right: Travel Plan Form */}
        <div className="md:w-1/2 p-4">
          <TravelPlanForm destination={destination} />
        </div>
      </div>
    </>
  );
};

export default TourDetailsPage;
