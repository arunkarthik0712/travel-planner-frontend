import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserDetails } from "../api/user";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?._id) {
        try {
          const data = await getUserDetails(user._id);
          setUserDetails(data);
        } catch (error) {
          toast.error("Failed to fetch user details");
        }
      }
    };

    fetchUserDetails();
  }, [user?._id]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {userDetails ? (
        <>
          <h1 className="text-3xl font-bold mb-6">User Profile</h1>
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-2xl text-gray-800 font-semibold mb-4">
              Profile Details
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Name:</span>{" "}
              {userDetails.username}
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-semibold">Email:</span> {userDetails.email}
            </p>
            <Link
              to="/forgot-password"
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
            >
              Change Password
            </Link>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetails;
