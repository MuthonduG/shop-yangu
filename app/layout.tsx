"use client";

import React, { useState } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidenav from "@/components/Sidenav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);

  const toggleSidenav = () => {
    setIsSideNavVisible((prev) => !prev);
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar toggleSidenav={toggleSidenav} />
        <div className="flex h-screen">
          {isSideNavVisible && <Sidenav />}
          <main
            className={`transition-all duration-300 ${
              isSideNavVisible ? "w-full": "w-[calc(100%-250px)]"
            }`}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
