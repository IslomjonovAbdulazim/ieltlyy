import { Schema, model, models, Types } from "mongoose";

export interface IAttempt {
  _id: string;
  userId: Types.ObjectId;
  testId: string; // references Test.testId
  section: "Listening" | "Reading" | "Writing" | "Speaking";
  score?: number; // objective sections
  total?: number; // objective sections
  percent?: number; // cached percent
  writingResponse?: { task1: string; task2: string } | null;
  speakingResponse?: { question: string; hasRecording: boolean } | null;
  createdAt: Date;
}

const AttemptSchema = new Schema<IAttempt>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    testId: { type: String, required: true },
    section: { type: String, enum: ["Listening", "Reading", "Writing", "Speaking"], required: true },
    score: Number,
    total: Number,
    percent: Number,
    writingResponse: {
      task1: String,
      task2: String,
    },
    speakingResponse: {
      question: String,
      hasRecording: Boolean,
    },
    createdAt: { type: Date, default: () => new Date() },
  },
  { collection: "attempts" }
);

export const AttemptModel = models.Attempt || model<IAttempt>("Attempt", AttemptSchema);