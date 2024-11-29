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
          {/* Sidenav - conditionally rendered */}
          <div
            className={`fixed top-0 left-0 z-10 transition-all duration-300 ${
              isSideNavVisible ? "w-64" : "w-0"
            }`}
          >
            {isSideNavVisible && <Sidenav />}
          </div>

          {/* Main content area */}
          <main
            className={`transition-all duration-300 w-full h-full ml-0 ${
              isSideNavVisible ? "pl-72" : "pl-0"
            }`} // Adjust main content width based on sidenav visibility
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
