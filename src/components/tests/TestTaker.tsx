"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ListeningTest } from "./ListeningTest";
import { ReadingTest } from "./ReadingTest";
import { WritingTest } from "./WritingTest";
import { SpeakingTest } from "./SpeakingTest";
import { useCustomer } from "autumn-js/react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Crown, BookOpen, Headphones, PenTool, Mic } from "lucide-react";

interface Test {
  id: number;
  title: string;
  type: string;
  description: string;
  duration: number;
  totalMarks: number;
  parts: any[];
  createdAt: string;
}

export default function TestTaker({ testId }: { testId: string }) {
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [currentSection, setCurrentSection] = useState<"Listening" | "Reading" | "Writing" | "Speaking" | null>(null);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { customer, check, track, refetch, isLoading: isLoadingCustomer } = useCustomer();

  // Auth check
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push(`/login?redirect=/tests/${testId}`);
    }
  }, [session, isPending, router, testId]);

  // Feature gate check
  useEffect(() => {
    const checkAccess = async () => {
      if (!customer || isLoadingCustomer) return;

      try {
        const allowed = await check({
          featureId: "tests",
          requiredBalance: 1,
        });

        setHasAccess(allowed);
      } catch (err) {
        console.error("Access check failed:", err);
        setHasAccess(false);
      }
    };

    checkAccess();
  }, [customer, isLoadingCustomer, check]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const token = localStorage.getItem("bearer_token");
        if (!token) {
          router.push(`/login?redirect=/tests/${testId}`);
          return;
        }

        const res = await fetch(`/api/tests/${testId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch test");

        const data = await res.json();
        setTest(data.test);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId, router]);

  // Track usage after test completion
  const handleTestComplete = async () => {
    try {
      await track({
        featureId: "tests",
        value: 1,
        idempotencyKey: `test-${testId}-${Date.now()}`,
      });
      await refetch();
      toast.success("Test completed and tracked!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to track usage:", err);
      router.push("/dashboard");
    }
  };

  if (loading || isPending || isLoadingCustomer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-[var(--brand-primary)] mx-auto mb-4" />
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  // Feature gate: no access
  if (hasAccess === false) {
    const testsFeature = customer?.features?.tests;
    const remaining = testsFeature?.balance || 0;
    const total = testsFeature?.included_usage || 0;

    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-light)]">
        <div className="max-w-md w-full bg-white rounded-xl border border-[var(--border-gray)] p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Test Limit Reached
            </h2>
            <p className="text-[var(--text-secondary)]">
              You've used {total - remaining} of {total === -1 ? "unlimited" : total} tests this month.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/pricing")}
              className="w-full bg-[var(--brand-primary)] hover:opacity-90 text-white"
            >
              <Crown className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/tests")}
              className="w-full"
            >
              Back to Tests
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Test not found"}</p>
          <button
            onClick={() => router.push("/tests")}
            className="btn-primary"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  // For Full tests, show section selector
  if (test.type === "Full" && !currentSection) {
    const sections = [
      { id: "Listening" as const, title: "Listening", icon: Headphones, desc: "Audio-based questions" },
      { id: "Reading" as const, title: "Reading", icon: BookOpen, desc: "Passage comprehension" },
      { id: "Writing" as const, title: "Writing", icon: PenTool, desc: "Essay tasks" },
      { id: "Speaking" as const, title: "Speaking", icon: Mic, desc: "Recorded responses" }
    ];

    return (
      <div className="min-h-screen bg-[var(--background-light)] py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow p-8 mb-6">
            <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
            <p className="text-gray-600 mb-4">{test.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Duration: {test.duration} minutes</span>
              <span>•</span>
              <span>Total Marks: {test.totalMarks}</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Select a Section to Begin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-[var(--brand-primary)] hover:bg-[var(--background-light)] transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[var(--background-light)] rounded-lg group-hover:bg-white transition-colors">
                        <Icon className="w-6 h-6 text-[var(--brand-primary)]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{section.title}</h3>
                        <p className="text-sm text-gray-600">{section.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              You can complete sections in any order
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get parts for the current section
  const sectionTest = currentSection ? {
    ...test,
    type: currentSection,
    parts: test.parts.filter((part: any) => part.title === currentSection)
  } : test;

  return (
    <div className="min-h-screen bg-white">
      {(test.type === "Listening" || currentSection === "Listening") && <ListeningTest test={sectionTest} onComplete={handleTestComplete} />}
      {(test.type === "Reading" || currentSection === "Reading") && <ReadingTest test={sectionTest} onComplete={handleTestComplete} />}
      {(test.type === "Writing" || currentSection === "Writing") && <WritingTest test={sectionTest} onComplete={handleTestComplete} />}
      {(test.type === "Speaking" || currentSection === "Speaking") && <SpeakingTest test={sectionTest} onComplete={handleTestComplete} />}
    </div>
  );
}