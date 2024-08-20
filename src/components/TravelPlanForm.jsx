import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const TravelPlanFormSchema = Yup.object().shape({
  schedule: Yup.string().required("Travel schedule is required"),
  activities: Yup.string().required("Activities are required"),
  toDoList: Yup.string().required("To-do list is required"),
  budget: Yup.number()
    .required("Budget is required")
    .min(1, "Budget must be at least $1"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
});

const TravelPlanForm = ({ destination, initialValues = {}, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    if (!user) {
      toast.error("Please log in to create a travel plan");
      return;
    }

    try {
      if (initialValues._id) {
        // Update existing plan
        await axiosInstance.put(
          `/api/travel-plans/${initialValues._id}`,
          values,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        toast.success("Travel plan updated successfully");
        onClose();
        navigate("/profile/my-travels");
      } else {
        // Create new plan
        await axiosInstance.post(
          "/api/travel-plans",
          { ...values, userId: user._id, destinationId: destination._id },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        toast.success("Travel plan created successfully");
        onClose();
      }
      resetForm();
    } catch (error) {
      toast.error("Failed to save travel plan");
    } finally {
      setSubmitting(false);
    }
  };

  if (!destination) {
    return (
      <div className="flex flex-col justify-center items-center text-center">
        <Loader />
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        schedule: initialValues.schedule || "",
        activities: initialValues.activities || "",
        toDoList: initialValues.toDoList || "",
        budget: initialValues.budget || "",
        startDate: initialValues.startDate || "",
        endDate: initialValues.endDate || "",
        destinationId: destination._id,
      }}
      validationSchema={TravelPlanFormSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="bg-white p-8 rounded-lg shadow-md shadow-green-500 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            {initialValues._id ? "Update Travel Plan" : "Create Travel Plan"}
          </h3>

          <div className="mb-6">
            <label
              htmlFor="schedule"
              className="block text-gray-700 font-medium mb-2"
            >
              Travel Schedule
            </label>
            <Field
              name="schedule"
              as="textarea"
              rows="3"
              className={`border p-3 rounded w-full mt-1 focus:ring focus:ring-green-200 ${
                errors.schedule && touched.schedule
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.schedule && touched.schedule ? (
              <div className="text-red-500 text-sm mt-1">{errors.schedule}</div>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="activities"
              className="block text-gray-700 font-medium mb-2"
            >
              Activities
            </label>
            <Field
              name="activities"
              as="textarea"
              rows="3"
              className={`border p-3 rounded w-full mt-1 focus:ring focus:ring-green-200 ${
                errors.activities && touched.activities
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.activities && touched.activities ? (
              <div className="text-red-500 text-sm mt-1">
                {errors.activities}
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="toDoList"
              className="block text-gray-700 font-medium mb-2"
            >
              To-Do List
            </label>
            <Field
              name="toDoList"
              as="textarea"
              rows="3"
              className={`border p-3 rounded w-full mt-1 focus:ring focus:ring-green-200 ${
                errors.toDoList && touched.toDoList
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.toDoList && touched.toDoList ? (
              <div className="text-red-500 text-sm mt-1">{errors.toDoList}</div>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="budget"
              className="block text-gray-700 font-medium mb-2"
            >
              Budget
            </label>
            <Field
              name="budget"
              type="number"
              className={`border p-3 rounded w-full mt-1 focus:ring focus:ring-green-200 ${
                errors.budget && touched.budget
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.budget && touched.budget ? (
              <div className="text-red-500 text-sm mt-1">{errors.budget}</div>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="startDate"
              className="block text-gray-700 font-medium mb-2"
            >
              Start Date
            </label>
            <Field
              name="startDate"
              type="date"
              className={`border p-3 rounded w-full mt-1 focus:ring focus:ring-green-200 ${
                errors.startDate && touched.startDate
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.startDate && touched.startDate ? (
              <div className="text-red-500 text-sm mt-1">
                {errors.startDate}
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="endDate"
              className="block text-gray-700 font-medium mb-2"
            >
              End Date
            </label>
            <Field
              name="endDate"
              type="date"
              className={`border p-3 rounded w-full mt-1 focus:ring focus:ring-green-200 ${
                errors.endDate && touched.endDate
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.endDate && touched.endDate ? (
              <div className="text-red-500 text-sm mt-1">{errors.endDate}</div>
            ) : null}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            >
              {initialValues._id ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TravelPlanForm;
