"use client";

import React, { useState } from "react";
import Tablecomponent from "@/components/Tablecomponent";
import { useShopContext } from "@/components/ShopData/ShopContext";
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

type Shop = {
  id: string;
  name: string;
  description: string;
  logo: string;
};

const ShopPage = () => {
  const { shopData, loading, error, deleteShop, updateShop, createShop } = useShopContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [currentShop, setCurrentShop] = useState<Shop | null>(null);
  const [formData, setFormData] = useState<Shop | null>(null);

  const handleEdit = (shop: Shop) => {
    setCurrentShop(shop);
    setFormData(shop);
    setIsEditModalOpen(true);
  };

  const handleDelete = (shop: Shop) => {
    if (window.confirm(`Are you sure you want to delete ${shop.name}?`)) {
      deleteShop(shop.id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && currentShop) {
      updateShop(currentShop.id, formData);
      setIsEditModalOpen(false);
    }
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      createShop({ ...formData, id: `${Date.now()}` }); // Generate a unique string ID
      setIsCreateModalOpen(false);
    }
  };

  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "description", header: "Description" },
    {
      key: "logo",
      header: "Logo",
      render: (value: string, row: Shop) => (
        <img src={value} alt="Shop Logo" className="w-16 h-16 object-cover" />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_: string, row: Shop) => (
        <div className="flex gap-4">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <CiEdit size={20} />
          </button>
          <button
            onClick={() => handleDelete(row)}
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
      <div className="flex justify-between w-full p-2 items-center">
        <h1 className="text-2xl font-semibold mb-6 mt-2">Shop List</h1>
        <button
          onClick={() => {
            setFormData({ id: "", name: "", description: "", logo: "" });
            setIsCreateModalOpen(true);
          }}
          className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-gray-200 font-semibold"
        >
          Create New Shop
        </button>
      </div>
      <Tablecomponent columns={columns} data={shopData} className="mt-4" />

      {/* Edit Modal */}
      {isEditModalOpen && formData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-2/3">
            <h2 className="text-xl font-semibold mb-4">Edit Shop</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label htmlFor="name" className="block">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="logo" className="block">Logo URL</label>
                <input
                  type="text"
                  id="logo"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && formData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-2/3">
            <h2 className="text-xl font-semibold mb-4">Create New Shop</h2>
            <form onSubmit={handleSubmitCreate}>
              <div className="mb-4">
                <label htmlFor="name" className="block">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="logo" className="block">Logo URL</label>
                <input
                  type="text"
                  id="logo"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShopPage;
