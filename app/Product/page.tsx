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
  shopId: string;
};

const ProductPage = () => {
  const { productData, loading, error, deleteProduct, updateProduct, createProduct } = useProductContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter states
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [minStockLevel, setMinStockLevel] = useState<number | "">("");
  const [maxStockLevel, setMaxStockLevel] = useState<number | "">("");

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
    setSearchQuery(e.target.value);
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
      createProduct({ ...formData, id: `${Date.now()}` });
      setIsCreateModalOpen(false);
    }
  };

  // Filter products based on search, price, and stock level
  const filteredProducts = productData.filter((product) => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMinPrice = minPrice ? product.price >= minPrice : true;
    const matchesMaxPrice = maxPrice ? product.price <= maxPrice : true;
    const matchesMinStock = minStockLevel ? product.stockLevel >= minStockLevel : true;
    const matchesMaxStock = maxStockLevel ? product.stockLevel <= maxStockLevel : true;

    return (
      matchesSearchQuery &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesMinStock &&
      matchesMaxStock
    );
  });

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

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

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

      <div className="grid xl:grid-cols-4 md:grid-cols-2 justify-center items-center gap-4 p-2 w-full">
        <input
          type="number"
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Min Price"
          value={minPrice === "" ? "" : minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value) || "")}
        />
        <input
          type="number"
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Max Price"
          value={maxPrice === "" ? "" : maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value) || "")}
        />
        <input
          type="number"
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Min Stock"
          value={minStockLevel === "" ? "" : minStockLevel}
          onChange={(e) => setMinStockLevel(Number(e.target.value) || "")}
        />
        <input
          type="number"
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Max Stock"
          value={maxStockLevel === "" ? "" : maxStockLevel}
          onChange={(e) => setMaxStockLevel(Number(e.target.value) || "")}
        />
      </div>

      {/* Search for products by name */}
      <div className="flex justify-center items-center gap-2 p-2 w-full">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md w-full"
          placeholder="Search Products"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <Tablecomponent columns={columns} data={filteredProducts} className="mt-4" />

      {/* Edit Modal */}
      {isEditModalOpen && formData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-2/3">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmitEdit}>
              {["name", "description", "price", "stockLevel", "image", "shopId"].map((field) => (
                <div className="mb-4" key={field}>
                  <label htmlFor={field} className="block capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "price" || field === "stockLevel" ? "number" : "text"}
                    id={field}
                    name={field}
                    value={formData[field as keyof Product]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
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
            <h2 className="text-xl font-semibold mb-4">Create Product</h2>
            <form onSubmit={handleSubmitCreate}>
              {["name", "description", "price", "stockLevel", "image", "shopId"].map((field) => (
                <div className="mb-4" key={field}>
                  <label htmlFor={field} className="block capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "price" || field === "stockLevel" ? "number" : "text"}
                    id={field}
                    name={field}
                    value={formData[field as keyof Product]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
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
                  className="px-4 py-2 bg-emerald-500 text-white rounded-md"
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

export default ProductPage;
