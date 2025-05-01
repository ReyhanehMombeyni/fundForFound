"use client";

import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar/Navbar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default layout;
