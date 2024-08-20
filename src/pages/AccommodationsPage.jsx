import React, { useEffect, useState } from "react";
import AccommodationCard from "../components/AccommodationCard";
import { fetchAccommodations } from "../api/accommodation";
import { toast } from "react-toastify";
import CustomCarousel from "../components/Carousel";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const slides = [
  {
    image:
      "https://media.istockphoto.com/id/467338906/photo/stone-building.webp?b=1&s=612x612&w=0&k=20&c=jOxaolJaccxfA1s2jIRESFxTtUhQMN4e6Gw0hvNAd60=",
    title: "Your Gateway to Unforgettable Stays",
    subtitle:
      "Step into comfort and luxury with accommodations that turn every trip into a cherished memory.",
  },
  {
    image:
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Find Your Perfect Home Away from Home",
    subtitle:
      "Discover a range of accommodations that cater to every taste and budget, ensuring a restful stay.",
  },
  {
    image:
      "https://images.pexels.com/photos/693895/pexels-photo-693895.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Experience Comfort Like Never Before",
    subtitle:
      "From cozy retreats to luxurious escapes, explore accommodations designed for a delightful journey.",
  },
];

const AccommodationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [accommodationType, setAccommodationType] = useState("");
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await fetchAccommodations(
          searchQuery,
          accommodationType
        );
        setAccommodations(results);
      } catch (error) {
        toast.error("Failed to fetch accommodations");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, accommodationType]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await fetchAccommodations(searchQuery, accommodationType);
      setAccommodations(results);
    } catch (error) {
      toast.error("Failed to fetch accommodations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="carousel-container mb-8">
          <CustomCarousel slides={slides} />
        </div>
        <h1 className="text-2xl text-center font-bold mb-4">
          Search Accommodations
        </h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <input
              type="text"
              placeholder="Search for accommodations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded w-full md:w-3/4 mb-4 md:mb-0"
            />
            <select
              value={accommodationType}
              onChange={(e) => setAccommodationType(e.target.value)}
              className="border p-2 rounded w-full md:w-1/4"
            >
              <option value="">All Types</option>
              <option value="Hotel">Hotel</option>
              <option value="Hostel">Hostel</option>
              <option value="Resort">Resort</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
            </select>
            <button
              type="submit"
              className="bg-teal-500 hover:shadow-md hover:shadow-teal-400 text-black px-4 py-2 rounded-full "
            >
              Search
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex flex-col justify-center items-center text-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accommodations.length === 0 ? (
              <p>No accommodations found.</p>
            ) : (
              accommodations.map((acc) => (
                <AccommodationCard key={acc._id} accommodation={acc} />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AccommodationsPage;
