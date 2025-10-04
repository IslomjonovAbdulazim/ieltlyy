import TestTaker from '@/components/tests/TestTaker';

export default async function TestDetailPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  return <TestTaker testId={testId} />;
}