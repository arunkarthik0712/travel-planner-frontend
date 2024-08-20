import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const DiscoverySchema = Yup.object().shape({
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  images: Yup.mixed().required("At least one image is required"),
});

const DiscoveryForm = ({ initialValues = {}, isEdit = false, discoveryId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    console.log("Selected files:", selectedFiles);

    const validFiles = selectedFiles.filter(
      (file) => file.size <= 5 * 1024 * 1024 // 5MB limit
    );

    if (validFiles.length > 3) {
      toast.error("You can only upload a maximum of 3 images.");
      return;
    }

    setFiles(validFiles);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const uploadedImages = [];

    for (const file of files) {
      const data = new FormData();
      data.append("file", file);

      try {
        const response = await axiosInstance.post(`/api/upload`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const photoURLs = response.data.urls;

        if (photoURLs && photoURLs.length > 0) {
          uploadedImages.push(...photoURLs);
        } else {
          toast.error("Failed to upload image.");
          return;
        }
      } catch (err) {
        console.error("Upload Error:", err.response?.data || err.message);
        toast.error("Error uploading file. Please try again.");
        return;
      }
    }

    const post = {
      location: values.location,
      description: values.description,
      userId: user._id,
      images: uploadedImages,
    };

    try {
      if (isEdit && discoveryId) {
        await axiosInstance.put(
          `/api/discoveries/update/${discoveryId}`,
          post,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success("Discovery updated successfully");
        navigate("/profile/my-discoveries");
      } else {
        await axiosInstance.post("/api/discoveries/new", post, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        toast.success("Discovery created successfully");
        navigate("/profile/my-discoveries");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving discovery:", error.response?.data);
      toast.error("Failed to save discovery");
    }
  };

  return (
    <Formik
      initialValues={{
        location: initialValues.location || "",
        description: initialValues.description || "",
        images: [],
      }}
      validationSchema={DiscoverySchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl flex items-center font-bold mb-4">
            <button
              type="button"
              className="mr-2"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>
            {isEdit ? "Update Discovery" : "Create Discovery"}
          </h3>

          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">
              Location
            </label>
            <Field
              name="location"
              type="text"
              className="border p-2 rounded w-full mt-1"
            />
            {errors.location && touched.location ? (
              <div className="text-red-500">{errors.location}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <Field
              name="description"
              as="textarea"
              rows="3"
              className="border p-2 rounded w-full mt-1"
            />
            {errors.description && touched.description ? (
              <div className="text-red-500">{errors.description}</div>
            ) : null}
          </div>

          <input
            name="images"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full mt-1"
            multiple
          />
          {errors.images && touched.images ? (
            <div className="text-red-500">{errors.images}</div>
          ) : null}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 disabled:opacity-50"
          >
            {isEdit ? "Update Discovery" : "Create Discovery"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DiscoveryForm;
