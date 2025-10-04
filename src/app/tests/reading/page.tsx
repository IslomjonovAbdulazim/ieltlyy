"use client";

import { useEffect, useState } from "react";
import { ReadingTest } from "@/components/tests/ReadingTest";
import { useRouter } from "next/navigation";

interface Test {
  id: number;
  title: string;
  type: string;
  description: string;
  duration: number;
  totalMarks: number;
  parts?: any[];
}

export default function ReadingPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem("bearer_token");
        if (!token) {
          router.push("/login?redirect=/tests/reading");
          return;
        }

        const res = await fetch("/api/tests?type=reading", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch tests");

        const data = await res.json();
        setTests(data.tests || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, [router]);

  const handleSelectTest = async (testId: number) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const res = await fetch(`/api/tests/${testId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch test details");

      const data = await res.json();
      setSelectedTest(data.test);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tests...</p>
        </div>
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <p className="text-red-600 mb-4">No Reading tests found</p>
          <button onClick={() => router.push("/tests")} className="btn-primary">
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  if (selectedTest) {
    return <ReadingTest test={selectedTest} />;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Select a Reading Test</h1>
        <p className="text-gray-600 mb-8">Choose from available IELTS Reading tests below</p>
        
        <div className="grid gap-6">
          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[var(--brand-primary)] transition-colors cursor-pointer"
              onClick={() => handleSelectTest(test.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold">{test.title}</h3>
                <span className="bg-[var(--brand-primary)] text-white px-3 py-1 rounded-full text-sm">
                  {test.duration} min
                </span>
              </div>
              <p className="text-gray-600 mb-4">{test.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Total Questions: {test.totalMarks}
                </span>
                <button className="btn-primary">
                  Start Test
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/tests")}
          className="mt-8 btn-secondary"
        >
          Back to Tests
        </button>
      </div>
    </div>
  );
}