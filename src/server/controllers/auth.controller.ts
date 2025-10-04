import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { ENV } from "../config/env";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body as { name: string; email: string; password: string; role?: "student" | "admin" };
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role === "admin" ? "admin" : "student" });

    const token = jwt.sign({ userId: String(user._id), role: user.role }, ENV.JWT_SECRET, { expiresIn: "7d" });
    return res.json({
      token,
      user: { id: String(user._id), name: user.name, email: user.email, role: user.role },
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: String(user._id), role: user.role }, ENV.JWT_SECRET, { expiresIn: "7d" });
    return res.json({
      token,
      user: { id: String(user._id), name: user.name, email: user.email, role: user.role },
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Login failed" });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const authUser = (req as any).user as { userId: string } | undefined;
    if (!authUser) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findById(authUser.userId).select("name email role createdAt");
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json({ id: String(user._id), name: user.name, email: user.email, role: user.role, createdAt: user.createdAt });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to load profile" });
  }
};