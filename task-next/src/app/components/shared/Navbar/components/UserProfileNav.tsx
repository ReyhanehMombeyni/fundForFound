"use client";

import { useState } from "react";
import ProfileImage from "./shared/ProfileImage";
import CloseButton from "../../CloseButton";
import { FaCircleUser } from "react-icons/fa6";
import { BsFillArchiveFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { UserProfileProps } from "@/types/users";

const UserProfileNav = ({ user }: UserProfileProps) => {
  const [showModals, setShowModals] = useState<boolean>(false);

  const closeModals: () => void = () => setShowModals(false);

  return (
    <div>
      <div onClick={() => setShowModals(true)}>
        <ProfileImage />
      </div>
      {showModals && (
        <div className="modal modal-open modal-top py-5">
          <div className="modal-box bg-white w-85 absolute top-[-20px] right-0 p-5">
            <div className="flex justify-between items-center pb-2 mx-2 mb-3 border-b border-solid border-gray-100">
              <div className="text-sm flex items-center gap-2">
                <ProfileImage />
                <div>
                  <p className="font-medium">{user?.username}</p>
                  <span className="font-extralight">{user?.email}</span>
                </div>
              </div>
              <div onClick={closeModals}>
                <CloseButton />
              </div>
            </div>
            <div className="text-base text-gray-700">
              <ul className="flex flex-col gap-5 items-start">
                <li className="flex items-center justify-start gap-5">
                  <span className="text-2xl text-gray-400">
                    <FaCircleUser />
                  </span>
                  <p>My profile</p>
                </li>
                <li>
                  <div className="flex items-center justify-start gap-5">
                    <span className="text-2xl text-gray-400">
                      <BsFillArchiveFill />
                    </span>
                    <p>My brands and organisations</p>
                    <span className="text-3xl text-gray-400">
                      <IoAddCircleOutline />
                    </span>
                  </div>
                  <ul className="pl-10 pt-3">
                    <li className="flex gap-2 items-center text-sm">
                      <span className="px-1 bg-blue-800 rounded-full text-blue-400">
                        W
                      </span>
                      <p>brand name</p>
                    </li>
                  </ul>
                </li>
                <li className="flex items-center justify-start gap-5">
                  <span className="text-2xl text-gray-400">
                    <IoSettingsSharp />
                  </span>
                  <p>Setting</p>
                </li>
                <li>
                  <Link
                    href="/auth/logOut"
                    className="flex items-center justify-start gap-5"
                  >
                    <span className="text-2xl text-gray-400">
                      <TbLogout />
                    </span>
                    <p>Log out</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileNav;
