import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/auth";
import { listTests, getTest, createTest, updateTest, deleteTest } from "../controllers/tests.controller";

const router = Router();

// Public routes
router.get("/", listTests);
router.get("/:testId", getTest);

// Admin routes
router.post("/", authenticate, requireAdmin, createTest);
router.put("/:testId", authenticate, requireAdmin, updateTest);
router.delete("/:testId", authenticate, requireAdmin, deleteTest);

export default router;