"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ListeningTest } from "@/components/tests/ListeningTest";
import { toast } from "sonner";

export default function ListeningPage() {
  const [test, setTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId");

  useEffect(() => {
    const fetchListeningTest = async () => {
      try {
        const token = localStorage.getItem("bearer_token");
        const headers: HeadersInit = {
          "Content-Type": "application/json"
        };
        
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Optimized: Single API call with full details
        const url = testId 
          ? `/api/tests/${testId}` 
          : `/api/tests?type=listening&limit=1&full=true`;
        
        const res = await fetch(url, { headers });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "Failed to load test");
        
        // Handle response based on endpoint
        if (testId) {
          if (data.test.type !== "listening") {
            toast.error("This is not a listening test");
            router.push("/tests");
            return;
          }
          setTest(data.test);
        } else {
          if (!data.tests || data.tests.length === 0) {
            toast.error("No listening tests available. Please run: npm run seed:tests");
            router.push("/tests");
            return;
          }
          // Full details already included in response
          setTest(data.tests[0]);
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load test");
        router.push("/tests");
      } finally {
        setLoading(false);
      }
    };

    fetchListeningTest();
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

  return <ListeningTest test={test} />;
}