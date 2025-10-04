"use client";

import { useEffect, useState } from "react";
import { WritingTest } from "@/components/tests/WritingTest";
import { useRouter } from "next/navigation";

interface Test {
  id: number;
  title: string;
  type: string;
  description: string;
  duration: number;
  totalMarks: number;
}

export default function WritingPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem("bearer_token");
        if (!token) {
          router.push("/login?redirect=/tests/writing");
          return;
        }

        const res = await fetch("/api/tests?type=writing", {
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

  if (selectedTest) {
    return <WritingTest test={selectedTest} />;
  }

  if (tests.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <p className="text-red-600 mb-4">No Writing tests found</p>
          <button onClick={() => router.push("/tests")} className="btn-primary">
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">Select a Writing Test</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">{test.title}</h3>
            <p className="text-gray-600 mb-4">{test.description}</p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Duration:</span> {test.duration} minutes
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Total Tasks:</span> {test.totalMarks === 9 ? '2' : test.totalMarks}
              </p>
            </div>
            <button
              onClick={() => handleSelectTest(test.id)}
              className="btn-primary w-full"
            >
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}