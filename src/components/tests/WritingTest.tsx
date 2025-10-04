"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, FileText, Clock, Sparkles, TrendingUp, AlertCircle, Zap } from "lucide-react";

interface Part {
  partNumber: number;
  title: string;
  instructions: string;
  prompt: string;
  minWords: number;
}

interface Test {
  _id: string;
  title: string;
  type: string;
  description: string;
  parts: Part[];
}

interface Analysis {
  bandScore: number;
  taskAchievement: number;
  coherenceCohesion: number;
  lexicalResource: number;
  grammaticalAccuracy: number;
  mistakes: Array<{
    type: string;
    original: string;
    correction: string;
    explanation: string;
  }>;
  strengths: string[];
  improvements: string[];
  feedback: string;
}

export function WritingTest({ test }: { test: Test }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [analyses, setAnalyses] = useState<Record<number, Analysis>>({});
  const [analyzing, setAnalyzing] = useState<Record<number, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleAnswer = (partNum: number, text: string) => {
    setAnswers((prev) => ({ ...prev, [partNum]: text }));
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const analyzeWriting = async (partNum: number) => {
    const text = answers[partNum];
    const part = test.parts.find(p => p.partNumber === partNum);
    
    if (!text || !part) {
      toast.error("Please write your response first");
      return;
    }

    const wordCount = getWordCount(text);
    if (wordCount < part.minWords) {
      toast.error(`Please write at least ${part.minWords} words (current: ${wordCount})`);
      return;
    }

    try {
      setAnalyzing(prev => ({ ...prev, [partNum]: true }));
      toast.info("AI is analyzing your writing...", { duration: 2000 });

      const res = await fetch("/api/tests/analyze-writing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          prompt: part.prompt,
          taskNumber: part.partNumber,
        }),
      });

      if (!res.ok) throw new Error("Analysis failed");

      const { analysis } = await res.json();
      setAnalyses(prev => ({ ...prev, [partNum]: analysis }));
      toast.success(`Analysis complete! Band Score: ${analysis.bandScore}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to analyze writing");
    } finally {
      setAnalyzing(prev => ({ ...prev, [partNum]: false }));
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("bearer_token");
      
      const res = await fetch(`/api/tests/${test._id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) throw new Error("Submission failed");

      const result = await res.json();
      toast.success("Test submitted! Your writing will be reviewed by an examiner.");
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit test");
    } finally {
      setSubmitting(false);
    }
  };

  // Show submission confirmation
  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--background-light)] py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold mb-2">Submission Complete! 🎉</h1>
            <p className="text-xl text-gray-600 mb-6">{test.title}</p>
            
            {/* Completion Status */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-8">
              <CheckCircle2 className="w-4 h-4" />
              100% Complete - All tasks submitted
            </div>

            {/* Tasks Summary */}
            <div className="bg-[var(--background-light)] rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Submitted Tasks</h2>
              <div className="space-y-3">
                {test.parts.map((part) => {
                  const wordCount = getWordCount(answers[part.partNumber] || "");
                  const analysis = analyses[part.partNumber];
                  
                  return (
                    <div key={part.partNumber} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[var(--brand-primary)]" />
                        <div className="text-left">
                          <p className="font-medium">Task {part.partNumber}: {part.title}</p>
                          <p className="text-sm text-gray-600">
                            {wordCount} words
                            {analysis && ` • AI Score: ${analysis.bandScore}`}
                          </p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Manual Review Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-bold text-blue-900 mb-2">Manual Scoring in Progress</h3>
                  <p className="text-sm text-blue-800 mb-2">
                    Your writing tasks have been submitted for expert review. Our examiners will evaluate:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1 ml-4">
                    <li>• Task Achievement</li>
                    <li>• Coherence and Cohesion</li>
                    <li>• Lexical Resource</li>
                    <li>• Grammatical Range and Accuracy</li>
                  </ul>
                  <p className="text-sm text-blue-800 mt-3">
                    You'll receive your detailed feedback and band score within 24-48 hours via email and on your dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/tests")}
                className="btn-primary"
              >
                Take Another Test
              </button>
              
              <button
                onClick={() => router.push("/dashboard")}
                className="btn-secondary"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-light)] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
              <p className="text-gray-600 mb-4">{test.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{test.parts.length} tasks</span>
                <span>•</span>
                <span>AI-powered instant feedback</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>AI Analysis Available</span>
            </div>
          </div>
        </div>

        {/* Writing Tasks */}
        <div className="space-y-6">
          {test.parts.map((part) => {
            const wordCount = getWordCount(answers[part.partNumber] || "");
            const isMinWordsMet = wordCount >= part.minWords;
            const analysis = analyses[part.partNumber];
            const isAnalyzing = analyzing[part.partNumber];

            return (
              <div key={part.partNumber} className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2">
                    Task {part.partNumber}: {part.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">{part.instructions}</p>
                  <div className="bg-[var(--background-light)] p-4 rounded-lg mb-4">
                    <p className="text-gray-800">{part.prompt}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Write at least <span className="font-semibold">{part.minWords} words</span>
                  </p>
                </div>

                <textarea
                  value={answers[part.partNumber] || ""}
                  onChange={(e) => handleAnswer(part.partNumber, e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full h-64 px-4 py-3 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                />

                <div className="mt-2 flex items-center justify-between">
                  <span className={wordCount < part.minWords ? "text-red-600 text-sm" : "text-green-600 text-sm"}>
                    Word count: {wordCount} {!isMinWordsMet && `(${part.minWords - wordCount} more needed)`}
                  </span>
                  
                  <button
                    onClick={() => analyzeWriting(part.partNumber)}
                    disabled={isAnalyzing || !isMinWordsMet}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-primary)] text-white rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Get AI Feedback</span>
                      </>
                    )}
                  </button>
                </div>

                {/* AI Analysis Display */}
                {analysis && (
                  <div className="mt-6 space-y-4">
                    {/* Band Score */}
                    <div className="bg-gradient-to-br from-[var(--brand-primary)] to-purple-600 text-white rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm opacity-90 mb-1">AI Estimated Band Score</div>
                          <div className="text-5xl font-bold">{analysis.bandScore}</div>
                        </div>
                        <Zap className="w-12 h-12 opacity-50" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/20">
                        <div>
                          <div className="text-xs opacity-80">Task Achievement</div>
                          <div className="text-2xl font-bold">{analysis.taskAchievement}</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-80">Coherence & Cohesion</div>
                          <div className="text-2xl font-bold">{analysis.coherenceCohesion}</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-80">Lexical Resource</div>
                          <div className="text-2xl font-bold">{analysis.lexicalResource}</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-80">Grammar Accuracy</div>
                          <div className="text-2xl font-bold">{analysis.grammaticalAccuracy}</div>
                        </div>
                      </div>
                    </div>

                    {/* Mistakes */}
                    {analysis.mistakes && analysis.mistakes.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <h3 className="font-bold text-red-900">Areas for Improvement</h3>
                        </div>
                        <div className="space-y-3">
                          {analysis.mistakes.map((mistake, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3">
                              <div className="flex items-start gap-2 mb-2">
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium">
                                  {mistake.type}
                                </span>
                              </div>
                              <div className="text-sm mb-1">
                                <span className="text-gray-600">Original: </span>
                                <span className="line-through text-red-600">"{mistake.original}"</span>
                              </div>
                              <div className="text-sm mb-1">
                                <span className="text-gray-600">Correction: </span>
                                <span className="text-green-600 font-medium">"{mistake.correction}"</span>
                              </div>
                              <div className="text-sm text-gray-600">{mistake.explanation}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Strengths */}
                    {analysis.strengths && analysis.strengths.length > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <h3 className="font-bold text-green-900">Strengths</h3>
                        </div>
                        <ul className="space-y-2">
                          {analysis.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-green-800">
                              <span className="text-green-500 mt-0.5">✓</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Improvements */}
                    {analysis.improvements && analysis.improvements.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                          <h3 className="font-bold text-blue-900">How to Improve</h3>
                        </div>
                        <ul className="space-y-2">
                          {analysis.improvements.map((improvement, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-blue-800">
                              <span className="text-blue-500 mt-0.5">→</span>
                              <span>{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Overall Feedback */}
                    {analysis.feedback && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 mb-2">Overall Feedback</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{analysis.feedback}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit for Review"}
          </button>
        </div>
      </div>
    </div>
  );
}