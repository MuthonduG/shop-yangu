"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import shopData from '../../public/data/shops.json';  // Import directly from the public folder

// Define the types
interface Shop {
  id: number;
  name: string;
  description: string;
  logo: string;
}

interface ShopContextType {
  shopData: Shop[];
  loading: boolean;
  error: string | null;
  createShop: (newShop: Shop) => void;
  updateShop: (id: number, updatedShop: Partial<Shop>) => void;
  deleteShop: (id: number) => void;
}

// Create context
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Provider component
export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShopData, setIsShopData] = useState<Shop[]>(shopData);  // Use static import data
  const [loading, setLoading] = useState<boolean>(false);  // Initialize as false since data is already available
  const [error, setError] = useState<string | null>(null);

  // Create a new shop
  const createShop = (newShop: Shop) => {
    setIsShopData((prevShops) => [...prevShops, newShop]);
  };

  // Update an existing shop
  const updateShop = (id: number, updatedShop: Partial<Shop>) => {
    setIsShopData((prevShops) =>
      prevShops.map((shop) =>
        shop.id === id ? { ...shop, ...updatedShop } : shop
      )
    );
  };

  // Delete a shop
  const deleteShop = (id: number) => {
    setIsShopData((prevShops) => prevShops.filter((shop) => shop.id !== id));
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
