import Button from "../../Button";
import { AiOutlineArrowRight } from "react-icons/ai";

const Modal = () => {
  return ( 
    <div className="mt-18 modal modal-open modal-top md:hidden">
      <div className="rounded-b-3xl modal-box w-screen bg-white">
        <ul className="space-y-5 mx-10 mb-10  text-primary text-xl font-semibold">
          <li className="flex items-center justify-between">
            <p>
            Home
            </p>
            <AiOutlineArrowRight className="text-2xl font-extrabold" />
          </li>
          <li className="flex items-center justify-between">
            <p>
                Explore
            </p>
            <AiOutlineArrowRight className="text-2xl font-extrabold" />
          </li>
          <li>
            About us
          </li>
          <li>
            Help & Support
          </li>
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
