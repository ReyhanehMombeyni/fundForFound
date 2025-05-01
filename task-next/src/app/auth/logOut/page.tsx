"use client";

import { useRouter } from "next/navigation";
import Loader from "./loader";
import { useEffect } from "react";

const LogoutButton = () => {
  const router = useRouter();

  useEffect(()=>{
    const handleLogout = async () => {
        try {
          const res = await fetch("/api/auth/logOut", {
            method: "POST",
            credentials: "include",
          });
          if (!res.ok) {
            throw new Error("Failed to logout");
          }
          router.push("/auth/logIn");
        } catch (error) {
          console.log(error); 
        } 
      };
      handleLogout();
  },[router])

  return (
    <div><Loader /></div>
  );
};

export default LogoutButton;
