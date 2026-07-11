'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Landmark } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useResetPassword } from '@/api/auth';
import { ResetPasswordSchema } from '@/schemas';
import { Field } from './RegisterForm';

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const resetPassword = useResetPassword();
  const [tokenError, setTokenError] = useState(!token ? 'Invalid or missing verification token.' : '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!token) {
      setTokenError('Invalid or missing verification token.');
      return;
    }
    resetPassword.mutate({
      token,
      newPassword: data.password,
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
          <h1 className='text-2xl font-bold mb-1 text-pl-text'>Reset Password</h1>
          <p className='text-sm text-pl-text-secondary'>
            Enter your new password to restore access to your account.
          </p>
        </div>

        {tokenError ? (
          <div className='mb-6 p-4 rounded-lg bg-pl-red-bg border border-pl-red text-center'>
            <p className='text-sm font-medium text-pl-red'>{tokenError}</p>
            <Link href='/forgot-password' className='mt-3 inline-block text-xs font-semibold text-pl-red hover:underline'>
              Request another reset link
            </Link>
          </div>
        ) : null}

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <Field
            placeholder='New Password'
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
            disabled={resetPassword.isPending || !token}
            className='w-full py-3 mt-4 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer bg-pl-blue'
          >
            {resetPassword.isPending ? 'Resetting...' : 'Reset password'}
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

      </div>
    </div>
  );
}
