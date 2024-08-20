import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";
import Loader from "../components/Loader";

const DiscoveriesPage = () => {
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscoveries = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/discoveries/discoveries"
        );
        setDiscoveries(response.data);
      } catch (error) {
        console.error("Failed to fetch discoveries", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscoveries();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Discoveries</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {discoveries.map((discovery) => (
            <div
              key={discovery._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden  hover:shadow-green-500 transform transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={discovery.images[0]?.url || "/default-image.jpg"}
                alt={discovery.location}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">
                  {discovery.location}
                </h2>
                <p className="text-gray-700 mb-4">{discovery.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Uploaded by: {discovery.userId.username}
                </p>
                <div className="flex justify-between items-center text-gray-600">
                  <Link
                    to={`/discoveries/${discovery._id}`}
                    className="mt-4 inline-block bg-teal-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-teal-600"
                  >
                    View Details
                  </Link>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaThumbsUp className="text-gray-500 mr-1" />
                      <span>{discovery.likes.length}</span>
                    </div>
                    <div className="flex items-center">
                      <FaComment className="text-gray-500 mr-1" />
                      <span>{discovery.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DiscoveriesPage;
