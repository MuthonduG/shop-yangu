"use client";
import React, { useEffect, useRef } from "react";
import { useProductContext } from "@/components/ProductData/ProductContext"; // Assuming you have this context for product data
import Chart, { ChartData, ChartOptions } from "chart.js/auto";

const ChartComponent: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null); // Reference to the canvas element
  const chartInstanceRef = useRef<Chart<"pie", number[], string> | null>(null); // Reference to the Chart instance

  const { productData } = useProductContext(); // Getting product data from context

  useEffect(() => {
    if (!chartRef.current || !productData || productData.length === 0) return; // Ensure the canvas element and product data are available

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return; // Ensure the 2D context is available

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Process product data to count the number of products per shop
    const shopProductCount: { [key: string]: number } = {};

    productData.forEach((product) => {
      shopProductCount[product.shopId] = (shopProductCount[product.shopId] || 0) + 1;
    });

    // Create the chart labels and data
    const labels = Object.keys(shopProductCount); // Shops (based on shopId)
    const dataValues = Object.values(shopProductCount); // Number of products for each shop

    // Define the chart data
    const chartData: ChartData<"pie", number[], string> = {
      labels,
      datasets: [
        {
          label: "Products per Shop",
          data: dataValues, // Data points representing the number of products per shop
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Define the chart options
    const options: ChartOptions<"pie"> = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          enabled: true,
        },
      },
    };

    // Create the Chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options,
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null; // Reset the reference
      }
    };
  }, [productData]); // Re-run whenever the product data changes

  return (
    <div style={{ width: "400px", height: "400px" }}>
      <canvas ref={chartRef}></canvas> {/* Reference to the canvas element */}
    </div>
  );
};

export default ChartComponent;
