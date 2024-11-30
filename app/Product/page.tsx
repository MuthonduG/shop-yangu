"use client";

import React, { useState } from "react";
import Tablecomponent, { Column } from "@/components/Tablecomponent";
import { useProductContext } from "@/components/ProductData/ProductContext";
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

type Product = {
  id: string;
  name: string;
  price: number;
  stockLevel: number;
  description: string;
  image: string;
  shopId: string; // Ensure shopId is included
};

const ProductPage = () => {
  const { productData, loading, error, deleteProduct, updateProduct, createProduct } = useProductContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to hold the search query

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setFormData(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      deleteProduct(product.id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: name === "price" || name === "stockLevel" ? Number(value) : value,
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && currentProduct) {
      updateProduct(currentProduct.id, formData);
      setIsEditModalOpen(false);
    }
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      createProduct({ ...formData, id: `${Date.now()}` }); // Generate a unique string ID
      setIsCreateModalOpen(false);
    }
  };

  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter products by name
  );

  const columns: Column<Product>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "price", header: "Price" },
    { key: "stockLevel", header: "Stock Level" },
    { key: "description", header: "Description" },
    {
      key: "image",
      header: "Image",
      render: (value, row) =>
        value ? (
          <img src={value as string} alt={`${row.name} Image`} className="w-16 h-16 object-cover" />
        ) : null,
    },
    {
      key: "actions",
      header: "Actions",
      render: (_, row) => (
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
        <h1 className="text-2xl font-semibold mb-6 mt-2">Product List</h1>
        <button
          onClick={() => {
            setFormData({ id: "", name: "", price: 0, stockLevel: 0, description: "", image: "", shopId: "" });
            setIsCreateModalOpen(true);
          }}
          className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-gray-200 font-semibold"
        >
          Create New Product
        </button>
      </div>

      {/* Search for products by name */}
      <div className="flex justify-center items-center gap-2 p-2 w-full">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md w-2/3"
          placeholder="Search Products"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <Tablecomponent columns={columns} data={filteredProducts} className="mt-4" />

      {/* Edit Modal */}
      {isEditModalOpen && formData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          {/* Modal content */}
        </div>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && formData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          {/* Modal content */}
        </div>
      )}
    </section>
  );
};

export default ProductPage;
