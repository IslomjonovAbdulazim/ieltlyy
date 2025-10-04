"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Play, Pause, FileText } from "lucide-react";

type Section = "Listening" | "Reading" | "Writing" | "Speaking";

type Test = {
  testId: string;
  title: string;
  section: Section;
  description?: string;
  audioUrl?: string;
  passage?: string;
  questions?: any[];
  createdBy?: string;
  createdAt?: string;
};

type Analytics = {
  students: number;
  attempts: number;
  overallAvgPercent: number | null;
  bySection: { section: Section; avgPercent: number | null; attempts: number }[];
};

type Submission = {
  id: string;
  user: { id: string; name: string; email: string } | null;
  section: Section;
  score: number | null;
  total: number | null;
  percent: number | null;
  createdAt: string;
};

export const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"tests" | "submissions" | "grading">("tests");
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [pendingGrading, setPendingGrading] = useState<any[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("bearer_token");
    const profile = localStorage.getItem("user_profile");
    
    if (!token || !profile) {
      router.push("/login?redirect=/dashboard/admin");
      return;
    }

    const user = JSON.parse(profile);
    if (user.role !== "admin") {
      router.push("/");
      return;
    }

    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("bearer_token");
      const headers = { Authorization: `Bearer ${token}` };

      const [testsRes, submissionsRes, analyticsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tests`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/submissions`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/analytics/summary`, { headers }),
      ]);

      if (testsRes.ok) {
        const data = await testsRes.json();
        setTests(data);
      }

      if (submissionsRes.ok) {
        const data = await submissionsRes.json();
        setSubmissions(data);
        setPendingGrading(data.filter((s: any) => s.status === "pending"));
      }

      if (analyticsRes.ok) {
        const data = await analyticsRes.json();
        setAnalytics(data);
      }
    } catch (err: any) {
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleGradeSubmission = async (submissionId: string, scores: any, comments: string) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/submissions/${submissionId}/grade`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ scores, comments }),
      });

      if (!res.ok) throw new Error("Failed to submit grade");

      toast.success("Grade submitted successfully!");
      setSelectedSubmission(null);
      loadData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-light)] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-bold mt-2">{analytics.totalUsers || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Total Attempts</p>
              <p className="text-3xl font-bold mt-2">{analytics.totalAttempts || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Pending Reviews</p>
              <p className="text-3xl font-bold mt-2 text-orange-600">{pendingGrading.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600">Avg Score</p>
              <p className="text-3xl font-bold mt-2">
                {analytics.avgScoresByType?.overall?.toFixed(1) || "—"}
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => setActiveTab("tests")}
            className={`px-4 py-2 border-b-2 transition ${
              activeTab === "tests"
                ? "border-[var(--brand-primary)] text-[var(--brand-primary)] font-medium"
                : "border-transparent text-gray-600"
            }`}
          >
            Tests ({tests.length})
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`px-4 py-2 border-b-2 transition ${
              activeTab === "submissions"
                ? "border-[var(--brand-primary)] text-[var(--brand-primary)] font-medium"
                : "border-transparent text-gray-600"
            }`}
          >
            All Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab("grading")}
            className={`px-4 py-2 border-b-2 transition ${
              activeTab === "grading"
                ? "border-[var(--brand-primary)] text-[var(--brand-primary)] font-medium"
                : "border-transparent text-gray-600"
            }`}
          >
            Pending Grading ({pendingGrading.length})
          </button>
        </div>

        {/* Tests Tab */}
        {activeTab === "tests" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Tests Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Parts</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {tests.map((test) => (
                    <tr key={test._id}>
                      <td className="px-6 py-4">{test.title}</td>
                      <td className="px-6 py-4">{test.type}</td>
                      <td className="px-6 py-4">{test.parts?.length || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(test.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === "submissions" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">All Submissions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Test</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Score</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {submissions.map((sub) => (
                    <tr key={sub._id}>
                      <td className="px-6 py-4">{sub.userId?.name || sub.userId?.email || "—"}</td>
                      <td className="px-6 py-4">{sub.testId?.title || "—"}</td>
                      <td className="px-6 py-4">
                        {sub.totalScore !== null ? `${sub.totalScore}/${sub.partResults?.reduce((sum: number, p: any) => sum + (p.maxScore || 0), 0)}` : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          sub.status === "graded" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Grading Tab */}
        {activeTab === "grading" && (
          <div>
            {selectedSubmission ? (
              <GradingInterface
                submission={selectedSubmission}
                onClose={() => setSelectedSubmission(null)}
                onSubmit={handleGradeSubmission}
              />
            ) : (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Pending Manual Grading</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Writing and Speaking submissions require manual review
                  </p>
                </div>
                <div className="divide-y">
                  {pendingGrading.length === 0 ? (
                    <div className="p-12 text-center text-gray-600">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>No submissions pending review</p>
                    </div>
                  ) : (
                    pendingGrading.map((sub) => (
                      <div key={sub._id} className="p-6 hover:bg-gray-50 transition">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{sub.testId?.title || "Test"}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Student: {sub.userId?.name || sub.userId?.email}
                            </p>
                            <p className="text-sm text-gray-600">
                              Submitted: {new Date(sub.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedSubmission(sub)}
                            className="btn-primary"
                          >
                            Grade Submission
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Grading Interface Component
function GradingInterface({ submission, onClose, onSubmit }: any) {
  const [scores, setScores] = useState<Record<number, number>>({});
  const [comments, setComments] = useState("");
  const [audioPlaying, setAudioPlaying] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Grade Submission</h2>
          <p className="text-sm text-gray-600 mt-1">
            {submission.testId?.title} - {submission.userId?.name || submission.userId?.email}
          </p>
        </div>
        <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
          Close
        </button>
      </div>

      <div className="p-6 space-y-6">
        {submission.partResults?.map((part: any, idx: number) => (
          <div key={idx} className="border rounded-lg p-4">
            <h3 className="font-bold mb-3">Part {part.partNumber}</h3>
            
            {/* Display answers */}
            <div className="space-y-3 mb-4">
              {part.answers?.map((answer: any, aIdx: number) => (
                <div key={aIdx} className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">Question {answer.questionNumber}</p>
                  
                  {/* For Writing - show text response */}
                  {typeof answer.answer === "string" && answer.answer.length > 50 && (
                    <div className="mt-2 p-3 bg-white border rounded">
                      <p className="whitespace-pre-wrap">{answer.answer}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Word count: {answer.answer.trim().split(/\s+/).length}
                      </p>
                    </div>
                  )}
                  
                  {/* For Speaking - show audio player */}
                  {answer.audioUrl && (
                    <div className="mt-2">
                      <audio src={answer.audioUrl} controls className="w-full" />
                    </div>
                  )}
                  
                  {/* For short answers */}
                  {typeof answer.answer === "string" && answer.answer.length <= 50 && (
                    <p className="font-medium">{answer.answer}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Score input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Score for Part {part.partNumber} (Max: {part.maxScore || 10})
              </label>
              <input
                type="number"
                min="0"
                max={part.maxScore || 10}
                value={scores[part.partNumber] || 0}
                onChange={(e) => setScores({ ...scores, [part.partNumber]: parseFloat(e.target.value) })}
                className="w-32 px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        ))}

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium mb-2">Comments & Feedback</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Provide feedback to the student..."
            className="w-full h-32 px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 border rounded-full">
            Cancel
          </button>
          <button
            onClick={() => onSubmit(submission._id, scores, comments)}
            className="btn-primary"
          >
            Submit Grade
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;