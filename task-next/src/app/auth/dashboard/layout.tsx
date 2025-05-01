"use client";

import Footer from "@/app/components/shared/Footer";
import Navbar from "@/app/components/shared/Navbar/Navbar";

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
