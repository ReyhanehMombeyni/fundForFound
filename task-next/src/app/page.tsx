'use client';

import Image from "next/image";
import verctor from "../../public/Navbar/Vector.svg";
import Link from "next/link";
import Navbar from "./components/shared/Navbar/Navbar";
import Footer from "./components/shared/Footer";

export default function Home() {

  return (
    <>
      <Navbar />
      <div className="text-gray-500 px-10 pt-20 pb-30 flex flex-col items-center text-center max-md:text-left max-sm:px-5">
        <h1 className="text-2xl text-purple-800 font-semibold pb-5">
          Create your profile and tale the first step towards new opportunities
        </h1>
        <p className="max-w-200 max-md:text-sm">
          By creating your account, you will again access to a thriving community
          where brands and individuals are committed to offering you ongoing
          support. This support network will empower you with the resources,
          quidance, and connections you need to succeed, ensuring that you are
          never alone on your journey.
        </p>
        <div className="mt-20 border-1 border-solid border-purple-500 rounded-2xl p-10 flex flex-col items-center">
          <div>
          <Image src={verctor} alt="Logo" />
          </div>
          <div className="py-15">
            <h2 className="text-2xl text-purple-800 pb-3">Brand or organization</h2>
            <p className="max-w-60 text-start text-sm text-gray-400">
              if your brand is established and you are looking for continuous
              support, get started now.
            </p>
          </div>
          <div className="flex flex-col text-center gap-2 w-full">
            <Link href="/home/basic-info" className="btn px-5 rounded-lg btn-primary">Start</Link>
            <button className="text-purple-500 cursor-pointer">Learn more</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
