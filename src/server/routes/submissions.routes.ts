import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/auth";
import {
  submitTest,
  getSubmission,
  getUserSubmissions,
  getAllSubmissions,
  gradeSubmission,
  getAnalyticsSummary
} from "../controllers/submissions.controller";

const router = Router();

// Student routes
router.post("/tests/:testId/submit", authenticate, submitTest);
router.get("/submissions/:submissionId", authenticate, getSubmission);
router.get("/users/:userId/submissions", authenticate, getUserSubmissions);

// Admin routes
router.get("/admin/submissions", authenticate, requireAdmin, getAllSubmissions);
router.put("/admin/submissions/:submissionId/grade", authenticate, requireAdmin, gradeSubmission);
router.get("/admin/analytics/summary", authenticate, requireAdmin, getAnalyticsSummary);

export default router;