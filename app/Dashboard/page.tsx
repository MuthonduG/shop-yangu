import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Analytics from "@/components/Analytics";

const Dashboard = () => {
  return (
    <section className="w-full h-screen flex flex-col mt-32">
      <div className="">
        <Hero/>
      </div>
      <div className="">
        <Header />
      </div>
      <div className="">
        <Analytics />
      </div>
    </section>
  );
};

export default Dashboard;
