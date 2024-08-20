import React from "react";
import DiscoveryForm from "../components/DiscoveryForm";

const CreateDiscoveryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload Discovery</h1>
      <DiscoveryForm />
    </div>
  );
};

export default CreateDiscoveryPage;
