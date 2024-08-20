import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

const BookingFormSchema = Yup.object().shape({
  numberOfMembers: Yup.number()
    .required("Number of members is required")
    .min(1, "At least one member required"),
  checkInDate: Yup.date()
    .required("Check-in date is required")
    .min(new Date(), "Check-in date cannot be in the past"),
  checkOutDate: Yup.date()
    .required("Check-out date is required")
    .min(Yup.ref("checkInDate"), "Check-out date must be after check-in date"),
});

const BookingForm = ({ accommodation, user, onClose }) => {
  const [totalPrice, setTotalPrice] = useState(accommodation.pricePerBed);

  useEffect(() => {
    setTotalPrice(accommodation.pricePerBed);
  }, [accommodation.pricePerBed]);

  const handleSubmit = async (values) => {
    try {
      await axiosInstance.post("/api/bookings/book", {
        accommodationId: accommodation._id,
        userId: user._id,
        numberOfMembers: values.numberOfMembers,
        totalPrice,
        checkInDate: values.checkInDate,
        checkOutDate: values.checkOutDate,
      });
      toast.success("Accommodation booked successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to book accommodation");
    }
  };

  const handleMembersChange = (e, setFieldValue) => {
    let numberOfMembers = parseInt(e.target.value, 10);
    if (isNaN(numberOfMembers) || numberOfMembers < 1) {
      numberOfMembers = 1;
    }
    setFieldValue("numberOfMembers", numberOfMembers);

    const newTotalPrice = numberOfMembers * accommodation.pricePerBed;
    setTotalPrice(newTotalPrice);
  };

  return (
    <Formik
      initialValues={{ numberOfMembers: 1, checkInDate: "", checkOutDate: "" }}
      validationSchema={BookingFormSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Book Accommodation
          </h2>
          <div className="mb-4">
            <label
              htmlFor="accommodationName"
              className="block text-gray-700 font-semibold"
            >
              Accommodation Name
            </label>
            <Field
              type="text"
              id="accommodationName"
              name="accommodationName"
              value={accommodation.name}
              className="mt-2 block w-full border border-gray-300 rounded p-3 bg-gray-100"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 font-semibold"
            >
              Your Name
            </label>
            <Field
              type="text"
              id="userName"
              name="userName"
              value={user.username}
              className="mt-2 block w-full border border-gray-300 rounded p-3 bg-gray-100"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="numberOfMembers"
              className="block text-gray-700 font-semibold"
            >
              Number of Members
            </label>
            <Field
              type="number"
              id="numberOfMembers"
              name="numberOfMembers"
              className="mt-2 block w-full border border-gray-300 rounded p-3"
              min="1"
              onChange={(e) => handleMembersChange(e, setFieldValue)}
            />
            {errors.numberOfMembers && touched.numberOfMembers ? (
              <div className="text-red-500 text-sm mt-1">
                {errors.numberOfMembers}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="checkInDate"
              className="block text-gray-700 font-semibold"
            >
              Check-in Date
            </label>
            <Field
              type="date"
              id="checkInDate"
              name="checkInDate"
              className="mt-2 block w-full border border-gray-300 rounded p-3"
            />
            {errors.checkInDate && touched.checkInDate ? (
              <div className="text-red-500 text-sm mt-1">
                {errors.checkInDate}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="checkOutDate"
              className="block text-gray-700 font-semibold"
            >
              Check-out Date
            </label>
            <Field
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              className="mt-2 block w-full border border-gray-300 rounded p-3"
            />
            {errors.checkOutDate && touched.checkOutDate ? (
              <div className="text-red-500 text-sm mt-1">
                {errors.checkOutDate}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="totalPrice"
              className="block text-gray-700 font-semibold"
            >
              Total Price
            </label>
            <Field
              type="text"
              id="totalPrice"
              name="totalPrice"
              value={`$${totalPrice}`}
              className="mt-2 block w-full border border-gray-300 rounded p-3 bg-gray-100"
              readOnly
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Book Now
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BookingForm;
