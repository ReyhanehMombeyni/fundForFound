"use client";

import { HiOutlineMinus } from "react-icons/hi";

const Stepper = () => {
  return (
    <div className="flex items-center justify-center h-20 shadow-xl mt-4 px-10">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm transition-all bg-purple-600 text-white">
            1
        </div>
        <div className="flex items-center">
            <HiOutlineMinus className="size-10 text-gray-200" />
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm transition-all bg-gray-200 text-gray-400">
                2
            </div>
        </div>
        <div className="flex items-center">
            <HiOutlineMinus className="size-10 text-gray-200" />
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm transition-all bg-gray-200 text-gray-400">
                3
            </div>
        </div>
        <div className="flex items-center">
            <HiOutlineMinus className="size-10 text-gray-200" />
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm transition-all bg-gray-200 text-gray-400">
                4
            </div>
        </div>
    </div>
  );
};

export default Stepper;
