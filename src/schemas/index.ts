import { z } from 'zod';

export const SignupSchema = z.object({
  schoolName: z.string().min(1, { message: 'School Name is required' }),
  officialEmail: z.string().min(1, { message: 'Official Email is required' }).email({
    message: 'Invalid email address',
  }),
  phone: z.string().min(1, { message: 'Phone number is required' }).regex(/^\d+$/, {
    message: 'Phone number must contain only digits',
  }),
  settlementBankName: z.string().min(1, { message: 'Bank Name is required' }),
  settlementAccountNumber: z.string().length(10, { message: 'Account Number must be 10 digits' }).regex(/^\d+$/, {
    message: 'Account Number must contain only digits',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[0-9]/, { message: 'Must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Must contain at least one special character' }),
  confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const LoginSchema = z.object({
  officialEmail: z.string().min(1, { message: 'Official Email is required' }).email({
    message: 'Invalid email address',
  }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const LoginOtpSchema = z.object({
  code: z
    .string()
    .length(6, { message: 'Code must be exactly 6 digits' })
    .regex(/^\d+$/, { message: 'Code must contain only digits' }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, { message: 'Official Email is required' }).email({
    message: 'Invalid email address',
  }),
});

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[0-9]/, { message: 'Must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Must contain at least one special character' }),
  confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
