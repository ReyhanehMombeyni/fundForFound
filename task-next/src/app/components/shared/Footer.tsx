"use client";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const Footer = () => {
  return (
    <div className="bg-[#F5F5F5] text-gray-600">
      <div className="py-10 px-40 flex gap-30 items-start justify-start">
        <div>
          <h1 className="font-medium pb-5">ABOUT</h1>
          <ul className="flex flex-col gap-2 text-sm">
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
          <h1 className="font-medium pb-5">RESOURSES</h1>
          <ul className="flex flex-col gap-2 text-sm">
            <li>Blog</li>
            <li>How 3F works</li>
            <li>Help & support</li>
          </ul>
        </div>
        <div>
          <h1 className="font-medium pb-5">CONTRIBUTING</h1>
          <ul className="flex flex-col gap-2 text-sm">
            <li>Brand & Organizations</li>
            <li>Pricing</li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-solid border-gray-200 p-5 flex justify-evenly items-center">
        <div className="bg-white px-5">
            English
        </div>
        <div>
            <ul className="flex gap-5 items-center text-sm font-light">
                <li>Trust & safety</li>
                <li>Terms of use</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <ul className="flex gap-2 items-center">
                <li><FaTwitter /></li>
                <li><FaGithub /></li>
                <li><FaDiscord /></li>
                <li><FaLinkedin /></li>
                <li><MdEmail /></li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
