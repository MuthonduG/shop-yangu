import React from "react";
import Chartcomponent from "@/components/Chartcomponent";
import Tablecomponent from "@/components/Tablecomponent";
import { MdDoubleArrow } from "react-icons/md";

type TableRow = {
  id: number;
  name: string;
  email: string;
  status: string;
  joined: string;
};

const Analytics = () => {
  const tableData: TableRow[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      status: "Active",
      joined: "2023-11-01",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      status: "Inactive",
      joined: "2023-10-15",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      status: "Active",
      joined: "2023-09-22",
    },
    {
      id: 4,
      name: "Diana Prince",
      email: "diana.prince@example.com",
      status: "Pending",
      joined: "2023-11-20",
    },
    {
      id: 5,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      status: "Active",
      joined: "2023-11-01",
    },
    {
      id: 6,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      status: "Inactive",
      joined: "2023-10-15",
    },
    {
      id: 7,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      status: "Active",
      joined: "2023-09-22",
    },
    {
      id: 8,
      name: "Diana Prince",
      email: "diana.prince@example.com",
      status: "Pending",
      joined: "2023-11-20",
    }
  ];

  const tableColumns: { key: keyof TableRow; header: string }[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "status", header: "Status" },
    { key: "joined", header: "Joined Date" },
  ];

  return (
    <section className="p-2">
      <div className="grid xl:grid-cols-2 md:grid-cols-2 justify-center items-center p-4 gap-5">
        {/* Chart Component */}
        <article className="shadow-md rounded-lg bg-white border border-gray-300 flex items-center justify-center p-5">
          <Chartcomponent />
        </article>
        {/* Table Component */}
        <article className="shadow-md rounded-lg bg-white border border-gray-300 flex flex-col items-center justify-center p-5">
          <div className="p-3 flex justify-between items-cente w-full">
            <span className="text-left font-serif text-xl">Available Products</span>
            <MdDoubleArrow className="text-right" />
          </div>
          <Tablecomponent columns={tableColumns} data={tableData} />
        </article>
      </div>
    </section>
  );
};

export default Analytics;
