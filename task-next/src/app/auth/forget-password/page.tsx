"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { env } from "../../../../lib/env";
import { useState } from "react";
import FundTitrComp from "@/app/components/shared/FundTitrComp";
import { ForgotPasswordForm } from "@/types/users";

const schema = yup.object({
  email: yup.string().required().email(),
});
const ForgetPassword = () => {
  const [MessageSuccess, setMessageSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const submitForm = async ({ email }: ForgotPasswordForm) => {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    const data = await res.json();

    if (res.ok) {
      setMessageSuccess("Password reset email sent.");
  } else {
      setError(data?.error?.message || "Error sending reset email.");
  }
  };

  return (
    <div className="flex flex-col items-center py-10 min-h-screen">
      <FundTitrComp />
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-80 flex flex-col pt-10 font-medium"
      >
        <div className="flex flex-col items-start gap-1 text-gray-800 py-5">
          <label className="pl-1">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="youremail@gmail.com"
            className="input input-primary bg-white"
          />
          {errors.email && (
            <div className="text-error font-light">{errors.email.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">send</button>
        {MessageSuccess && (
          <div className="pb-10 pl-3 pt-2 text-green-600 text-left">
            {MessageSuccess}
          </div>
        )}
        {error && (
          <div className="pb-10 pl-3 pt-2 text-error text-left">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgetPassword;
