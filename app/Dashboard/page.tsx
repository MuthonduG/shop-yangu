import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

const Dashboard = () => {
  return (
    <section className="w-full h-full flex flex-col mt-32">
      <div className="">
        <Hero/>
      </div>
      <div className="">
        <Header />
      </div>
    </section>
  );
};

export default Dashboard;
