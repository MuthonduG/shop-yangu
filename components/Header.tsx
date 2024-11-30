"use client";
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { TiPlus } from "react-icons/ti";
import { FcShop } from "react-icons/fc";
import { FcSalesPerformance } from "react-icons/fc";
import { FcOpenedFolder } from "react-icons/fc";
import { useProductContext } from "@/components/ProductData/ProductContext";

const Header = () => {
  const { productData } = useProductContext();

  const [currentShops, setCurrentShops] = useState(0);
  const [currentSales, setCurrentSales] = useState(0);
  const [currentInventory, setCurrentInventory] = useState(0);

  useEffect(() => {
    // Calculate the total number of shops (unique shopIds)
    const shops = new Set(productData.map(product => product.shopId));
    setCurrentShops(shops.size);

    // Calculate the total sales (price * stockLevel for each product)
    const sales = productData.reduce((acc, product) => acc + product.price * product.stockLevel, 0);
    setCurrentSales(sales);

    // Calculate the total inventory (sum of stockLevel for all products)
    const inventory = productData.reduce((acc, product) => acc + product.stockLevel, 0);
    setCurrentInventory(inventory);
  }, [productData]); 

  return (
    <section className="p-2">
        <div className="grid xl:grid-cols-3 justify-center items-center p-4 gap-5 md:grid-cols-2 ">
            <article className='shadow-md rounded-lg bg-white border border-gray-300 flex flex-col items-center justify-center p-5'>
                <div className="flex justify-center items-center gap-3">
                    <span className='font-serif font-semibold text-xl'>Current shops</span>
                    <FcShop className='text-3xl'/>
                </div>
                <div className="leading-10 p-6 flex justify-center items-center">
                    <p>
                        Total number shops within shop yangu chain.
                    </p>
                </div>
                <div className="flex justify-center items-center text-2xl font-semibold">
                    <CountUp start={0} end={currentShops} duration={5}/>
                    <TiPlus />
                </div>
            </article>
            <article className='shadow-md rounded-lg bg-white border border-gray-300 flex flex-col items-center justify-center p-5'>
                <div className="flex justify-center items-center gap-3">
                    <span className='font-serif font-semibold text-xl'>Projected Monthly Sales</span>
                    <FcSalesPerformance className='text-3xl'/>
                </div>
                <div className="leading-10 p-6 flex justify-center items-center">
                    <p>
                        Total price of all products across all shops.
                    </p>
                </div>
                <div className="flex justify-center items-center text-2xl font-semibold">
                    <CountUp start={0} end={currentSales} duration={5}/>
                    <TiPlus />
                </div>
            </article>
            <article className='shadow-md rounded-lg bg-white border border-gray-300 flex flex-col items-center justify-center p-5'>
                <div className="flex justify-center items-center gap-3">
                    <span className='font-serif font-semibold text-xl'>Current Inventory</span>
                    <FcOpenedFolder className='text-3xl'/>
                </div>
                <div className="leading-10 p-6 flex justify-center items-center">
                    <p>
                        Total number of all products across all shops.
                    </p>
                </div>
                <div className="flex justify-center items-center text-2xl font-semibold">
                    <CountUp start={0} end={currentInventory} duration={5}/>
                    <TiPlus />
                </div>
            </article>
        </div>
    </section>
  )
}

export default Header;
