"use client";

import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar/Navbar";
import Stepper from "./components/Stepper";
import { PostFormProvider } from "./context/context";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <PostFormProvider>
        <Stepper />
        {children}
      </PostFormProvider>
      <Footer />
    </>
  );
};

export default layout;
