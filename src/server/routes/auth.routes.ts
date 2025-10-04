import { Router } from "express";
import { login, signup, profile } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

// POST /auth/signup
router.post("/signup", signup);

// POST /auth/login
router.post("/login", login);

// GET /auth/profile
router.get("/profile", authenticate, profile);

export default router;