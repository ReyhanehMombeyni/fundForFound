"use client";

import BrandForm from "./components/BrandForm";

const BasicInfo = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="grid py-15 max-w-200 px-5 text-left">
        <h1 className="text-3xl font-semibold text-primary">Basic info</h1>
        <p className="font-bold text-xl py-2">
          Tell about your Brand/organization
        </p>
        <span className="text-gray-500 text-sm leading-4">
          Provide an overview of the brand or organization you want to register
          on 3F.
        </span>
        <BrandForm />
      </div>
    </div>
  );
};

export default BasicInfo;
