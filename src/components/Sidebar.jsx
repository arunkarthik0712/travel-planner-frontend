import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaImage,
  FaBook,
  FaCalendar,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Top bar for mobile view */}
      <div className="md:hidden flex items-center p-4 bg-teal-600 text-gray-300  shadow-md">
        <FaBars
          onClick={toggleSidebar}
          className="text-2xl cursor-pointer mr-2"
        />
        <Link to="/">
          <h1 className="text-2xl font-bold cursor-default">Travel Planner</h1>
        </Link>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0  h-lvh bg-teal-600 text-sm text-gray-300  w-64 p-6 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64 shadow-lg md:shadow-none`}
      >
        {/* Sidebar Header */}
        {/* Mobile View Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-teal-600 text-gray-300  mb-3 -mt-4">
          <Link to="/" className="text-lg font-bold">
            Travel Planner
          </Link>
          <FaTimes onClick={toggleSidebar} className="text-xl cursor-pointer" />
        </div>

        {/* Desktop View Title */}
        <Link to="/" className="hidden md:block text-lg font-bold mb-5">
          Travel Planner
        </Link>

        {/* Sidebar Links */}
        <ul className="space-y-4">
          <li>
            <Link
              to="/profile/"
              className="flex items-center text-gray-300  hover:text-white transition-colors duration-200"
              onClick={toggleSidebar}
            >
              <FaUser className="mr-3" /> Details
            </Link>
          </li>
          <li>
            <Link
              to="/profile/my-discoveries"
              className="flex items-center text-gray-300  hover:text-white transition-colors duration-200"
              onClick={toggleSidebar}
            >
              <FaImage className="mr-3" /> My Discoveries
            </Link>
          </li>
          <li>
            <Link
              to="/profile/my-travels"
              className="flex items-center text-gray-300  hover:text-white transition-colors duration-200"
              onClick={toggleSidebar}
            >
              <FaCalendar className="mr-3" /> Travel Plans
            </Link>
          </li>
          <li>
            <Link
              to="/profile/bookings"
              className="flex items-center text-gray-300  hover:text-white transition-colors duration-200"
              onClick={toggleSidebar}
            >
              <FaBook className="mr-3" /> My Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/profile/discoveries/create"
              className="flex items-center text-gray-300  hover:text-white transition-colors duration-200"
              onClick={toggleSidebar}
            >
              <FaImage className="mr-3" /> Upload Memories
            </Link>
          </li>
        </ul>

        {/* User Info and Logout at the bottom */}
        <div className="mt-56">
          {/* Adjusted margin-top for better spacing */}
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center text-gray-300  hover:text-white transition-colors duration-200"
                onClick={toggleSidebar}
              >
                <FaHome className="mr-3" /> Back to home
              </Link>
            </li>
          </ul>
          <hr className="border-gray-700 my-4" />
          <div className="text-gray-300 mb-4">
            <p>{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center text-gray-300  bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
