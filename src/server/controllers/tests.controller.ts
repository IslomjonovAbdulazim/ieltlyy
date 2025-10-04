import { Request, Response } from "express";
import { Test } from "../models/Test";

// GET /tests - List all tests with optional type filter
export const listTests = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    
    const tests = await Test.find(filter)
      .select("_id title type description createdAt")
      .sort({ createdAt: -1 })
      .lean();
    
    res.json({ tests });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// GET /tests/:testId - Get full test data
export const getTest = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;
    
    const test = await Test.findById(testId).lean();
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }
    
    res.json({ test });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// POST /tests - Create test (admin only)
export const createTest = async (req: Request, res: Response) => {
  try {
    const { title, type, description, parts } = req.body;
    const userId = req.user?.userId;
    
    const test = await Test.create({
      title,
      type,
      description,
      parts: parts || [],
      createdBy: userId
    });
    
    res.status(201).json({ test });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /tests/:testId - Update test (admin only)
export const updateTest = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;
    const { title, type, description, parts } = req.body;
    
    const test = await Test.findByIdAndUpdate(
      testId,
      { title, type, description, parts },
      { new: true, runValidators: true }
    );
    
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }
    
    res.json({ test });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /tests/:testId - Delete test (admin only)
export const deleteTest = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;
    
    const test = await Test.findByIdAndDelete(testId);
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }
    
    res.json({ message: "Test deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};