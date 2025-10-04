"use client";

import { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCustomer } from "autumn-js/react";
import { useSession } from "@/lib/auth-client";
import { Crown, Loader2 } from "lucide-react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Attempt {
  id: string | number;
  section: string;
  score: number | null;
  total: number | null;
  percent: number | null;
  createdAt: string;
  question?: string;
  hasRecording?: boolean;
}

export const Dashboard = () => {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { customer, isLoading: isLoadingCustomer } = useCustomer();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/dashboard");
      return;
    }
  }, [session, isPending, router]);

  useEffect(() => {
    const token = localStorage.getItem("bearer_token");
    if (!token) return;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data?.error || "Failed to load dashboard");
          return;
        }
        setAttempts(data.attempts || []);
      } catch (e) {
        toast.error("Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const overall = useMemo(() => {
    if (!attempts.length) return 0;
    const valid = attempts.filter((a) => typeof a.percent === "number");
    if (!valid.length) return 0;
    return Math.round(valid.reduce((acc, a) => acc + (a.percent as number), 0) / valid.length);
  }, [attempts]);

  const chartData = useMemo(() => {
    const last = attempts.slice(0, 8).reverse();
    return {
      labels: last.map((a) => new Date(a.createdAt).toLocaleDateString()),
      datasets: [
        {
          label: "Percent",
          data: last.map((a) => a.percent ?? 0),
          backgroundColor: "rgba(107, 70, 193, 0.6)",
          borderRadius: 6,
        },
      ],
    };
  }, [attempts]);

  const clear = () => {
    setAttempts([]);
    toast.success("Cleared view (server data preserved)");
  };

  const handleManageBilling = async () => {
    const token = localStorage.getItem("bearer_token");
    try {
      const res = await fetch("/api/billing-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          returnUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const data = await res.json();
      if (data?.url) {
        const isInIframe = typeof window !== "undefined" && window.self !== window.top;
        if (isInIframe) {
          window.parent?.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: data.url } }, "*");
        } else {
          window.open(data.url, "_blank", "noopener,noreferrer");
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to open billing portal");
    }
  };

  const currentPlan = customer?.products?.[0]?.name || "Free Plan";
  const isPaidPlan = customer?.products?.[0]?.id !== "free" && customer?.products?.length > 0;
  const testsFeature = customer?.features?.tests;
  const testsRemaining = testsFeature?.balance || 0;
  const testsTotal = testsFeature?.included_usage || 0;
  const testsUsed = testsTotal === -1 ? 0 : testsTotal - testsRemaining;

  if (isPending || isLoadingCustomer) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin h-8 w-8 text-[var(--brand-primary)]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Plan & Usage Overview */}
      <section className="rounded-xl border p-6 bg-gradient-to-br from-white to-[var(--background-light)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-black mb-2">Current Plan</h2>
            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
              isPaidPlan 
                ? "bg-gradient-to-r from-[var(--brand-primary)] to-purple-600 text-white shadow-md" 
                : "bg-gray-100 text-gray-700"
            }`}>
              {isPaidPlan && <Crown className="h-4 w-4" />}
              {currentPlan}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {isPaidPlan && (
              <Button variant="outline" onClick={handleManageBilling}>
                Manage Billing
              </Button>
            )}
            {!isPaidPlan && (
              <Button 
                onClick={() => router.push("/pricing")}
                className="bg-[var(--brand-primary)] hover:opacity-90 text-white"
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Button>
            )}
          </div>
        </div>

        {/* Usage Meter */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-[var(--text-secondary)]">Tests Used This Month</p>
            <p className="text-sm font-semibold text-black">
              {testsTotal === -1 ? `${testsUsed} / Unlimited` : `${testsUsed} / ${testsTotal}`}
            </p>
          </div>
          <Progress 
            value={testsTotal === -1 ? 0 : (testsUsed / testsTotal) * 100} 
            className="h-2"
          />
          {testsRemaining <= 2 && testsTotal !== -1 && (
            <p className="text-xs text-orange-600 mt-2">
              ⚠️ You're running low on tests. Consider upgrading!
            </p>
          )}
        </div>
      </section>

      <section className="rounded-xl border p-6">
        <h2 className="mb-2 text-xl font-semibold text-black">Progress</h2>
        <Progress value={overall} className="h-3" />
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Average completion score across attempts: <span className="font-semibold text-black">{overall}%</span></p>
        {attempts.length > 0 && (
          <div className="mt-6">
            <Bar data={chartData} options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, max: 100 } },
            }} />
          </div>
        )}
      </section>

      <section className="rounded-xl border p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">Past Attempts</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/tests")}>Take another test</Button>
            <Button variant="destructive" onClick={clear}>Clear</Button>
          </div>
        </div>
        {loading ? (
          <p className="text-sm text-[var(--text-secondary)]">Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Percent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attempts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-[var(--text-secondary)]">No attempts yet. Start a test!</TableCell>
                </TableRow>
              ) : (
                attempts.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{new Date(a.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{a.section}</TableCell>
                    <TableCell>
                      {a.section === "Writing" || a.section === "Speaking"
                        ? `${a.score ?? "-"} / 9`
                        : `${a.score ?? "-"} / ${a.total ?? "-"}`}
                    </TableCell>
                    <TableCell>
                      <Progress value={a.percent ?? 0} className="h-2" />
                      <span className="ml-2 text-sm">{a.percent ?? 0}%</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
};

export default Dashboard;