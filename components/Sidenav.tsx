import React from 'react';
import Link from 'next/link';
import { MdDashboard } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { TbShoppingBagHeart } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";

// Side nav hyperlinks elements
type sidenavElems = {
  name: string,
  icon: JSX.Element,
  hyperLink: string
}

const sidenavElements: sidenavElems[] = [
  { name: 'Dashboard', icon: <MdDashboard />, hyperLink: "/Dashboard" },
  { name: 'Shops', icon: <BsShop />, hyperLink: "/Shop" },
  { name: 'Products', icon: <TbShoppingBagHeart />, hyperLink: "/Product" },
];

const userSettingsElems: sidenavElems[] = [
  { name: 'Profile', icon: <FaRegUserCircle />, hyperLink: "#" },
  { name: 'Settings', icon: <IoSettingsOutline />, hyperLink: "#" },
  { name: 'Logout', icon: <HiOutlineLogout />, hyperLink: "#" },
];


const Sidenav = () => {
  return (
    <aside className="fixed top-28 left-0 w-[18rem] h-screen bg-gray-950 z-20">
        <div className="flex flex-col justify-center items-center p-4">
            {/* hyperlinks to app pages */}
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              {
                sidenavElements.map((navLink)=> {
                  return (
                    <Link
                        key={navLink.name}
                        href={navLink.hyperLink}
                        className="flex items-center gap-4 w-full p-6 hover:bg-gray-800 rounded-md transition ease-in-out delay-150 text-slate-200"
                    >
                        <span className="text-lg font-semibold">{navLink.icon}</span>
                        <span className="text-sm font-medium">{navLink.name}</span>
                    </Link>                  
                  )
                })
              }
            </div>
            
            {/* Border between the sections */}
            <div className="border-t border-gray-600 w-full mt-4 mb-4"></div>

            {/* user settings */}
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              {
                userSettingsElems.map((settingItem)=> {
                  return (
                    <Link
                        key={settingItem.name}
                        href={settingItem.hyperLink}
                        className="flex items-center gap-4 w-full p-6 hover:bg-gray-800 rounded-md transition ease-in-out delay-150 text-slate-200"
                    >
                        <span className="text-lg font-semibold">{settingItem.icon}</span>
                        <span className="text-sm font-medium">{settingItem.name}</span>
                    </Link>                  
                  )
                })
              }
            </div>

            {/* Border between the sections */}
            <div className="w-full mt-4 mb-4"></div>

            {/* Reach support */}
            <div className="flex flex-col justify-center items-start gap-2 w-full bg-slate-700 border-gray-400 rounded-xl p-2">
              <div className="flex flex-col justify-center items-start w-full">

                <div className="flex justify-center items-center w-full text-slate-300">
                  <span className="font-semibold font-serif text-center">Shop Yetu admin panel</span>
                </div>

                <div className="flex justify-center items-center w-full text-slate-300 p-2 mt-2">
                  <p>
                    Incase of any technical issues that you might face, you are welcome to reach out to our support team.
                  </p>
                </div>

                <div className="flex justify-center items-center w-full text-slate-300 p-2 mt-2">
                  <button type="button" className='bg-emerald-600 p-3 rounded-xl hover:bg-green-700 transition ease-in-out delay-300'>Reach support</button>
                </div>
              </div>
            </div>

        </div>
    </aside>
  );
};

export default Sidenav;
