"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { env } from "@/../lib/env";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSignup } from "@/types/users";
import { useMutation } from "@tanstack/react-query";
import GoogleButton from "@/app/components/shared/GoogleButton";
import { useState } from "react";

const schema = yup.object({
  username: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(12),
});

const FormSignup = () => {
  const [isSuccess, setIsSuccess]= useState<boolean>(false)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { mutate } = useMutation<void, AxiosError , userSignup>({
    mutationFn: async (user) => {
      await axios.post(
        `${env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
        user
      );
    },
    onSuccess: () => {
      setIsSuccess(true)
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  const formSubmit = async (user: userSignup) => {
    mutate(user);
  };

  return (
    <div className="pb-20">
      <GoogleButton />
      <div className="py-10">-------------------- or --------------------</div>
      <div className="w-80">
        <form
          onSubmit={handleSubmit(formSubmit)}
          action=""
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col items-start gap-1 text-gray-800 font-medium">
            <label className="pl-1">username</label>
            <input
              {...register("username")}
              type="text"
              className="input input-primary bg-white"
            />
            {errors.username && <div className='text-error font-light'>{errors.username.message}</div>}
          </div>
          <div className="flex flex-col items-start gap-1 text-gray-800 font-medium">
            <label className="pl-1">email</label>
            <input
              {...register("email")}
              type="email"
              className="input input-primary bg-white"
            />
            {errors.email && <div className='text-error font-light'>{errors.email.message}</div>}
          </div>
          <div className="flex flex-col items-start gap-1 text-gray-800 font-medium">
            <label className="pl-1">password</label>
            <input
              {...register("password")}
              type="password"
              className="input input-primary bg-white"
            />
            {errors.password && <div className='text-error font-light'>{errors.password.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          {
            isSuccess && <p className="text-success">Go to your email inbox and confirm.</p>
          }
        </form>
      </div>
    </div>
  );
};

export default FormSignup;
