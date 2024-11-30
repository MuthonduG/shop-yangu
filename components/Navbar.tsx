import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UserProfile from "@/public/assets/user.png";
import { FaOpencart } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";

type NavbarProps = {
  toggleSidenav: () => void;
};

type PopupElems = {
  name: string;
  icon: JSX.Element;
};

const popupElements: PopupElems[] = [
  { name: "Profile", icon: <FaRegUserCircle /> },
  { name: "Settings", icon: <IoSettingsOutline /> },
  { name: "Logout", icon: <HiOutlineLogout /> },
];

const Navbar = ({ toggleSidenav }: NavbarProps) => {
  const [isPop, setIsPopup] = useState<Boolean>(false);

  return (
    <nav className="fixed top-0 left-0 p-5 w-screen flex justify-between items-center bg-gray-950 text-slate-200 z-10">
      <div className="flex p-4 justify-center items-center">
        <button onClick={toggleSidenav} className="flex items-center gap-4">
          <FaOpencart className="text-5xl" />
          <span className="font-serif font-semibold italic text-xl">
            Shop Yangu
          </span>
        </button>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <Image
            src={UserProfile}
            alt="profile"
            className="object-cover hover:cursor-pointer"
            width={50}
            height={50}
            onClick={() => setIsPopup(!isPop)}
          />
        </div>
        {isPop && (
          <div className="absolute top-24 right-5 w-[10rem] h-auto rounded-xl bg-white text-black shadow-lg p-4 border">
            <div className="flex flex-col justify-center items-start gap-2">
              {popupElements.map((popItem) => {
                return (
                  <Link
                    key={popItem.name}
                    href="#"
                    className="flex items-center gap-4 w-full p-2 hover:bg-gray-100 rounded-md transition ease-in-out delay-150"
                  >
                    <span className="text-lg font-semibold">{popItem.icon}</span>
                    <span className="text-sm font-medium">{popItem.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
