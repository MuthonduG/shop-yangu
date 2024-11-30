"use client";

import React from "react";
import Tablecomponent from "@/components/Tablecomponent";
import { useShopContext } from "@/components/ShopData/ShopContext";
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

type Shop = {
  id: number;
  name: string;
  description: string;
  logo: string;
};

const ShopPage = () => {
  const { shopData, loading, error, deleteShop } = useShopContext();  // Destructure deleteShop from context

  // Handle edit action
  const handleEdit = (shop: Shop) => {
    console.log("Edit clicked for:", shop);
    // Implement edit logic, for example, redirect to an edit page or open a modal
  };

  // Handle delete action
  const handleDelete = (shop: Shop) => {
    if (window.confirm(`Are you sure you want to delete ${shop.name}?`)) {
      deleteShop(shop.id);  // Call the deleteShop method from context
    }
  };

  // Define table columns, including actions column
  const columns: { key: keyof Shop | "actions"; header: string; render?: (value: string | number | undefined, row: Shop) => React.ReactNode }[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "description", header: "Description" },
    {
      key: "logo",
      header: "Logo",
      render: (value: string | number | undefined, row: Shop) => (
        <img src={value as string} alt="Shop Logo" className="w-16 h-16 object-cover" />
      ),
    },
    {
      key: "actions", // Define actions column
      header: "Actions",
      render: (_, row: Shop) => (
        <div className="flex gap-4">
          {/* Edit Button */}
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <CiEdit size={20} />
          </button>
          {/* Delete Button */}
          <button
            onClick={() => handleDelete(row)}  // Call handleDelete on click
            className="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <FaTrashCan size={20} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <section className="w-full h-screen flex flex-col mt-32 px-8">
      <h1 className="text-2xl font-semibold mb-6">Shop List</h1>
      <Tablecomponent columns={columns} data={shopData} className="mt-4" />
    </section>
  );
};

export default ShopPage;
