"use client";

import React, { useEffect, useState } from "react";
import { IoSearchOutline, IoMenu } from "react-icons/io5";
import Modal from "./Modal";
import UserProfileNav from "./UserProfileNav";
import CloseButton from "../../CloseButton";
import { userProfile } from "@/types/users";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RightNavbar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<userProfile | null>(null);
  const [hidden, setHidden] = useState<boolean>(false);
  const pathname = usePathname();
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (pathname.includes("/auth")) {
        setHidden(true);
      } else {
        setHidden(false);
        try {
          const res = await fetch("/api/user", {
            credentials: "include",
          });
          const data = await res.json();
          const { isLoggedInInfo, userInfo } = data;
          if (isLoggedInInfo) {
            setIsLoggedIn(true);
            setUser(userInfo);
          }
        } catch (err) {
          console.error("LogIn Failed.", err);
        }
      }
    };

    checkLoginStatus();
  }, [pathname]);

  return (
    <div>
      <div className="flex items-center gap-4 justify-end max-md:hidden">
        <div className="relative w-[60%]">
          <IoSearchOutline className="absolute z-1 top-1/2 left-1.5 -translate-y-1/2 text-gray-400 text-2xl" />
          <input
            type="text"
            className="input w-full bg-white shadow-sm focus:shadow placeholder:text-gray-400 pl-8 focus:z-0 text-gray-600"
            placeholder="Search brand, category, tag or ..."
          />
        </div>
        <div className={hidden ? "hidden" : ""}>
          {isLoggedIn ? (
            <UserProfileNav user={user} />
          ) : (
            <Link
              href="/auth/signUp"
              className="btn px-5 rounded-lg btn-primary text-md"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5 justify-end text-2xl text-gray-900 md:hidden">
        <IoSearchOutline />
        <div className={hidden ? "hidden" : ""}>
          {isLoggedIn && (
            <UserProfileNav user={user} />
          )}
        </div>
        <div
          className="dropdown dropdown-end"
          onClick={() => setShowModal(!showModal)}
        >
          {showModal ? <CloseButton /> : <IoMenu />}
        </div>
      </div>
      {showModal && <Modal />}
    </div>
  );
};

export default RightNavbar;
