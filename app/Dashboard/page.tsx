import React from "react";
import Header from "@/components/Header";

const Dashboard = () => {
  return (
    <section className="w-full h-full flex flex-col mt-32"> {/* Added pt-20 to give space for the navbar */}
      <div className="">
        <Header />
      </div>
      {/* More content can go here */}
    </section>
  );
};

export default Dashboard;
