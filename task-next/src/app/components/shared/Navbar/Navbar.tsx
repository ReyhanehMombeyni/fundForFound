'use client'
import Image from "next/image";
import verctor from "../../../../../public/Navbar/Vector.svg";
import { menuNavbar } from "@/utils/constants";
import Link from "next/link";
import RightNavbar from "./components/RightNavbar";

const Navbar = () => {
    
  return (
    <>
      <nav className="navbar shadow-sm grid grid-cols-12 items-center text-gray-600 px-20 py-3 max-lg:px-15 max-md:px-10">
        <div className="col-span-2 max-lg:col-span-1 max-md:col-span-6">
          <Image src={verctor} alt="Logo" />
        </div>
        <div className="col-span-6 pr-15 max-lg:pr-5 max-lg:col-span-7 max-md:hidden">
          <ul className="flex justify-end gap-5 font-medium">
            {
              menuNavbar.map(item => (<li key={item.text}>
                <Link href={item.href}>{item.text}</Link>
              </li>))
            }
          </ul>
        </div>
        <div className="col-span-4 max-md:col-span-6">
          <RightNavbar />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
