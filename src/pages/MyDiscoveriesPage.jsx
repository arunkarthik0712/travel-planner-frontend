import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const MyDiscoveriesPage = () => {
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyDiscoveries = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/discoveries/my-discoveries"
        );
        setDiscoveries(response.data);
      } catch (error) {
        toast.error("Failed to fetch your discoveries");
      } finally {
        setLoading(false);
      }
    };

    fetchMyDiscoveries();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/api/discoveries/discoveries/${id}`);
        setDiscoveries((prev) =>
          prev.filter((discovery) => discovery._id !== id)
        );
        toast.success("Discovery deleted");
      } catch (error) {
        toast.error("Failed to delete discovery");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Discoveries</h1>
      {discoveries.length === 0 ? (
        <p className="text-center text-gray-600">
          You have no discoveries yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {discoveries.map((discovery) => (
            <div
              key={discovery._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-green-500 transition-shadow duration-300"
            >
              <img
                src={discovery.images[0].url}
                alt={discovery.location}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{discovery.location}</h2>
              <p className="text-gray-700 mb-4">
                {discovery.description.substring(0, 100)}...
              </p>
              <div className="flex items-center justify-between mt-4">
                <Link
                  to={`/discoveries/${discovery._id}`}
                  className="mt-4 inline-block bg-teal-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-teal-600"
                >
                  View Details
                </Link>
                <Link
                  to={`/discoveries/edit/${discovery._id}`}
                  className="text-yellow-500 hover:text-yellow-600 transition-colors"
                >
                  <FaEdit />
                </Link>
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-600 transition-colors"
                  onClick={() => handleDelete(discovery._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDiscoveriesPage;
