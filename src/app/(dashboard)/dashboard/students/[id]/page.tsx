import StudentProfile from '@/components/dashboard/students/StudentProfile';

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Student Profile – PayLibre',
  description: 'View student profile details and virtual NUBAN account configuration.',
};

export default async function StudentProfilePage({ params }: Props) {
  const { id } = await params;
  return <StudentProfile id={id} />;
}
