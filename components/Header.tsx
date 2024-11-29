"use client";
import React from 'react'
import CountUp from 'react-countup'
import { TiPlus } from "react-icons/ti";
import { FcShop } from "react-icons/fc";
import { FcSalesPerformance } from "react-icons/fc";
import { FcOpenedFolder } from "react-icons/fc";

const Header = () => {
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
                        Currently, shop yangu has branches scattered within Nairobi, Kisumu and Nakuru
                    </p>
                </div>
                <div className="flex justify-center items-center text-2xl font-semibold">
                    <CountUp start={0} end={10} duration={5}/>
                    <TiPlus />
                </div>
            </article>
            <article className='shadow-md rounded-lg bg-white border border-gray-300 flex flex-col items-center justify-center p-5'>
                <div className="flex justify-center items-center gap-3">
                    <span className='font-serif font-semibold text-xl'>Current Monthly Sales</span>
                    <FcSalesPerformance className='text-3xl'/>
                </div>
                <div className="leading-10 p-6 flex justify-center items-center">
                    <p>
                        Currently, shop yangu has branches scattered within Nairobi, Kisumu and Nakuru
                    </p>
                </div>
                <div className="flex justify-center items-center text-2xl font-semibold">
                    <CountUp start={0} end={10000} duration={5}/>
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
                        Currently, shop yangu has branches scattered within Nairobi, Kisumu and Nakuru
                    </p>
                </div>
                <div className="flex justify-center items-center text-2xl font-semibold">
                    <CountUp start={0} end={1150} duration={5}/>
                    <TiPlus />
                </div>
            </article>
        </div>
    </section>
  )
}

export default Header