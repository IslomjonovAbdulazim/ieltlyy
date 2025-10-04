"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TestResults } from "./TestResults";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";

interface Question {
  questionNumber: number;
  questionText: string;
  questionType: "multiple-choice" | "true-false-not-given" | "fill-blank";
  options?: string[];
  correctAnswer: string;
}

interface Part {
  partNumber: number;
  title: string;
  instructions: string;
  content: string;
  questions: Question[];
}

interface Test {
  id: number;
  title: string;
  type: string;
  description: string;
  parts: Part[];
}

export function ReadingTest({ test, onComplete }: { test: Test; onComplete?: () => void }) {
  const [currentPart, setCurrentPart] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Record<number, string>>>({});
  const [questionScores, setQuestionScores] = useState<Record<number, { correct: boolean; marks: number }>>({});
  const [submitting, setSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const router = useRouter();

  const part = test.parts[currentPart];

  // Calculate real-time score
  const currentScore = Object.values(questionScores).reduce((sum, q) => sum + (q.correct ? q.marks : 0), 0);
  const totalQuestions = test.parts.reduce((sum, p) => sum + p.questions.length, 0);
  const answeredQuestions = Object.keys(questionScores).length;

  const handleAnswer = (questionNum: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentPart]: {
        ...(prev[currentPart] || {}),
        [questionNum]: answer,
      },
    }));

    // Find the question to get correct answer and marks
    const question = part.questions.find(q => q.questionNumber === questionNum);
    if (question && question.correctAnswer) {
      const isCorrect = answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
      
      // Immediate scoring
      setQuestionScores(prev => ({
        ...prev,
        [questionNum]: {
          correct: isCorrect,
          marks: question.marks || 1
        }
      }));

      // Visual feedback
      if (isCorrect) {
        toast.success(`✓ Correct! +${question.marks || 1} point${question.marks !== 1 ? 's' : ''}`, {
          duration: 2000,
          className: "bg-green-50 border-green-200"
        });
      } else {
        toast.error(`✗ Incorrect`, {
          duration: 2000,
          className: "bg-red-50 border-red-200"
        });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("bearer_token");
      
      // Flatten answers to match API format
      const flatAnswers: Record<string, string> = {};
      Object.values(answers).forEach(partAnswers => {
        Object.entries(partAnswers).forEach(([qNum, answer]) => {
          flatAnswers[qNum] = answer;
        });
      });

      const res = await fetch(`/api/tests/${test.id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers: flatAnswers }),
      });

      if (!res.ok) throw new Error("Submission failed");

      const result = await res.json();
      toast.success("Test submitted successfully!");
      
      // Show results
      setTestResult(result.result);
      
      // Call onComplete callback to track usage
      if (onComplete) {
        await onComplete();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit test");
    } finally {
      setSubmitting(false);
    }
  };

  // Show results if available
  if (testResult) {
    return <TestResults result={testResult} />;
  }

  return (
    <div className="min-h-screen bg-[var(--background-light)] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header with Live Score */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
              <p className="text-gray-600 mb-4">{test.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Part {currentPart + 1} of {test.parts.length}</span>
                <span>•</span>
                <span>{part.questions.length} questions</span>
              </div>
            </div>

            {/* Live Score Display */}
            <div className="bg-gradient-to-br from-[var(--brand-primary)] to-purple-600 text-white rounded-lg p-6 min-w-[200px] text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Current Score</span>
              </div>
              <div className="text-4xl font-bold mb-1">{currentScore}</div>
              <div className="text-sm opacity-80">
                {answeredQuestions}/{totalQuestions} answered
              </div>
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="text-xs opacity-80 mb-1">Progress</div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Passage */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-2">{part.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{part.instructions}</p>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {part.content}
              </div>
            </div>
          </div>

          {/* Questions with Real-time Feedback */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Questions</h3>
            <div className="space-y-6">
              {part.questions.map((q) => {
                const isAnswered = !!answers[currentPart]?.[q.questionNumber];
                const score = questionScores[q.questionNumber];
                
                return (
                  <div key={q.questionNumber} className={`border-b pb-4 last:border-b-0 ${
                    score ? (score.correct ? 'bg-green-50' : 'bg-red-50') : ''
                  } ${score ? 'p-3 rounded-lg -m-3 mb-3' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-medium flex-1">
                        {q.questionNumber}. {q.questionText}
                      </p>
                      {score && (
                        <div className="flex items-center gap-1 ml-2">
                          {score.correct ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className={`text-sm font-semibold ${
                            score.correct ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {score.correct ? `+${score.marks}` : '0'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {q.questionType === "multiple-choice" && q.options ? (
                      <div className="space-y-2 ml-4">
                        {q.options.map((option, idx) => (
                          <label key={idx} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`q-${currentPart}-${q.questionNumber}`}
                              value={option}
                              checked={answers[currentPart]?.[q.questionNumber] === option}
                              onChange={(e) => handleAnswer(q.questionNumber, e.target.value)}
                              className="w-4 h-4"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    ) : q.questionType === "true-false-not-given" ? (
                      <div className="space-y-2 ml-4">
                        {["True", "False", "Not Given"].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`q-${currentPart}-${q.questionNumber}`}
                              value={option}
                              checked={answers[currentPart]?.[q.questionNumber] === option}
                              onChange={(e) => handleAnswer(q.questionNumber, e.target.value)}
                              className="w-4 h-4"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={answers[currentPart]?.[q.questionNumber] || ""}
                        onChange={(e) => handleAnswer(q.questionNumber, e.target.value)}
                        onBlur={(e) => {
                          if (e.target.value) {
                            handleAnswer(q.questionNumber, e.target.value);
                          }
                        }}
                        placeholder="Type your answer"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentPart((p) => Math.max(0, p - 1))}
            disabled={currentPart === 0}
            className="px-6 py-2 border rounded-full disabled:opacity-50"
          >
            Previous Part
          </button>
          {currentPart < test.parts.length - 1 ? (
            <button
              onClick={() => setCurrentPart((p) => p + 1)}
              className="btn-primary"
            >
              Next Part
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Test"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}