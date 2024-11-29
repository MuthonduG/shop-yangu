"use client";
import React from 'react'
import CountUp from 'react-countup'
import { FcCalendar } from "react-icons/fc";

const Hero = () => {
  return (
    <section className='p-2'>
      <div className="grid xl:grid-cols-2 md:grid-cols-2 justify-center items-center p-4 gap-5">
          <article className='shadow-md rounded-lg bg-white border border-gray-300 flex items-center justify-center p-5 gap-8'>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center gap-2">
                <span className='text-slate-400'>shop yangu current bank acounts</span>
                <span className="text-xl font-semibold">Kenya Commercial Bank Account</span>

                <div className="flex justify-center items-center p-4 gap-6">
                  <button type="button" className='bg-emerald-400 p-2 rounded-xl hover:bg-green-500 transition ease-in-out delay-300 font-semibold text-sm text-gray-50'>View Account history</button>
                  <button type="button" className='bg-teal-400 p-2 rounded-xl hover:bg-teal-500 transition ease-in-out delay-300 font-semibold text-sm text-gray-50'>Link new accouts</button>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex flex-col justify-center items-center gap-2">
                <span className='text-slate-400'>Bank balances</span>
                <span className="text-xl font-semibold ">
                  <CountUp className='text-2xl' start={0} end={1680098} duration={5}/>
                </span>
                <div className="p-5 mb-6"></div>
              </div>
            </div>
          </article>
          <article className='shadow-md rounded-lg bg-slate-950 border border-gray-300 text-slate-300 flex items-center justify-center p-3 gap-6'>
            <div className="flex flex-col justify-center items-center p-4">
              <span className="text-xl font-semibold">Calendar notifications</span>
              <p className='text-slate-300 mt-2'>
                You have pending orders that need to be fulfiiled and they are due soon
              </p>
              <div className="flex justify-center items-center p-4">
                <button type="button" className='bg-emerald-400 p-2 rounded-xl hover:bg-green-500 transition ease-in-out delay-300 font-semibold text-sm text-gray-50'>View Calendar</button>
              </div>
            </div>
            <div className="">
              <FcCalendar className='text-9xl'/>
            </div>

          </article>
      </div>
    </section>
  )
}

export default Hero