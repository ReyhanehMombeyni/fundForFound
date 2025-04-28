import { menuNavbar } from "@/utils/constants";
import Button from "../../Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { itemMenuNavbar } from "@/types";

const Modal = () => {
  const showMenuNavbar = (item: itemMenuNavbar): React.ReactNode => {
    switch (item.text) {
      case "Home":
        return <div className="flex items-center justify-between">
          <Link href={item.href}>{item.text}</Link>
          <AiOutlineArrowRight className="text-2xl font-extrabold" />
        </div>;
      case "Explore":
        return <div className="flex items-center justify-between">
          <Link href={item.href}>{item.text}</Link>
          <AiOutlineArrowRight className="text-2xl font-extrabold" />
        </div>;
      default:
        return <Link href={item.href}>{item.text}</Link>;
    }
  };
  return (
    <div className="mt-18 modal modal-open modal-top md:hidden">
      <div className="rounded-b-3xl modal-box w-screen bg-white">
        <ul className="space-y-5 mx-10 mb-10  text-primary text-xl font-semibold">
          {menuNavbar.map((item) => (
            <li key={item.text}>{showMenuNavbar(item)}</li>
          ))}
        </ul>
        <div className="mt-5 w-full flex flex-col gap-2">
          <Button btnType={2} text="Login/Signup" />
          <Button btnType={1} text="Start" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
