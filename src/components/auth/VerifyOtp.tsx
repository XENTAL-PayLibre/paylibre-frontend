'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useVerifyLoginOtp } from '@/api/auth';
import { LoginOtpSchema } from '@/schemas';
import { Landmark } from 'lucide-react';
import Link from 'next/link';

export default function VerifyOtp() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const { mutate: verify, isPending } = useVerifyLoginOtp();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const result = LoginOtpSchema.safeParse({ code });
    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Invalid code');
      return;
    }

    if (!email) {
      setError('Email is missing from URL parameters');
      return;
    }

    verify({ email, code });
  };

  const digits = Array.from({ length: 6 }, (_, i) => code[i] || '');

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-pl-bg">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 border border-pl-border">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Landmark className="w-6 h-6 text-pl-blue" />
              <span className="font-bold text-base text-pl-blue">PayLibre</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1 text-pl-text">Enter your code</h1>
          <p className="text-sm text-pl-text-secondary">
            We emailed a 6-digit code{email ? <> to <span className="font-medium text-pl-text">{email}</span></> : null}. It expires in 10 minutes.
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-pl-text">Login code</label>

            {/* 6 Boxes OTP Input */}
            <div className="relative flex justify-between gap-2.5 py-1">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(e) => {
                  setError('');
                  setCode(e.target.value.replace(/\D/g, ''));
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-text outline-none z-10"
              />
              {digits.map((digit, index) => {
                const isActive = isFocused && index === code.length;
                const isFilled = digit !== '';
                return (
                  <div
                    key={index}
                    className={`w-12 h-14 border rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-200 bg-white text-foreground
                               ${isActive ? 'border-pl-blue' : 'border-pl-border'}
                               ${error ? 'border-pl-red' : ''}`}
                  >
                    {digit || (isActive ? (
                      <span className="w-px h-5 bg-pl-blue animate-caret-blink" />
                    ) : (
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                    ))}
                  </div>
                );
              })}
            </div>

            {error && <p className="text-xs text-pl-red mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending || !email}
            className="w-full py-3 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 bg-pl-blue cursor-pointer"
          >
            {isPending ? 'Verifying…' : 'Verify and sign in'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-pl-text-secondary">
          Didn't get a code?{' '}
          <Link href="/login" className="text-pl-blue hover:underline">
            Back to sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
