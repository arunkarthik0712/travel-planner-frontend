// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import Bookings from "./pages/Bookings";
import AccommodationsPage from "./pages/AccommodationsPage";
import DiscoveriesPage from "./pages/DiscoveriesPage";
import Activate from "./pages/Activate";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import TourPage from "./pages/TourPage";
import TravelPlansPage from "./pages/TravelPlanPage";
import TourDetailsPage from "./pages/TourDetails";
import MyDiscoveriesPage from "./pages/MyDiscoveriesPage";
import EditDiscoveryPage from "./pages/EditDiscoveryPage";
import CreateDiscoveryPage from "./pages/CreateDiscoveryPage";
import DiscoveryDetailsPage from "./pages/DiscoveriesDetails";

function App() {
  return (
    <div className="font-poppins">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activate/:token" element={<Activate />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/accommodations" element={<AccommodationsPage />} />
            <Route path="/tour" element={<TourPage />} />
            <Route path="/tourdetails/:id" element={<TourDetailsPage />} />
            <Route
              path="/discoveries/create"
              element={<CreateDiscoveryPage />}
            />
            <Route
              path="/discoveries/edit/:id"
              element={<EditDiscoveryPage />}
            />
            <Route path="/discoveries" element={<DiscoveriesPage />} />
            <Route path="/discoveries/:id" element={<DiscoveryDetailsPage />} />
            <Route path="/my-discoveries" element={<MyDiscoveriesPage />} />
            <Route path="/profile/*" element={<ProfilePage />} />
            <Route path="/my-travels" element={<TravelPlansPage />} />
            <Route path="/booking/:id" element={<Bookings />} />
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
