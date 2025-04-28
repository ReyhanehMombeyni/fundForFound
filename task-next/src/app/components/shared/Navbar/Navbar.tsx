"use client";
import { useState } from "react";
import Image from "next/image";
import verctor from "../../../../../public/Navbar/Vector.svg";
import Button from "../Button";
import { IoSearchOutline, IoMenu } from "react-icons/io5";
import Modal from "./components/Modal";
import UserProfileNav from "./components/UserProfileNav";
import CloseButton from "../CloseButton";
import { menuNavbar } from "@/utils/constants";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
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
          <div className="flex items-center gap-4 justify-end max-md:hidden">
            <div className="relative w-[60%]">
              <IoSearchOutline className="absolute z-1 top-1/2 left-1.5 -translate-y-1/2 text-gray-400 text-2xl" />
              <input
                type="text"
                className="input w-full bg-white shadow-sm focus:shadow placeholder:text-gray-400 pl-8 focus:z-0 text-gray-600"
                placeholder="Search brand, category, tag or ..."
              />
            </div>
            <Button btnType={1} text="Sign in" />
          </div>
          <div className="flex items-center gap-5 justify-end text-2xl text-gray-900 md:hidden">
            <IoSearchOutline />
            <UserProfileNav profileType={1} />
            <div
              className="dropdown dropdown-end"
              onClick={() => setShowModal(!showModal)}
            >
              {showModal ? <CloseButton /> : <IoMenu />}
            </div>
          </div>
        </div>
      </nav>
      {
        showModal && <Modal />
      }
    </>
  );
};

export default Navbar;
