'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { postRequest, getRequest, resetAuthRefreshState } from '@/lib/http';
import { markSession, clearAuthCookies } from '@/lib/get-token';
import { API_ENDPOINTS } from './api-endpoints';
import type {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginChallengeResponse,
  VerifyOtpPayload,
  LoginResponse,
  UserMeResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from './types/auth';

// ── Shared helpers ─────────────────────────────────────────────────────────

function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong',
  statusMap?: Record<number, string>
): string {
  if (typeof error === 'object' && error !== null) {
    const axiosError = error as { response?: { data?: { message?: string; detail?: string }; status?: number } };

    const status = axiosError.response?.status;
    if (status && statusMap?.[status]) {
      return statusMap[status];
    }

    const fromDetail = axiosError.response?.data?.detail;
    if (fromDetail) return fromDetail;
    const fromBody = axiosError.response?.data?.message;
    if (fromBody) return fromBody;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export function displayError(error: unknown, fallback?: string, statusMap?: Record<number, string>) {
  console.error('[API Error]', error);
  toast.error(getErrorMessage(error, fallback, statusMap));
}

// ── useSignup ──────────────────────────────────────────────────────────────
export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: (payload: RegisterPayload) =>
      postRequest<RegisterResponse, RegisterPayload>({
        url: API_ENDPOINTS.AUTH.REGISTER,
        payload,
      }),

    onSuccess(response, variables) {
      const encodedEmail = encodeURIComponent(variables.officialEmail);
      router.push(`/verify-email?email=${encodedEmail}`);
    },

    onError(error) {
      displayError(error, 'Unable to create account. Please try again.', {
        409: 'An account with this email already exists.',
      });
    },
  });
}

// ── useLogin (step 1: password → emailed OTP) ────────────────────────────────
export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (payload: LoginPayload) =>
      postRequest<LoginChallengeResponse, LoginPayload>({
        url: API_ENDPOINTS.AUTH.LOGIN,
        payload,
      }),

    onSuccess(_response, variables) {
      toast.success('We sent a login code to your email.');
      router.push(`/login/verify?email=${encodeURIComponent(variables.email)}`);
    },

    onError(error) {
      displayError(error, 'Unable to sign in. Check your email.', {
        401: 'Invalid email or password.',
      });
    },
  });
}

// ── useVerifyLoginOtp (step 2: code → session) ───────────────────────────────
export function useVerifyLoginOtp() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['auth', 'login', 'verify'],
    mutationFn: (payload: VerifyOtpPayload) =>
      postRequest<LoginResponse, VerifyOtpPayload>({
        url: API_ENDPOINTS.AUTH.LOGIN_VERIFY,
        payload,
      }),

    async onSuccess() {
      resetAuthRefreshState();
      markSession();

      toast.success('Welcome back!');
      router.push('/dashboard');
    },

    onError(error) {
      displayError(error, 'That code did not work. Please try again.', {
        401: 'Invalid or expired code.',
      });
    },
  });
}

// ── useLogout ──────────────────────────────────────────────────────────────
export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: () =>
      postRequest<void, Record<string, never>>({ url: API_ENDPOINTS.AUTH.LOGOUT, payload: {} }),
    onSettled() {
      clearAuthCookies();
      qc.clear();
      if (typeof window !== 'undefined') window.location.replace('/login');
    },
  });
}

// ── useMe (GET /auth/me) ───────────────────────────────────────────────────
export function useMe() {
  return useQuery<UserMeResponse>({
    queryKey: ['auth', 'me'],
    queryFn: () => getRequest<UserMeResponse>({ url: API_ENDPOINTS.AUTH.ME }),
    retry: false, // Don't spam retries on 401 redirect boundaries
  });
}

// ── useForgotPassword (POST /auth/forgot-password) ──────────────────────
export function useForgotPassword() {
  const router = useRouter();
  return useMutation<void, Error, ForgotPasswordPayload>({
    mutationFn: (payload) =>
      postRequest<void, ForgotPasswordPayload>({
        url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        payload,
      }),
    onSuccess: () => {
      // Handled in component
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to send reset link.');
    },
  });
}

// ── useResetPassword (POST /auth/reset-password) ────────────────────────
export function useResetPassword() {
  const router = useRouter();
  return useMutation<void, Error, ResetPasswordPayload>({
    mutationFn: (payload) =>
      postRequest<void, ResetPasswordPayload>({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        payload,
      }),
    onSuccess: () => {
      toast.success('Password reset successfully. Please sign in with your new password.');
      router.push('/login');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to reset password.');
    },
  });
}
