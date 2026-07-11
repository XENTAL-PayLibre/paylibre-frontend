'use client';

import Link from 'next/link';
import { Landmark } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLogin } from '@/api/auth';
import { LoginSchema } from '@/schemas';
import { Field } from './RegisterForm';

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login.mutate({
      email: data.officialEmail,
      password: data.password,
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-10 px-4 bg-pl-bg'>
      <div className='bg-white rounded-2xl w-full max-w-md p-8 border border-pl-border'>
        {/* Header Section */}
        <div className='mb-8 text-center'>
          <div className='flex justify-center mb-6'>
            <div className='flex items-center gap-2'>
              <Landmark className='w-6 h-6 text-pl-blue' />
              <span className='font-bold text-base text-pl-blue'>PayLibre</span>
            </div>
          </div>
          <h1 className='text-2xl font-bold mb-1 text-pl-text'>Welcome back</h1>
          <p className='text-sm text-pl-text-secondary'>
            Sign in to manage your school&apos;s finances.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <Field
            placeholder='Official Email'
            type='email'
            error={errors.officialEmail?.message}
            registration={register('officialEmail')}
          />
          <div>
            <Field
              placeholder='Password'
              type='password'
              error={errors.password?.message}
              registration={register('password')}
            />
            <div className='flex justify-end mt-1.5'>
              <Link href='/forgot-password' className='text-sm font-medium text-pl-blue hover:underline'>
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type='submit'
            disabled={login.isPending}
            className='w-full py-3 mt-4 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer bg-pl-blue'
          >
            {login.isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Footer */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-pl-text-secondary'>
            Don&apos;t have a school account?{' '}
            <Link href='/register' className='text-pl-blue hover:underline'>
              Register your school
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
