'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { LoginResponse, userLogin } from '@/types/users';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import GoogleButton from '@/app/components/shared/GoogleButton';

const schema= yup.object({
    identifier: yup.string().required().min(3),
    password: yup.string().required().min(6).max(12),

})

const FormLogin = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: {errors} }= useForm<userLogin>({
    resolver: yupResolver(schema),
    mode:'onChange'
  });
  const { mutate }= useMutation<LoginResponse, Error , userLogin>({
    mutationFn: async (user: userLogin) => {
      const res= await fetch("/api/auth/logIn", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      if (!res.ok) {
        throw new Error('Login is not ok.');
      }
      return res.json();
    },
    onSuccess: () => {
      router.push('/auth/dashboard');
    },
    onError: (error) => {
      console.error('Login failed', error);
    }
  })

  const formSubmit = async(user: userLogin) => {
    mutate(user);
  }

  return (
    <div>
      <GoogleButton />
      <div className='py-10 text-gray-500'>
        -------------------- or --------------------
      </div>
      <div className="w-80">
        <form onSubmit={handleSubmit(formSubmit)} action="" className='flex flex-col gap-5'>
          <div className='flex flex-col items-start gap-1 text-gray-800 font-medium'>
            <label className='pl-1'>Username Or Email</label>
            <input {...register("identifier")} type='text' className='input input-primary bg-white' />
            {errors.identifier && <div className='text-error font-light'>{errors.identifier.message}</div>}
          </div>
          <div className='flex flex-col items-start gap-1 text-gray-800 font-medium'>
          <label className='pl-1'>password</label>
            <input {...register("password")} type='password' className='input input-primary bg-white' />
            {errors.password && <div className='text-error font-light'>{errors.password.message}</div>}
            <div className='font-light text-sm text-blue-600'>
              forget password?
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>Continue</button>
        </form>
        <div className='text-left'>create an <Link href="/auth/signUp" className='text-blue-700'>account?</Link></div>
      </div>
    </div>
  )
}

export default FormLogin