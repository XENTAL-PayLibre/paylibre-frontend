'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Landmark, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForgotPassword } from '@/api/auth';
import { ForgotPasswordSchema } from '@/schemas';
import { Field } from './RegisterForm';

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const requestReset = useForgotPassword();
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    setSubmittedEmail(data.email);
    requestReset.mutate({
      email: data.email,
    });
  };

  const isSuccess = requestReset.isSuccess;

  return (
    <div className='min-h-screen flex items-center justify-center py-10 px-4 bg-pl-bg'>
      <div className='bg-white rounded-2xl w-full max-w-md p-8 border border-pl-border'>

        {isSuccess ? (
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Landmark className="w-6 h-6 text-pl-blue" />
                <span className="font-bold text-base text-pl-blue">PayLibre</span>
              </div>
            </div>

            {/* Email Icon wrapper */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-full p-4 bg-pl-blue-light">
                <Mail size={40} className="text-pl-blue" strokeWidth={1.5} />
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-2 text-pl-text">Check your email</h1>
            <p className="text-sm text-pl-text-secondary mb-8">
              We have emailed a password reset link to <span className="font-medium text-pl-text">{submittedEmail}</span>.
            </p>

            <Link
              href="/login"
              className="inline-block w-full py-3 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 bg-pl-blue cursor-pointer"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className='mb-8 text-center'>
              <div className='flex justify-center mb-6'>
                <div className='flex items-center gap-2'>
                  <Landmark className='w-6 h-6 text-pl-blue' />
                  <span className='font-bold text-base text-pl-blue'>PayLibre</span>
                </div>
              </div>
              <h1 className='text-2xl font-bold mb-1 text-pl-text'>Forgot Password</h1>
              <p className='text-sm text-pl-text-secondary'>
                Enter your official school email to receive a password reset link.
              </p>
            </div>

            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              <Field
                placeholder='Official Email'
                type='email'
                error={errors.email?.message}
                registration={register('email')}
              />

              <button
                type='submit'
                disabled={requestReset.isPending}
                className='w-full py-3 mt-4 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer bg-pl-blue'
              >
                {requestReset.isPending ? 'Sending...' : 'Send reset link'}
              </button>
            </form>

            {/* Footer */}
            <div className='mt-6 text-center'>
              <p className='text-sm text-pl-text-secondary'>
                Remembered your password?{' '}
                <Link href='/login' className='text-pl-blue hover:underline font-medium'>
                  Back to sign in
                </Link>
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
