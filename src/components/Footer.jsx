import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/logo_4x.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <img src={logo} alt="Logo" className="h-12 rounded-full" />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 mb-6 md:mb-0">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/tour" className="hover:text-gray-400">
              Tours
            </Link>
          </li>
          <li>
            <Link to="/accommodations" className="hover:text-gray-400">
              Accommodations
            </Link>
          </li>
          <li>
            <Link to="/discovries" className="hover:text-gray-400">
              Discoveries
            </Link>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <Link
            to="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaFacebookF />
          </Link>
          <Link
            to="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaTwitter />
          </Link>
          <Link
            to="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaInstagram />
          </Link>
          <Link
            to="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaLinkedinIn />
          </Link>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="text-center mt-8 text-gray-500">
        &copy; {new Date().getFullYear()} Travel Planner.
      </div>
    </footer>
  );
};

export default Footer;
