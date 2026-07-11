import Link from 'next/link';
import { Mail, Landmark } from 'lucide-react';

export default function VerifyEmail({ email }: { email?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-pl-bg">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 border border-pl-border text-center">

        {/* Brand logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-2">
            <Landmark className="w-6 h-6 text-pl-blue" />
            <span className="font-bold text-base text-pl-blue">PayLibre</span>
          </div>
        </div>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full p-4 bg-blue-500/10">
            <Mail size={40} className="text-pl-blue" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-1 text-pl-text">
          Check your email
        </h1>

        {/* Body */}
        <p className="mt-3 text-sm leading-relaxed text-pl-text-secondary">
          We sent a verification link to{' '}
          {email ? (
            <span className="font-semibold text-pl-text">{decodeURIComponent(email)}</span>
          ) : (
            'your email address'
          )}
          . Click the link to verify your account and sign in.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full py-3 rounded-lg text-sm font-medium border border-pl-border text-pl-text text-center transition-colors duration-200 cursor-pointer block hover:bg-gray-50"
          >
            Return to sign in
          </Link>

          <p className="text-xs mt-4 text-pl-text-secondary">
            Didn't receive the email? Check your spam folder or{' '}
            <Link href="/register" className="text-pl-blue hover:underline">
              try registering again
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
