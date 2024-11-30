"use client";
import React, { useEffect, useState } from "react";
import Chartcomponent from "@/components/Chartcomponent";
import Tablecomponent from "@/components/Tablecomponent";
import { MdDoubleArrow } from "react-icons/md";
import { useProductContext } from "@/components/ProductData/ProductContext";
import Link from "next/link";

type TableRow = {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
};

const Analytics = () => {
  // Fetching product data from the context
  const { productData, loading, error } = useProductContext();

  // Prepare the table data by transforming the fetched product data
  const [tableData, setTableData] = useState<TableRow[]>([]);

  useEffect(() => {
    if (productData.length > 0) {
      const transformedData = productData.map((product) => ({
        id: parseInt(product.id), // Convert the ID to a number if necessary
        name: product.name,
        description: product.description,
        price: product.price,
        status: product.stockLevel > 0 ? "Active" : "Inactive", // Active if stockLevel > 0
      }));
      setTableData(transformedData);
    }
  }, [productData]);

  // Limit the displayed data to a maximum of six products
  const limitedTableData = tableData.slice(0, 6);

  // Table columns
  const tableColumns: { key: keyof TableRow; header: string }[] = [
    { key: "name", header: "Product Name" },
    { key: "description", header: "Description" },
    { key: "price", header: "Price" },
    { key: "status", header: "Status" },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="p-2">
      <div className="grid xl:grid-cols-2 md:grid-cols-1 justify-center items-center p-4 gap-5">
        {/* Chart Component */}
        <article className="shadow-md rounded-lg bg-white border border-gray-300 flex items-center justify-center p-5">
          <Chartcomponent />
        </article>
        {/* Table Component */}
        <article className="shadow-md rounded-lg bg-white border border-gray-300 flex flex-col items-center justify-center p-5">
          <div className="p-3 flex justify-between items-center w-full">
            <span className="text-left font-serif text-xl">Available Products</span>
            <Link href="/Product">
              <MdDoubleArrow className="text-right" />
            </Link>
          </div>
          <Tablecomponent columns={tableColumns} data={limitedTableData} />
        </article>
      </div>
    </section>
  );
};

export default Analytics;
