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
        {isSideNavVisible && <Sidenav />}
        {children}
      </body>
    </html>
  );
}
