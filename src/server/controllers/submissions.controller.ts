import { Request, Response } from "express";
import { Submission } from "../models/Submission";
import { Test } from "../models/Test";
import { User } from "../models/User";

// POST /tests/:testId/submit - Submit test answers
export const submitTest = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;
    const { partResults } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get test to validate and auto-grade
    const test = await Test.findById(testId).lean();
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    // Process part results and auto-grade objective questions
    const processedPartResults = partResults.map((partResult: any) => {
      const part = test.parts.find((p) => p.partNumber === partResult.partNumber);
      if (!part) return partResult;

      let score = 0;
      let maxScore = part.questions.length;
      let needsManualReview = false;

      // Check if this part needs manual review (Writing, Speaking)
      if (test.type === "Writing" || test.type === "Speaking") {
        needsManualReview = true;
        score = 0; // Will be graded manually
      } else {
        // Auto-grade objective questions (Listening, Reading)
        part.questions.forEach((question, index) => {
          const studentAnswer = partResult.answers[index];
          if (question.correctAnswer === studentAnswer) {
            score++;
          }
        });
      }

      return {
        partNumber: partResult.partNumber,
        answers: partResult.answers,
        score: needsManualReview ? undefined : score,
        maxScore,
        needsManualReview
      };
    });

    // Calculate total score
    const hasManualReview = processedPartResults.some((pr: any) => pr.needsManualReview);
    const totalScore = hasManualReview
      ? undefined
      : processedPartResults.reduce((sum: number, pr: any) => sum + (pr.score || 0), 0);

    // Create submission
    const submission = await Submission.create({
      userId,
      testId,
      partResults: processedPartResults,
      totalScore,
      status: hasManualReview ? "pending" : "graded"
    });

    res.status(201).json({ submission });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /submissions/:submissionId - Get submission details
export const getSubmission = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    const submission = await Submission.findById(submissionId)
      .populate("testId", "title type")
      .populate("userId", "name email")
      .lean();

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    // Check access: user can only see their own submissions, admin can see all
    if (userRole !== "admin" && submission.userId._id.toString() !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json({ submission });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /users/:userId/submissions - Get user's submission history
export const getUserSubmissions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const requestUserId = req.user?.userId;
    const userRole = req.user?.role;

    // Check access
    if (userRole !== "admin" && userId !== requestUserId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const submissions = await Submission.find({ userId })
      .populate("testId", "title type")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ submissions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /admin/submissions - Get all submissions (admin only)
export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const { status, testId } = req.query;
    
    const filter: any = {};
    if (status) filter.status = status;
    if (testId) filter.testId = testId;

    const submissions = await Submission.find(filter)
      .populate("testId", "title type")
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ submissions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /admin/submissions/:submissionId/grade - Grade submission manually (admin only)
export const gradeSubmission = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    const { partResults, comments } = req.body;

    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    // Update part results with manual scores
    if (partResults) {
      submission.partResults = partResults;
    }

    // Calculate total score
    const totalScore = submission.partResults.reduce((sum, pr) => sum + (pr.score || 0), 0);
    submission.totalScore = totalScore;
    submission.status = "graded";

    await submission.save();

    res.json({ submission, message: "Submission graded successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /admin/analytics/summary - Get analytics summary (admin only)
export const getAnalyticsSummary = async (req: Request, res: Response) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments({ role: "student" });

    // Total attempts
    const totalAttempts = await Submission.countDocuments();

    // Average scores by type
    const submissions = await Submission.find({ status: "graded" })
      .populate("testId", "type")
      .lean();

    const scoresByType: Record<string, number[]> = {
      Listening: [],
      Reading: [],
      Writing: [],
      Speaking: []
    };

    submissions.forEach((sub: any) => {
      if (sub.totalScore !== null && sub.totalScore !== undefined) {
        const testType = sub.testId?.type;
        if (testType && scoresByType[testType]) {
          scoresByType[testType].push(sub.totalScore);
        }
      }
    });

    const avgScoresByType = Object.entries(scoresByType).reduce((acc, [type, scores]) => {
      acc[type] = scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : 0;
      return acc;
    }, {} as Record<string, number>);

    // Top tests (most attempted)
    const topTestsAgg = await Submission.aggregate([
      { $group: { _id: "$testId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const topTests = await Promise.all(
      topTestsAgg.map(async (item) => {
        const test = await Test.findById(item._id).select("title type").lean();
        return { test, attempts: item.count };
      })
    );

    res.json({
      totalUsers,
      totalAttempts,
      avgScoresByType,
      topTests
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};