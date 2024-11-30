"use client";

import React from "react";
import Tablecomponent from "@/components/Tablecomponent";
import { useShopContext } from "@/components/ShopData/ShopContext";

type Shop = {
  id: number;
  name: string;
  description: string;
  logo: string;
};

const ShopPage = () => {
  const { shopData, loading, error } = useShopContext();

  // Define table columns
  const columns: { key: keyof Shop; header: string; render?: (value: string | number, row: Shop) => React.ReactNode }[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "description", header: "Description" },
    {
      key: "logo",
      header: "Logo",
      render: (value: string | number, row: Shop) => (
        <img src={value as string} alt="Shop Logo" className="w-16 h-16 object-cover" />
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
