import VerifyEmail from '@/components/auth/VerifyEmail';

interface Props {
  searchParams: Promise<{ email?: string }>;
}

export const metadata = {
  title: 'Check Your Email – PayLibre',
  description: 'Verify your PayLibre account email address.',
};

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { email } = await searchParams;
  return <VerifyEmail email={email} />;
}
