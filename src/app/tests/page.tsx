import TestsList from '@/components/tests/TestsList';

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">IELTS Practice Tests</h1>
          <p className="text-xl text-gray-600">Select a test type to begin your practice</p>
        </div>
        <TestsList />
      </div>
    </div>
  );
}