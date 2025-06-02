"use client";

import { usePostForm } from "@/app/home/context/context";
import Image from "next/image";
import approveImage from "@/../public/approve/approve.svg";
import { useEffect } from "react";

const Approve = () => {
  const { state } = usePostForm();
  useEffect(()=> {
    const postData= async() => {
      try {
        const res= await fetch("/api/brand/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(state),
            })
            const data = await res.json();
            console.log(data)
            
            // if(data.status===200) {
              // router.push("/home/detailed-info")
              //}
      } catch (error) {
        console.log(error);
      }
    }
    postData();
  },[])

  return (
    <div className="flex flex-col items-center text-center">
      <div className="py-15 max-w-200 px-5">
        <h1 className="text-3xl font-semibold text-primary">Waiting to apprve</h1>
        <Image src={approveImage} alt="approve image" className="block mx-auto py-10" />
        <p className="font-semibold text-2xl py-2 text-gray-700">You Will be notified as soon as it is approved</p>
        <span className="text-gray-500 text-sm">
          Your information is under review and will be confirmed wiwthin 2 to 5
          business days.
        </span>
      </div>
    </div>
  );
};

export default Approve;
