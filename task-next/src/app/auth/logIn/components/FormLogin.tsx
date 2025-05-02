"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { LoginResponse, userLogin } from "@/types/users";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import GoogleButton from "@/app/components/shared/GoogleButton";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const schema = yup.object({
  identifier: yup.string().required().min(3),
  password: yup.string().required().min(6).max(12),
});

const FormLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLogin>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate, isError } = useMutation<LoginResponse, Error, userLogin>({
    mutationFn: async (user: userLogin) => {
      const res = await fetch("/api/auth/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login Failed.");
      }

      return res.json();
    },
    onSuccess: () => {
      router.push("/auth/dashboard");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const formSubmit = async (user: userLogin) => {
    mutate(user);
  };

  return (
    <div className="pb-20">
      <GoogleButton />
      <div className="py-10 text-gray-500">
        -------------------- or --------------------
      </div>
      <div className="w-80">
        <form
          onSubmit={handleSubmit(formSubmit)}
          action=""
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col items-start gap-1 text-gray-800 font-medium">
            <label className="pl-1">Username Or Email</label>
            <input
              {...register("identifier")}
              type="text"
              className="input input-primary bg-white"
            />
            {errors.identifier && (
              <div className="text-error font-light">
                {errors.identifier.message}
              </div>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 text-gray-800 font-medium">
            <label className="pl-1">password</label>
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
            <div className="font-light text-sm text-blue-600">
              <Link href="/auth/forget-password">forget password?</Link>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Continue
          </button>
        </form>
        <div className="text-md pt-5">
          <p>Do not have one?</p>
          <Link href="/auth/signUp" className="text-blue-700">
            Create an account.
          </Link>
        </div>
        {isError && <div className="text-error py-3 text-left">{error}</div>}
      </div>
    </div>
  );
};

export default FormLogin;
