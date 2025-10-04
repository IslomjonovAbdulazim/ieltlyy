"use client";

import { CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuestionResult {
  questionNumber: number;
  questionText: string;
  submittedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  marks: number;
  earnedMarks: number;
}

interface PartBreakdown {
  partNumber: number;
  partTitle: string;
  questions: number;
  correct: number;
  percentage: number;
  marks: number;
  earnedMarks: number;
  questionResults?: QuestionResult[];
}

interface TestResult {
  testId: number;
  testTitle: string;
  testType: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  breakdown: PartBreakdown[];
  detailedResults?: QuestionResult[];
}

export function TestResults({ result }: { result: TestResult }) {
  const router = useRouter();

  const getBandScore = (percentage: number) => {
    if (percentage >= 90) return 9.0;
    if (percentage >= 85) return 8.5;
    if (percentage >= 80) return 8.0;
    if (percentage >= 75) return 7.5;
    if (percentage >= 70) return 7.0;
    if (percentage >= 65) return 6.5;
    if (percentage >= 60) return 6.0;
    if (percentage >= 55) return 5.5;
    if (percentage >= 50) return 5.0;
    if (percentage >= 45) return 4.5;
    if (percentage >= 40) return 4.0;
    if (percentage >= 35) return 3.5;
    if (percentage >= 30) return 3.0;
    return 2.5;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const bandScore = getBandScore(result.percentage);

  return (
    <div className="min-h-screen bg-[var(--background-light)] py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Overall Score Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--brand-primary)] to-purple-600 rounded-full mb-4">
            {result.passed ? (
              <CheckCircle2 className="w-10 h-10 text-white" />
            ) : (
              <AlertCircle className="w-10 h-10 text-white" />
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-2">
            {result.passed ? "Congratulations! 🎉" : "Test Complete"}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">{result.testTitle}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-6">
            <div className="bg-[var(--background-light)] rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Band Score</p>
              <p className={`text-3xl font-bold ${getScoreColor(result.percentage)}`}>
                {bandScore}
              </p>
            </div>
            
            <div className="bg-[var(--background-light)] rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Percentage</p>
              <p className={`text-3xl font-bold ${getScoreColor(result.percentage)}`}>
                {result.percentage}%
              </p>
            </div>
            
            <div className="bg-[var(--background-light)] rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Score</p>
              <p className="text-3xl font-bold text-gray-900">
                {result.score}/{result.totalMarks}
              </p>
            </div>
            
            <div className="bg-[var(--background-light)] rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Correct</p>
              <p className="text-3xl font-bold text-gray-900">
                {result.correctAnswers}/{result.totalQuestions}
              </p>
            </div>
          </div>

          {/* Completion Status */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            100% Complete - All questions answered
          </div>
        </div>

        {/* Section Breakdown */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Section Breakdown</h2>
          
          <div className="space-y-4">
            {result.breakdown.map((part) => {
              const partPercentage = part.percentage;
              const partBandScore = getBandScore(partPercentage);
              
              return (
                <div key={part.partNumber} className="border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold">{part.partTitle}</h3>
                      <p className="text-sm text-gray-600">
                        Part {part.partNumber} • {part.questions} questions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getScoreColor(partPercentage)}`}>
                        Band {partBandScore}
                      </p>
                      <p className="text-sm text-gray-600">
                        {part.correct}/{part.questions} correct
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                        partPercentage >= 80
                          ? "bg-green-500"
                          : partPercentage >= 60
                          ? "bg-blue-500"
                          : partPercentage >= 40
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${partPercentage}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{partPercentage}% correct</span>
                    <span>{part.earnedMarks}/{part.marks} marks</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Mistakes */}
        {result.detailedResults && result.detailedResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Question Review</h2>
            <p className="text-gray-600 mb-6">
              Review your answers and see where mistakes were made
            </p>
            
            <div className="space-y-4">
              {result.detailedResults.map((qResult) => (
                <div
                  key={qResult.questionNumber}
                  className={`border-l-4 rounded-lg p-4 ${
                    qResult.isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {qResult.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    )}
                    
                    <div className="flex-1">
                      <p className="font-semibold mb-2">
                        Question {qResult.questionNumber}: {qResult.questionText}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Your answer:</p>
                          <p className={`font-medium ${qResult.isCorrect ? "text-green-700" : "text-red-700"}`}>
                            {qResult.submittedAnswer || "(No answer)"}
                          </p>
                        </div>
                        
                        {!qResult.isCorrect && (
                          <div>
                            <p className="text-gray-600 mb-1">Correct answer:</p>
                            <p className="font-medium text-green-700">
                              {qResult.correctAnswer}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          qResult.isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {qResult.isCorrect ? "Correct" : "Incorrect"} • {qResult.earnedMarks}/{qResult.marks} marks
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Summary */}
        <div className="bg-gradient-to-br from-[var(--brand-primary)] to-purple-600 rounded-lg shadow-lg p-8 text-white text-center mb-6">
          <h2 className="text-2xl font-bold mb-4">Performance Summary</h2>
          
          {result.passed ? (
            <div>
              <p className="text-lg mb-4">
                Great job! You've achieved a Band {bandScore} score.
              </p>
              <p className="opacity-90">
                You answered {result.correctAnswers} out of {result.totalQuestions} questions correctly 
                ({result.percentage}% accuracy).
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg mb-4">
                You've achieved a Band {bandScore} score.
              </p>
              <p className="opacity-90">
                Keep practicing! You answered {result.correctAnswers} out of {result.totalQuestions} questions correctly 
                ({result.percentage}% accuracy).
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/tests")}
            className="btn-primary flex items-center justify-center gap-2"
          >
            Take Another Test
            <ArrowRight className="w-5 h-5" />
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
  );
}