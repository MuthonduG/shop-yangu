"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the types
interface Shop {
  id: string; // Updated to string
  name: string;
  description: string;
  logo: string;
}

interface ShopContextType {
  shopData: Shop[];
  loading: boolean;
  error: string | null;
  createShop: (newShop: Shop) => void;
  updateShop: (id: string, updatedShop: Partial<Shop>) => void;
  deleteShop: (id: string) => void;
}

// Create context
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Provider component
export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [shopData, setShopData] = useState<Shop[]>([]); // Initialize as empty
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch shop data from the API on mount
  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/shops");
        if (!response.ok) {
          throw new Error("Failed to fetch shops");
        }
        const data = await response.json();
        setShopData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  // Create a new shop by posting data to the API
  const createShop = async (newShop: Shop) => {
    setLoading(true);
    try {
      const shopWithStringId = { ...newShop, id: newShop.id.toString() }; // Ensure ID is a string
      const response = await fetch("http://localhost:5000/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopWithStringId),
      });
      if (!response.ok) {
        throw new Error("Failed to create shop");
      }
      const createdShop = await response.json();
      setShopData((prevShops) => [...prevShops, createdShop]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing shop by sending PUT request
  const updateShop = async (id: string, updatedShop: Partial<Shop>) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/shops/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedShop, id: id.toString() }), // Ensure ID is a string
      });
      if (!response.ok) {
        throw new Error("Failed to update shop");
      }
      const updated = await response.json();
      setShopData((prevShops) =>
        prevShops.map((shop) => (shop.id === id ? updated : shop))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Delete a shop by sending DELETE request
  const deleteShop = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/shops/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete shop");
      }
      setShopData((prevShops) => prevShops.filter((shop) => shop.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShopContext.Provider
      value={{ shopData, loading, error, createShop, updateShop, deleteShop }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook to use the ShopContext
export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }
  return context;
};
