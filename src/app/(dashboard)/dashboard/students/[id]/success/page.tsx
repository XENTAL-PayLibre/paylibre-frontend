import StudentSuccess from '@/components/dashboard/students/StudentSuccess';

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Virtual Account Ready – PayLibre',
  description: 'Student dedicated NUBAN account has been successfully provisioned.',
};

export default async function StudentSuccessPage({ params }: Props) {
  const { id } = await params;
  return <StudentSuccess id={id} />;
}
