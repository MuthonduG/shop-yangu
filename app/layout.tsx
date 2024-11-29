import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidenav from "@/components/Sidenav";

export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <Sidenav/>
        {children}
      </body>
    </html>
  );
}
