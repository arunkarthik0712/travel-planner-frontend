import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserDetails from "./UserDetails";
import DiscoveriesPage from "./DiscoveriesPage";
import TravelPlansPage from "../pages/TravelPlanPage";
import Bookings from "./Bookings";
import CreateDiscoveryPage from "./CreateDiscoveryPage";
import MyDiscoveriesPage from "./MyDiscoveriesPage";

const ProfilePage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar component */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/my-discoveries" element={<MyDiscoveriesPage />} />
            <Route path="/my-travels" element={<TravelPlansPage />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route
              path="/discoveries/create"
              element={<CreateDiscoveryPage />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
