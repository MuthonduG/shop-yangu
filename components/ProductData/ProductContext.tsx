"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the types
interface Product {
  id: string; // Updated to string for consistency
  name: string;
  price: number;
  stockLevel: number;
  description: string;
  shopId: string;
  image: string;
}

interface ProductContextType {
  productData: Product[];
  loading: boolean;
  error: string | null;
  createProduct: (newProduct: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider component
export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch product data from the API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProductData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Create a new product by posting data to the API
  const createProduct = async (newProduct: Product) => {
    setLoading(true);
    try {
      const productWithStringId = { ...newProduct, id: newProduct.id.toString() }; // Ensure ID is a string
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productWithStringId),
      });
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      const createdProduct = await response.json();
      setProductData((prevProducts) => [...prevProducts, createdProduct]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing product by sending a PUT request
  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedProduct, id: id.toString() }),
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      const updated = await response.json();
      setProductData((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? updated : product))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Delete a product by sending a DELETE request
  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProductData((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        productData,
        loading,
        error,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
