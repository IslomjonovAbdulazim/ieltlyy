"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SpeakingTest } from "@/components/tests/SpeakingTest";
import { toast } from "sonner";

export default function SpeakingPage() {
  const [test, setTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId");

  useEffect(() => {
    const fetchSpeakingTest = async () => {
      try {
        const token = localStorage.getItem("bearer_token");
        const headers: HeadersInit = {
          "Content-Type": "application/json"
        };
        
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // If testId is provided, fetch that specific test
        if (testId) {
          const testRes = await fetch(`/api/tests/${testId}`, { headers });
          const testData = await testRes.json();
          
          if (!testRes.ok) throw new Error(testData.error || "Failed to load test");
          
          if (testData.test.type !== "speaking") {
            toast.error("This is not a speaking test");
            router.push("/tests");
            return;
          }
          
          setTest(testData.test);
        } else {
          // Fetch first available speaking test
          const res = await fetch(`/api/tests?type=speaking`, { headers });
          const data = await res.json();
          
          if (!res.ok) throw new Error(data.error || "Failed to fetch tests");
          
          if (data.tests && data.tests.length > 0) {
            // Fetch full test details
            const testRes = await fetch(`/api/tests/${data.tests[0].id}`, { headers });
            const testData = await testRes.json();
            
            if (!testRes.ok) throw new Error(testData.error || "Failed to load test");
            
            setTest(testData.test);
          } else {
            toast.error("No speaking tests available. Please run: npm run seed:tests");
            router.push("/tests");
          }
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load test");
        router.push("/tests");
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakingTest();
  }, [router, testId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-primary)] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading test...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!test) {
    return null;
  }

  return <SpeakingTest test={test} />;
}