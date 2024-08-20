import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiscoveryForm from "../components/DiscoveryForm";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const EditDiscoveryPage = () => {
  const { id } = useParams();
  const [discovery, setDiscovery] = useState(null);

  useEffect(() => {
    const fetchDiscovery = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/discoveries/discoveries/${id}`
        );
        setDiscovery(response.data);
      } catch (error) {
        toast.error("Failed to fetch discovery");
      }
    };

    fetchDiscovery();
  }, [id]);

  if (!discovery) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Discovery</h1>
      <DiscoveryForm initialValues={discovery} isEdit={true} discoveryId={id} />
    </div>
  );
};

export default EditDiscoveryPage;
