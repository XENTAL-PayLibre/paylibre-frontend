import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata = {
  title: 'Forgot Password – PayLibre',
  description: 'Request a password reset link.',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
