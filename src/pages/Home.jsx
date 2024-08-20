import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import DestinationCard from "../components/DestinatinationCard";
import CustomCarousel from "../components/Carousel";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const slides = [
  {
    image:
      "https://www.usnews.com/object/image/00000180-6260-d187-a5cb-fefd67170001/eiffel-tower-outro-stock.jpg?update-time=1650917926219&size=responsive640",
    title: "Welcome to Your Dream Travel Planner",
    subtitle:
      "Discover new places, plan your journeys, and make memories that last a lifetime.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1691225409811-a64942a0596a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D",
    title: "Explore New Destinations",
    subtitle:
      "Adventure awaits. Find the best destinations tailored just for you.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529154036614-a60975f5c760?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D",
    title: "Plan Your Perfect Trip",
    subtitle:
      "Craft your travel plans with ease and enjoy a seamless experience.",
  },
];

const HomePage = () => {
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        const response = await axiosInstance.get("/api/destinations/popular");
        setPopularDestinations(response.data);
      } catch (error) {
        console.error("Failed to fetch popular destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDestinations();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Carousel Banner */}
        <div className="mb-12">
          <CustomCarousel slides={slides} />
          <div className="text-center mt-10">
            <Link
              to="/tour"
              className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition duration-300"
            >
              Explore Tours
            </Link>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="popular-destinations">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Popular Destinations
          </h2>
          {loading ? (
            <div className="text-center">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularDestinations.map((destination) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
