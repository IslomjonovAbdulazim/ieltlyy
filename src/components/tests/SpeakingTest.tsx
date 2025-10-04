"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mic, Square, Play, Pause, CheckCircle2, Clock, Volume2, Sparkles, AlertCircle } from "lucide-react";

interface Question {
  id: number;
  questionNumber: number;
  questionText: string;
}

interface Part {
  id: number;
  partNumber: number;
  title: string;
  instructions: string;
  questions: Question[];
  prepTime?: number;
  responseTime?: number;
}

interface Test {
  id: number;
  title: string;
  type: string;
  description: string;
  parts: Part[];
}

interface Analysis {
  overallBand: number;
  fluencyAndCoherence: {
    band: number;
    feedback: string;
    mistakes: Array<{ text: string; correction: string; explanation: string }>;
  };
  lexicalResource: {
    band: number;
    feedback: string;
    mistakes: Array<{ text: string; correction: string; explanation: string }>;
  };
  grammaticalRangeAndAccuracy: {
    band: number;
    feedback: string;
    mistakes: Array<{ text: string; correction: string; explanation: string }>;
  };
  pronunciation: {
    band: number;
    feedback: string;
    notes: string;
  };
  strengths: string[];
  improvements: string[];
  detailedFeedback: string;
}

interface QuestionAnalysis {
  transcription: string;
  analysis: Analysis;
}

export function SpeakingTest({ test }: { test: Test }) {
  const [currentPart, setCurrentPart] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recordings, setRecordings] = useState<Record<number, Record<number, Blob>>>({});
  const [analyses, setAnalyses] = useState<Record<number, Record<number, QuestionAnalysis>>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prepTimeLeft, setPrepTimeLeft] = useState(0);
  const [recordTimeLeft, setRecordTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  const part = test.parts[currentPart];
  const question = part.questions[currentQuestion];
  const currentAnalysis = analyses[currentPart]?.[currentQuestion];

  const startPreparation = () => {
    if (!part.prepTime) {
      startRecording();
      return;
    }

    setIsPreparing(true);
    setPrepTimeLeft(part.prepTime);

    prepTimerRef.current = setInterval(() => {
      setPrepTimeLeft((t) => {
        if (t <= 1) {
          if (prepTimerRef.current) clearInterval(prepTimerRef.current);
          setIsPreparing(false);
          startRecording();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setRecordings((prev) => ({
          ...prev,
          [currentPart]: {
            ...(prev[currentPart] || {}),
            [currentQuestion]: audioBlob,
          },
        }));
        stream.getTracks().forEach((track) => track.stop());
        
        // Automatically analyze after recording
        await analyzeRecording(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);

      if (part.responseTime) {
        setRecordTimeLeft(part.responseTime);
        recordTimerRef.current = setInterval(() => {
          setRecordTimeLeft((t) => {
            if (t <= 1) {
              if (recordTimerRef.current) clearInterval(recordTimerRef.current);
              stopRecording();
              return 0;
            }
            return t - 1;
          });
        }, 1000);
      }
    } catch (err) {
      toast.error("Failed to access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordTimerRef.current) {
        clearInterval(recordTimerRef.current);
        setRecordTimeLeft(0);
      }
    }
  };

  const analyzeRecording = async (audioBlob: Blob) => {
    try {
      setIsAnalyzing(true);
      toast.info("🤖 AI is analyzing your response...");

      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("questionText", question.questionText);

      const token = localStorage.getItem("bearer_token");
      const res = await fetch("/api/tests/analyze-speaking", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Analysis failed");
      }

      const result = await res.json();
      
      setAnalyses((prev) => ({
        ...prev,
        [currentPart]: {
          ...(prev[currentPart] || {}),
          [currentQuestion]: {
            transcription: result.transcription,
            analysis: result.analysis,
          },
        },
      }));

      toast.success("✨ Analysis complete! Review your feedback below.");
    } catch (err: any) {
      console.error("Analysis error:", err);
      if (err.message.includes("API key")) {
        toast.error("OpenAI API key not configured. Please contact support.");
      } else {
        toast.error(err.message || "Failed to analyze recording");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playRecording = () => {
    const recording = recordings[currentPart]?.[currentQuestion];
    if (recording && audioRef.current) {
      audioRef.current.src = URL.createObjectURL(recording);
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
            setIsPlaying(false);
            toast.error("Failed to play recording");
          });
      }
    }
  };

  const pausePlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("bearer_token");
      const formData = new FormData();

      formData.append("testId", test.id.toString());

      test.parts.forEach((p, partIdx) => {
        p.questions.forEach((q, qIdx) => {
          const recording = recordings[partIdx]?.[qIdx];
          if (recording) {
            formData.append(`part${p.partNumber}_q${q.questionNumber}`, recording, `speaking-p${p.partNumber}-q${q.questionNumber}.webm`);
          }
        });
      });

      const res = await fetch(`/api/tests/${test.id}/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Submission failed");

      const result = await res.json();
      toast.success("Speaking test submitted! Your responses will be reviewed.");
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit test");
    } finally {
      setSubmitting(false);
    }
  };

  // Count total recordings
  const totalRecordings = Object.values(recordings).reduce((acc, partRecs) => 
    acc + Object.keys(partRecs).length, 0
  );
  const totalQuestions = test.parts.reduce((acc, p) => acc + p.questions.length, 0);

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
              100% Complete - All {totalRecordings} responses recorded
            </div>

            {/* Parts Summary */}
            <div className="bg-[var(--background-light)] rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Submitted Recordings</h2>
              <div className="space-y-3">
                {test.parts.map((part, partIdx) => {
                  const partRecordings = Object.keys(recordings[partIdx] || {}).length;
                  return (
                    <div key={part.partNumber} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-5 h-5 text-[var(--brand-primary)]" />
                        <div className="text-left">
                          <p className="font-medium">Part {part.partNumber}: {part.title}</p>
                          <p className="text-sm text-gray-600">{partRecordings} recordings</p>
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
                    Your speaking responses have been submitted for expert review. Our examiners will evaluate:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1 ml-4">
                    <li>• Fluency and Coherence</li>
                    <li>• Lexical Resource</li>
                    <li>• Grammatical Range and Accuracy</li>
                    <li>• Pronunciation</li>
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

  const hasRecording = recordings[currentPart]?.[currentQuestion];
  const isLastQuestion = currentQuestion === part.questions.length - 1 && currentPart === test.parts.length - 1;

  return (
    <div className="min-h-screen bg-[var(--background-light)] py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
          <p className="text-gray-600 mb-4">{test.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Part {currentPart + 1} of {test.parts.length}</span>
            <span>•</span>
            <span>Question {currentQuestion + 1} of {part.questions.length}</span>
            <span>•</span>
            <span>{totalRecordings}/{totalQuestions} recorded</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">{part.title}</h2>
          <p className="text-gray-600 mb-4">{part.instructions}</p>
          {part.prepTime && (
            <p className="text-sm text-gray-600">
              Preparation time: {part.prepTime} seconds • Response time: {part.responseTime || "unlimited"} seconds
            </p>
          )}
        </div>

        {/* Question & Recording */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Question {question.questionNumber}</h3>
          <p className="text-gray-800 mb-6">{question.questionText}</p>

          {/* Timers */}
          {isPreparing && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-blue-600 mb-2">Preparation time</p>
              <p className="text-3xl font-bold text-blue-600">{prepTimeLeft}s</p>
            </div>
          )}

          {isRecording && recordTimeLeft > 0 && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg text-center">
              <p className="text-sm text-red-600 mb-2">Recording time remaining</p>
              <p className="text-3xl font-bold text-red-600">{recordTimeLeft}s</p>
            </div>
          )}

          {/* Recording Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {!isRecording && !isPreparing && !hasRecording && (
              <button
                onClick={startPreparation}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--brand-primary)] text-white rounded-full hover:opacity-90"
              >
                <Mic className="w-5 h-5" />
                Start Recording
              </button>
            )}

            {isRecording && (
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:opacity-90 animate-pulse"
              >
                <Square className="w-5 h-5" />
                Stop Recording
              </button>
            )}

            {hasRecording && !isRecording && (
              <>
                <button
                  onClick={isPlaying ? pausePlayback : playRecording}
                  className="flex items-center gap-2 px-6 py-3 border rounded-full hover:bg-gray-50"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isPlaying ? "Pause" : "Play Recording"}
                </button>
                <button
                  onClick={() => {
                    setRecordings((prev) => {
                      const newRec = { ...prev };
                      delete newRec[currentPart]?.[currentQuestion];
                      return newRec;
                    });
                    setAnalyses((prev) => {
                      const newAna = { ...prev };
                      delete newAna[currentPart]?.[currentQuestion];
                      return newAna;
                    });
                  }}
                  className="px-6 py-3 border border-red-600 text-red-600 rounded-full hover:bg-red-50"
                >
                  Re-record
                </button>
              </>
            )}
          </div>

          <audio
            ref={audioRef}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          {/* Analyzing Status */}
          {isAnalyzing && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
                <p className="text-purple-800 font-medium">AI is analyzing your response...</p>
              </div>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          )}

          {hasRecording && !isAnalyzing && !currentAnalysis && (
            <div className="p-3 bg-green-50 text-green-700 rounded-lg text-center text-sm">
              ✓ Recording saved
            </div>
          )}

          {/* AI Analysis Results */}
          {currentAnalysis && !isAnalyzing && (
            <div className="mt-6 space-y-6">
              {/* Transcription */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Volume2 className="w-5 h-5 text-gray-600" />
                  <h4 className="font-bold text-gray-900">Your Transcription</h4>
                </div>
                <p className="text-gray-800 italic leading-relaxed">"{currentAnalysis.transcription}"</p>
              </div>

              {/* Overall Band Score */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 text-center">
                <p className="text-sm uppercase tracking-wide mb-2">Overall Band Score</p>
                <p className="text-5xl font-bold">{currentAnalysis.analysis.overallBand}</p>
              </div>

              {/* Criteria Breakdown */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Fluency */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-sm">Fluency & Coherence</h5>
                    <span className="text-2xl font-bold text-purple-600">
                      {currentAnalysis.analysis.fluencyAndCoherence.band}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{currentAnalysis.analysis.fluencyAndCoherence.feedback}</p>
                  {currentAnalysis.analysis.fluencyAndCoherence.mistakes.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-red-600 uppercase">Issues Found:</p>
                      {currentAnalysis.analysis.fluencyAndCoherence.mistakes.map((mistake, idx) => (
                        <div key={idx} className="bg-red-50 border border-red-200 rounded p-2 text-xs">
                          <p className="text-red-800">
                            <span className="font-bold">❌ {mistake.text}</span>
                          </p>
                          <p className="text-green-800 mt-1">
                            <span className="font-bold">✓ {mistake.correction}</span>
                          </p>
                          <p className="text-gray-600 mt-1">{mistake.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Lexical Resource */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-sm">Lexical Resource</h5>
                    <span className="text-2xl font-bold text-blue-600">
                      {currentAnalysis.analysis.lexicalResource.band}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{currentAnalysis.analysis.lexicalResource.feedback}</p>
                  {currentAnalysis.analysis.lexicalResource.mistakes.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-red-600 uppercase">Issues Found:</p>
                      {currentAnalysis.analysis.lexicalResource.mistakes.map((mistake, idx) => (
                        <div key={idx} className="bg-red-50 border border-red-200 rounded p-2 text-xs">
                          <p className="text-red-800">
                            <span className="font-bold">❌ {mistake.text}</span>
                          </p>
                          <p className="text-green-800 mt-1">
                            <span className="font-bold">✓ {mistake.correction}</span>
                          </p>
                          <p className="text-gray-600 mt-1">{mistake.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Grammar */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-sm">Grammar</h5>
                    <span className="text-2xl font-bold text-green-600">
                      {currentAnalysis.analysis.grammaticalRangeAndAccuracy.band}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{currentAnalysis.analysis.grammaticalRangeAndAccuracy.feedback}</p>
                  {currentAnalysis.analysis.grammaticalRangeAndAccuracy.mistakes.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-red-600 uppercase">Grammar Mistakes:</p>
                      {currentAnalysis.analysis.grammaticalRangeAndAccuracy.mistakes.map((mistake, idx) => (
                        <div key={idx} className="bg-red-50 border border-red-200 rounded p-2 text-xs">
                          <p className="text-red-800">
                            <span className="font-bold">❌ {mistake.text}</span>
                          </p>
                          <p className="text-green-800 mt-1">
                            <span className="font-bold">✓ {mistake.correction}</span>
                          </p>
                          <p className="text-gray-600 mt-1">{mistake.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pronunciation */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-sm">Pronunciation</h5>
                    <span className="text-2xl font-bold text-orange-600">
                      {currentAnalysis.analysis.pronunciation.band}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{currentAnalysis.analysis.pronunciation.feedback}</p>
                  <p className="text-xs text-gray-500 italic">{currentAnalysis.analysis.pronunciation.notes}</p>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Strengths
                  </h5>
                  <ul className="space-y-2">
                    {currentAnalysis.analysis.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-green-800 flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Areas for Improvement
                  </h5>
                  <ul className="space-y-2">
                    {currentAnalysis.analysis.improvements.map((improvement, idx) => (
                      <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                        <span className="text-blue-600">→</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Detailed Feedback */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h5 className="font-bold text-gray-900 mb-3">Detailed Feedback</h5>
                <p className="text-sm text-gray-700 leading-relaxed">{currentAnalysis.analysis.detailedFeedback}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion((q) => q - 1);
              } else if (currentPart > 0) {
                setCurrentPart((p) => p - 1);
                setCurrentQuestion(test.parts[currentPart - 1].questions.length - 1);
              }
            }}
            disabled={currentPart === 0 && currentQuestion === 0}
            className="px-6 py-2 border rounded-full disabled:opacity-50"
          >
            Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Test"}
            </button>
          ) : (
            <button
              onClick={() => {
                if (currentQuestion < part.questions.length - 1) {
                  setCurrentQuestion((q) => q + 1);
                } else if (currentPart < test.parts.length - 1) {
                  setCurrentPart((p) => p + 1);
                  setCurrentQuestion(0);
                }
              }}
              className="btn-primary"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}