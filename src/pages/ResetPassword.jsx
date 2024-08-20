import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axiosInstance";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(
      8,
      "Password must contain 8 or more characters with one special character"
    )
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const ResetPassword = () => {
  const { token } = useParams();
  const [Back, setBack] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { password } = values;
      await axiosInstance.put(`/api/auth/reset-password/${token}`, {
        password,
      });
      toast.success("Password reset successfully", {
        theme: "colored",
      });
      setBack(
        <div className="flex justify-center items-center space-x-2 mt-4">
          <p>Back to</p>
          <Link to="/login" className="text-gray-500 hover:text-black">
            login
          </Link>
        </div>
      );
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        theme: "colored",
      });
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-16 py-4 bg-gray-100">
        <h1 className="text-lg md:text-2xl font-extrabold">Blog App</h1>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col justify-center items-center space-y-6 w-[85%] md:w-[30%] p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-left w-full">
            Reset Password
          </h1>
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full space-y-5">
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your new password"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-black outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-black outline-none"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-600 transition-all"
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
                {Back}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
