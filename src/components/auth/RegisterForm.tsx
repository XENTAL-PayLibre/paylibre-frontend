'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Landmark, Eye, EyeOff } from 'lucide-react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSignup } from '@/api/auth';
import { SignupSchema } from '@/schemas';

type SignupFormData = z.infer<typeof SignupSchema>;

export function Field({
  placeholder,
  type = 'text',
  hint,
  error,
  registration,
}: {
  placeholder: string;
  type?: string;
  hint?: string;
  error?: string;
  registration: UseFormRegisterReturn;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  const currentType = isPassword ? (show ? 'text' : 'password') : type;

  return (
    <div className='flex flex-col gap-1.5 animate-fade-in'>
      <div className='relative'>
        <input
          type={currentType}
          placeholder=" "
          className={`peer border rounded-lg text-base px-3 pt-5 pb-1.5 outline-none w-full transition-all duration-200 text-foreground
                     ${isPassword && !show ? 'tracking-widest' : ''}
                     ${isPassword ? 'pr-10' : ''}
                     ${error ? 'border-pl-red' : 'border-pl-border focus:border-pl-blue'}`}
          {...registration}
        />
        <label
          className='absolute left-3 top-3 text-base transition-all duration-200 origin-top-left pointer-events-none text-pl-text-secondary
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                     peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-pl-blue
                     peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-2.5'
        >
          {placeholder}
        </label>
        {isPassword && (
          <button
            type='button'
            onClick={() => setShow((prev) => !prev)}
            className='absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 outline-none flex items-center justify-center cursor-pointer'
          >
            {show ? (
              <EyeOff className='w-4 h-4' />
            ) : (
              <Eye className='w-4 h-4' />
            )}
          </button>
        )}
      </div>
      {error ? (
        <p className='text-xs text-pl-red'>{error}</p>
      ) : (
        hint && (
          <p className='text-xs animate-fade-in text-pl-text-secondary'>
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export default function RegisterForm() {
  const signup = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    const { confirmPassword, ...payload } = data;
    signup.mutate(payload);
  };

  return (
    <div className='min-h-screen flex items-start justify-center py-10 px-4 bg-pl-bg'>
      <div className='bg-white rounded-2xl w-full max-w-135 p-8 border border-pl-border'>
        {/* Header Section */}
        <div className='mb-8 text-center'>
          <div className='flex justify-center mb-6'>
            <div className='flex items-center gap-2 animate-pulse-subtle'>
              <Landmark className='w-6 h-6 text-pl-blue' />
              <span className='font-bold text-base text-pl-blue'>PayLibre</span>
            </div>
          </div>
          <h1 className='text-2xl font-bold mb-1 text-pl-text'>
            Register your school
          </h1>
          <p className='text-sm text-pl-text-secondary'>
            Enter your institution&apos;s details to streamline your education
            finance.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <Field
            placeholder='School Name'
            error={errors.schoolName?.message}
            registration={register('schoolName')}
          />
          <div className='grid grid-cols-2 gap-3'>
            <Field
              placeholder='Official Email'
              type='email'
              error={errors.officialEmail?.message}
              registration={register('officialEmail')}
            />
            <Field
              placeholder='Phone Number'
              type='tel'
              error={errors.phone?.message}
              registration={register('phone')}
            />
          </div>
          <Field
            placeholder='Create Password'
            type='password'
            hint='Must be at least 8 characters with a number and symbol'
            error={errors.password?.message}
            registration={register('password')}
          />
          <Field
            placeholder='Confirm Password'
            type='password'
            error={errors.confirmPassword?.message}
            registration={register('confirmPassword')}
          />

          <button
            type='submit'
            disabled={signup.isPending}
            className='w-full py-3 mt-4 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer bg-pl-blue animate-fade-in'
          >
            {signup.isPending ? 'Creating Account...' : 'Create My Account'}
          </button>
        </form>

        {/* Footer */}
        <div className='mt-5 text-center'>
          <p className='text-xs text-pl-text-secondary'>
            By creating an account, you agree to our{' '}
            <a href='#' className='text-pl-blue'>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href='#' className='text-pl-blue'>
              Privacy Policy
            </a>
            .
          </p>
          <p className='text-xs mt-2 text-pl-text-secondary'>
            Already have a PayLibre account?{' '}
            <Link href='/login' className='text-pl-blue'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
