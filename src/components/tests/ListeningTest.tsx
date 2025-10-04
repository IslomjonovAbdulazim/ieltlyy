"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Play, Pause, Volume2, RotateCcw, Mic, Lock, Zap, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { useCustomer } from "autumn-js/react";
import { useSession } from "@/lib/auth-client";
import { TestResults } from "./TestResults";

interface Question {
  id: number;
  questionNumber: number;
  questionText: string;
  questionType: string;
  options?: string[] | null;
  correctAnswer: string | null;
  marks: number;
}

interface Part {
  id: number;
  partNumber: number;
  title: string;
  instructions: string;
  content?: string;
  audioUrl?: string | null;
  listeningScript?: string | null;
  questions: Question[];
}

interface Test {
  id: number;
  title: string;
  type: string;
  description?: string;
  duration: number;
  totalMarks: number;
  parts: Part[];
}

export function ListeningTest({ test }: { test: Test }) {
  const [currentPart, setCurrentPart] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questionScores, setQuestionScores] = useState<Record<number, { correct: boolean; marks: number }>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(true);
  const [testResult, setTestResult] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();
  
  // Feature access check
  const { customer, track, check, isLoading: customerLoading } = useCustomer();
  const { data: session } = useSession();

  const part = test.parts[currentPart];

  // Calculate real-time score
  const currentScore = Object.values(questionScores).reduce((sum, q) => sum + (q.correct ? q.marks : 0), 0);
  const totalQuestions = test.parts.reduce((sum, p) => sum + p.questions.length, 0);
  const answeredQuestions = Object.keys(questionScores).length;

  // Check feature access
  const hasTestAccess = customer ? check({ featureId: "tests", requiredBalance: 1 }) : false;
  const testUsage = customer?.features?.tests?.usage || 0;
  const testLimit = customer?.features?.tests?.included_usage || 0;
  const isUnlimited = testLimit === -1;

  // Check TTS support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTtsSupported('speechSynthesis' in window);
    }
  }, []);

  // Reset audio when changing parts
  useEffect(() => {
    setIsPlaying(false);
    setAudioProgress(0);
    setAudioError(false);
    setIsTTSPlaying(false);
    
    // Stop any ongoing TTS
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentPart]);

  // Update audio progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setAudioProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setAudioProgress(0);
    };

    const handleError = () => {
      setAudioError(true);
      setIsPlaying(false);
      toast.error("Failed to load audio. Please try again.");
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [currentPart]);

  const handleTTSPlay = () => {
    if (!ttsSupported) {
      toast.error("Text-to-speech is not supported in your browser");
      return;
    }

    const synth = window.speechSynthesis;
    
    // Stop if already playing
    if (isTTSPlaying) {
      synth.cancel();
      setIsTTSPlaying(false);
      return;
    }

    // Check if listeningScript exists
    if (!part.listeningScript) {
      toast.error("No listening script available for this part");
      return;
    }

    // Read ONLY the listening script - NOT the questions!
    const utterance = new SpeechSynthesisUtterance(part.listeningScript);
    
    // Set language to English (British English for IELTS)
    utterance.lang = 'en-GB';
    utterance.rate = 0.9; // Slightly slower for clarity
    
    utterance.onstart = () => {
      setIsTTSPlaying(true);
    };
    
    utterance.onend = () => {
      setIsTTSPlaying(false);
    };
    
    utterance.onerror = () => {
      setIsTTSPlaying(false);
      toast.error("Text-to-speech failed");
    };

    synth.speak(utterance);
  };

  const handleAnswer = (questionNum: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNum]: answer,
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

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Audio playback failed:", error);
              toast.error("Failed to play audio. Please check your browser settings.");
              setIsPlaying(false);
            });
        }
      }
    }
  };

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setAudioProgress(0);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const seekAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setAudioProgress(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    // Check authentication
    if (!session) {
      toast.error("Please login to submit your test");
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    // Check feature access
    if (!hasTestAccess && customer) {
      toast.error("You've reached your test limit. Please upgrade to continue.");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("bearer_token");
      
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/tests/${test.id}/submit`, {
        method: "POST",
        headers,
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Submission failed");
      }

      const result = await res.json();
      
      // Track test usage
      if (customer && !isUnlimited) {
        await track({ 
          featureId: "tests", 
          value: 1, 
          idempotencyKey: `test-${test.id}-${Date.now()}` 
        });
      }
      
      toast.success("Test submitted successfully!");
      
      // Show results
      setTestResult(result.result);
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

  // Show loading state
  if (customerLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-primary)] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show upgrade prompt if no access
  if (customer && !hasTestAccess) {
    return (
      <div className="min-h-screen bg-[var(--background-light)] py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Test Limit Reached</h2>
            <p className="text-gray-600 mb-6">
              You've used {testUsage} of {testLimit} tests this month. Upgrade to Pro for unlimited access!
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-[var(--brand-primary)]" />
                <span className="font-semibold">Pro Plan Benefits:</span>
              </div>
              <ul className="text-left space-y-2 max-w-sm mx-auto">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Unlimited IELTS practice tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Detailed feedback and reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>All test types (Listening, Reading, Writing, Speaking)</span>
                </li>
              </ul>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push("/pricing")}
                className="btn-primary"
              >
                Upgrade to Pro
              </button>
              <button
                onClick={() => router.push("/tests")}
                className="btn-secondary"
              >
                Back to Tests
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
        {/* Usage indicator for free users */}
        {customer && !isUnlimited && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-medium text-amber-900">
                  Tests remaining: {testLimit - testUsage} of {testLimit} this month
                </span>
              </div>
              <button
                onClick={() => router.push("/pricing")}
                className="text-sm font-medium text-[var(--brand-primary)] hover:underline"
              >
                Upgrade for unlimited
              </button>
            </div>
          </div>
        )}

        {/* Header with Live Score */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
              {test.description && <p className="text-gray-600 mb-4">{test.description}</p>}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Part {currentPart + 1} of {test.parts.length}</span>
                <span>•</span>
                <span>{part.questions.length} questions</span>
                <span>•</span>
                <span>{test.duration} minutes</span>
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

        {/* TTS Audio Player */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-[var(--brand-primary)]" />
                <span className="font-medium">Listening Audio - Part {part.partNumber}</span>
              </div>
              {!ttsSupported && (
                <span className="text-sm text-red-500">Not supported in your browser</span>
              )}
              {!part.listeningScript && (
                <span className="text-sm text-amber-600">No script available</span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleTTSPlay}
                disabled={!ttsSupported || !part.listeningScript}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--brand-primary)] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isTTSPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    <span>Stop Audio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 ml-0.5" />
                    <span>Play Audio</span>
                  </>
                )}
              </button>
              
              {isTTSPlaying && (
                <div className="flex items-center gap-2 text-[var(--brand-primary)] animate-pulse">
                  <Volume2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Playing listening passage...</span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500">
              Listen to the audio carefully. You can play it multiple times while answering the questions below.
            </p>
          </div>
        </div>

        {/* Part Instructions */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">{part.title}</h2>
          {part.instructions && <p className="text-gray-600">{part.instructions}</p>}
        </div>

        {/* Questions with Real-time Feedback */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="space-y-6">
            {part.questions.map((q) => {
              const score = questionScores[q.questionNumber];
              
              return (
                <div key={q.id} className={`border-b pb-6 last:border-b-0 ${
                  score ? (score.correct ? 'bg-green-50' : 'bg-red-50') : ''
                } ${score ? 'p-4 rounded-lg -m-4 mb-6' : ''}`}>
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
                      {(Array.isArray(q.options) ? q.options : JSON.parse(q.options as any)).map((option: string, idx: number) => (
                        <label key={idx} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="radio"
                            name={`q-${q.questionNumber}`}
                            value={option}
                            checked={answers[q.questionNumber] === option}
                            onChange={(e) => handleAnswer(q.questionNumber, e.target.value)}
                            className="w-4 h-4 accent-[var(--brand-primary)]"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={answers[q.questionNumber] || ""}
                      onChange={(e) => handleAnswer(q.questionNumber, e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value) {
                          handleAnswer(q.questionNumber, e.target.value);
                        }
                      }}
                      placeholder="Type your answer"
                      className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPart((p) => Math.max(0, p - 1))}
            disabled={currentPart === 0}
            className="px-6 py-2 border rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
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