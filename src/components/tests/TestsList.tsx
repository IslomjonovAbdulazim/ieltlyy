"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Headphones, BookOpen, PenTool, Mic } from "lucide-react";

interface Test {
  id: number;
  title: string;
  type: string;
  description?: string;
  createdAt: string;
}

const testIcons = {
  listening: Headphones,
  reading: BookOpen,
  writing: PenTool,
  speaking: Mic,
};

export default function TestsList() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchTests();
  }, [filter]);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const url = filter === "all" 
        ? `/api/tests` 
        : `/api/tests?type=${filter}`;
      
      const token = localStorage.getItem("bearer_token");
      const headers: HeadersInit = {
        "Content-Type": "application/json"
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      
      const res = await fetch(url, { headers });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to fetch tests");
      
      setTests(data.tests || []);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTestRoute = (type: string) => {
    return `/tests/${type.toLowerCase()}`;
  };

  const displayTypes = ["all", "listening", "reading", "writing", "speaking"];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--brand-primary)] border-r-transparent"></div>
        <p className="mt-4 text-muted-foreground">Loading tests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Error: {error}</p>
        <button 
          onClick={fetchTests}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {displayTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${
              filter === type
                ? "bg-[var(--brand-primary)] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type === "all" ? "All Tests" : type}
          </button>
        ))}
      </div>

      {/* Tests grid */}
      {tests.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-muted-foreground text-lg">No tests available yet.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Run <code className="bg-gray-200 px-2 py-1 rounded">npm run seed:tests</code> to populate the database with test data.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tests.map((test) => {
            const Icon = testIcons[test.type.toLowerCase() as keyof typeof testIcons] || BookOpen;
            return (
              <div
                key={test.id}
                className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[var(--brand-primary)]/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[var(--brand-primary)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--brand-primary)] capitalize">
                    {test.type}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg mb-2">{test.title}</h3>
                {test.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {test.description}
                  </p>
                )}
                
                <Link
                  href={`${getTestRoute(test.type)}?testId=${test.id}`}
                  className="block w-full text-center btn-primary"
                >
                  Start Test
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}