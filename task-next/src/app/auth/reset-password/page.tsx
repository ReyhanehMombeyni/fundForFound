"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { env } from "../../../../lib/env";
import { useEffect, useState } from "react";
import FundTitrComp from "@/app/components/shared/FundTitrComp";
import { ResetPasswordForm } from "@/types/users";
import { useSearchParams } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";

const schema = yup.object({
  password: yup.string().required().min(6).max(8),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});
const ResetPassword = () => {

  const [MessageSuccess, setMessageSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [code, setCode] = useState<string | null>(null); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setCode(params.get("code"));
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const submitForm = async ({
    password,
    passwordConfirmation,
  }: ResetPasswordForm) => {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          password,
          passwordConfirmation,
        }),
      }
    );
    const data = await res.json();

    if (res.ok) {
      setMessageSuccess("Password Changed.");
      setError("");
    } else {
      setError(data?.error?.message || "Error change password.");
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
          <label className="pl-1">Password</label>
          <div className="relative w-full">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="input input-primary bg-white pr-10"
              placeholder="your password"
            />
            <span
              className="absolute right-3 top-3 z-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
          {errors.password && (
            <div className="text-error font-light">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 text-gray-800 pb-5">
          <label className="pl-1">Password Confirmation</label>
          <div className="relative w-full">
            <input
              {...register("passwordConfirmation")}
              type={showPassword ? "text" : "password"}
              className="input input-primary bg-white pr-10"
              placeholder="your password"
            />
            <span
              className="absolute right-3 top-3 z-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
          {errors.passwordConfirmation && (
            <div className="text-error font-light">
              {errors.passwordConfirmation.message}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          send
        </button>
        {MessageSuccess && (
          <div className="flex gap-3 items-center pb-10 pl-3 pt-2">
            <p className="text-green-600 text-left">
              {MessageSuccess}
            </p>
            <Link href="/auth/logIn" className="font-normal text-sm text-blue-500">Go to Login</Link>
          </div>
        )}
        {error && (
          <p className="pb-10 pl-3 pt-2 text-error text-left">{error}</p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
