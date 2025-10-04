import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/auth";
import { upload } from "../middleware/upload";
import { uploadAudio, addQuestionToPart } from "../controllers/upload.controller";

const router = Router();

// Admin only - file uploads
router.post(
  "/tests/:testId/parts/:partNumber/audio",
  authenticate,
  requireAdmin,
  upload.single("audio"),
  uploadAudio
);

router.post(
  "/tests/:testId/parts/:partNumber/questions",
  authenticate,
  requireAdmin,
  addQuestionToPart
);

export default router;