import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaHotel,
  FaMap,
  FaUser,
  FaBars,
  FaTimes,
  FaImages,
  FaSignOutAlt,
  FaSign,
  FaSignInAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-teal-600 text-gray-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl text-white font-bold cursor-default">
            Travel Planner
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center hover:text-white">
            <FaHome className="mr-2" />
            Home
          </Link>
          <Link to="/tour" className="flex items-center hover:text-white">
            <FaMap className="mr-2" />
            Tour
          </Link>
          <Link
            to="/accommodations"
            className="flex items-center hover:text-white"
          >
            <FaHotel className="mr-2" />
            Accommodations
          </Link>
          <Link
            to="/discoveries"
            className="flex items-center hover:text-white"
          >
            <FaImages className="mr-2" />
            Discoveries
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center hover:text-white"
              >
                <FaUser className="mr-2" />
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 flex items-center px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center bg-green-500 shadow-md text-white px-4 py-2 rounded-full transition duration-300 hover:bg-green-600"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center bg-blue-500 shadow-md text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75">
          <div className="bg-white text-black w-full max-w-md p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button onClick={closeMenu} className="text-2xl">
                <FaTimes />
              </button>
            </div>
            <nav className="space-y-4">
              <Link
                to="/"
                className="flex items-center py-2 px-4 hover:bg-gray-200 rounded"
                onClick={closeMenu}
              >
                <FaHome className="mr-2" />
                Home
              </Link>
              <Link
                to="/tour"
                className="flex items-center py-2 px-4 hover:bg-gray-200 rounded"
                onClick={closeMenu}
              >
                <FaMap className="mr-2" />
                Tour
              </Link>
              <Link
                to="/accommodations"
                className="flex items-center py-2 px-4 hover:bg-gray-200 rounded"
                onClick={closeMenu}
              >
                <FaHotel className="mr-2" />
                Accommodations
              </Link>
              <Link
                to="/discoveries"
                className="flex items-center py-2 px-4 hover:bg-gray-200 rounded"
                onClick={closeMenu}
              >
                <FaImages className="mr-2" />
                Discoveries
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center py-2 px-4 hover:bg-gray-200 rounded"
                    onClick={closeMenu}
                  >
                    <FaUser className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="flex items-center w-full text-left py-2 px-4 bg-red-500 text-white hover:bg-red-600 rounded"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 px-4 hover:bg-gray-200 rounded"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 px-4 hover:bg-gray-200 rounded"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
