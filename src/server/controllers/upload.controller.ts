import { Request, Response } from "express";
import { Test } from "../models/Test";

// POST /tests/:testId/parts/:partNumber/audio - Upload audio for a test part
export const uploadAudio = async (req: Request, res: Response) => {
  try {
    const { testId, partNumber } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Generate public URL for the uploaded file
    const audioUrl = `/uploads/audio/${req.file.filename}`;

    // Update test part with audio URL
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    const part = test.parts.find((p) => p.partNumber === parseInt(partNumber));
    if (!part) {
      return res.status(404).json({ error: "Part not found" });
    }

    part.audioUrl = audioUrl;
    await test.save();

    res.json({ audioUrl, message: "Audio uploaded successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Helper: Add question to a test part
export const addQuestionToPart = async (req: Request, res: Response) => {
  try {
    const { testId, partNumber } = req.params;
    const questionData = req.body;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    const part = test.parts.find((p) => p.partNumber === parseInt(partNumber));
    if (!part) {
      return res.status(404).json({ error: "Part not found" });
    }

    part.questions.push(questionData);
    await test.save();

    res.json({ test, message: "Question added successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};