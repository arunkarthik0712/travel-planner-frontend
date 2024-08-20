import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import CustomCarousel from "../components/Carousel";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { FaMapMarkerAlt } from "react-icons/fa";

const slides = [
  {
    image:
      "https://media.istockphoto.com/id/530717631/photo/oia-sunset-santorini-greece.webp?b=1&s=612x612&w=0&k=20&c=YEQqi9M50QA4lvdBcMF4ls2Cupt49kjjlWIU95pNFi0=",
    title: "Embark on Unforgettable Adventures",
    subtitle:
      "Explore our curated tour packages and embark on journeys that turn dreams into reality.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1635255506105-b74adbd94026?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TGFkYWtofGVufDB8fDB8fHww",
    title: "Discover the World with Our Exclusive Tours",
    subtitle:
      "From cultural escapades to thrilling adventures, find the perfect tour package tailored for you.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TmlhZ2FyYSUyMEZhbGxzfGVufDB8fDB8fHww",
    title: "Your Adventure Awaits",
    subtitle:
      "Choose from our diverse range of tour packages and make memories that will last a lifetime.",
  },
];

const TourPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/destinations?sortOrder=${sortOrder}`
        );
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        toast.error("Failed to fetch destinations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="carousel-container mb-8">
          <CustomCarousel slides={slides} />
        </div>
        <h1 className="text-3xl text-center font-bold mb-6">
          Explore Destinations
        </h1>
        <div className="mb-4 flex justify-end">
          <label htmlFor="sortOrder" className="mr-2 font-medium">
            Sort by price:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md -mt-2 px-3 py-2"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <div
                key={destination._id}
                className="destination-card border rounded-lg shadow-lg hover:shadow-green-500 overflow-hidden transform transition-transform duration-300 hover:-translate-y-1"
              >
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold mb-2">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    <span>{destination.location}</span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {destination.description}
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    ${destination.price}
                  </p>
                  <Link
                    to={`/tourdetails/${destination._id}`}
                    className="mt-4 inline-block bg-teal-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-teal-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TourPage;
