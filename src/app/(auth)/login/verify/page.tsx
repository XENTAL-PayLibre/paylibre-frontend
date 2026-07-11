import { Suspense } from 'react';
import VerifyOtp from '@/components/auth/VerifyOtp';

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={null}>
      <VerifyOtp />
    </Suspense>
  );
}
