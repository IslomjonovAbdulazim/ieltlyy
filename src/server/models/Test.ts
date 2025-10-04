import { Schema, model, models, Document, Types } from "mongoose";

export interface IQuestion {
  questionNumber: number;
  questionType: "mcq" | "fill-blank" | "true-false-not-given" | "matching" | "writing-prompt" | "speaking-prompt";
  questionText: string;
  options?: string[];
  correctAnswer?: string | string[];
  passage?: string;
}

export interface IPart {
  partNumber: number;
  title: string;
  instructions?: string;
  passage?: string;
  questions: IQuestion[];
  audioUrl?: string;
}

export interface ITest extends Document {
  title: string;
  type: "Listening" | "Reading" | "Writing" | "Speaking";
  description?: string;
  parts: IPart[];
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  questionNumber: { type: Number, required: true },
  questionType: { type: String, enum: ["mcq", "fill-blank", "true-false-not-given", "matching", "writing-prompt", "speaking-prompt"], required: true },
  questionText: { type: String, required: true },
  options: { type: [String] },
  correctAnswer: { type: Schema.Types.Mixed },
  passage: { type: String }
}, { _id: false });

const PartSchema = new Schema<IPart>({
  partNumber: { type: Number, required: true },
  title: { type: String, required: true },
  instructions: { type: String },
  passage: { type: String },
  questions: { type: [QuestionSchema], default: [] },
  audioUrl: { type: String }
}, { _id: false });

const TestSchema = new Schema<ITest>(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["Listening", "Reading", "Writing", "Speaking"], required: true },
    description: { type: String },
    parts: { type: [PartSchema], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Test = models.Test || model<ITest>("Test", TestSchema);