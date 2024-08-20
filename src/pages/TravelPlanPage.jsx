import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import TravelPlanForm from "../components/TravelPlanForm";
import { FaEdit, FaTrash } from "react-icons/fa";

const TravelPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user._id) {
      const fetchPlans = async () => {
        try {
          const response = await axiosInstance.get(
            `/api/travel-plans/user/${user._id}`
          );
          const formattedPlans = response.data.map((plan) => ({
            ...plan,
            startDate: new Date(plan.startDate).toISOString().split("T")[0],
            endDate: new Date(plan.endDate).toISOString().split("T")[0],
          }));
          setPlans(formattedPlans);
        } catch (error) {
          toast.error("Failed to fetch travel plans");
        }
      };

      fetchPlans();
    }
  }, [user]);

  useEffect(() => {
    if (!selectedPlan) {
      if (user && user._id) {
        const fetchPlans = async () => {
          try {
            const response = await axiosInstance.get(
              `/api/travel-plans/user/${user._id}`
            );
            const formattedPlans = response.data.map((plan) => ({
              ...plan,
              startDate: new Date(plan.startDate).toISOString().split("T")[0],
              endDate: new Date(plan.endDate).toISOString().split("T")[0],
            }));
            setPlans(formattedPlans);
          } catch (error) {
            toast.error("Failed to fetch travel plans");
          }
        };

        fetchPlans();
      }
    }
  }, [selectedPlan, user]);

  const handleDelete = async (planId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this travel plan?"
    );
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/api/travel-plans/${planId}`);
        setPlans(plans.filter((plan) => plan._id !== planId));
        toast.success("Travel plan deleted successfully");
      } catch (error) {
        toast.error("Failed to delete travel plan");
      }
    }
  };

  const handleUpdate = (plan) => {
    setSelectedPlan(plan);
  };

  const handleFormClose = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Travel Plans</h1>
      {selectedPlan && (
        <div className="mb-8">
          <TravelPlanForm
            destination={{ _id: selectedPlan.destinationId }}
            initialValues={selectedPlan}
            onClose={handleFormClose}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.length > 0 ? (
          plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white p-4 border rounded-lg shadow-md  hover:shadow-green-500 overflow-hidden transform transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={plan.destinationId.imageUrl}
                alt={plan.destinationId.name}
                className="w-full h-32 object-cover rounded-t-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">
                {plan.destinationId.name}
              </h2>
              <p className="text-gray-600 mb-2">{plan.schedule}</p>
              <p className="text-gray-800 font-bold mb-2">${plan.budget}</p>
              <p className="text-gray-600 mb-4">{`From: ${new Date(
                plan.startDate
              ).toLocaleDateString()} To: ${new Date(
                plan.endDate
              ).toLocaleDateString()}`}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleUpdate(plan)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                >
                  <FaEdit />
                  <span>Update</span>
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No travel plans available</p>
        )}
      </div>
    </div>
  );
};

export default TravelPlansPage;
