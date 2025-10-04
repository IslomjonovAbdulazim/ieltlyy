import { Schema, model, models, Types } from "mongoose";

export type QuestionOption = {
  key: string; // e.g., "A", "B", "C", "D"
  text: string;
};

export type Question = {
  _id?: string | Types.ObjectId;
  type: "mcq" | "true_false" | "gap_fill";
  prompt: string;
  options?: QuestionOption[]; // for mcq
  answer?: string; // correct answer (e.g., "A", "true", or the gap fill text)
};

export interface ITest {
  _id: string;
  testId: string; // stable id like "listening-sample-1"
  title: string;
  section: "Listening" | "Reading" | "Writing" | "Speaking";
  description?: string;
  audioUrl?: string; // for listening
  passage?: string; // for reading
  questions?: Question[]; // for objective sections
  createdBy?: Types.ObjectId | string; // admin user id
  createdAt: Date;
}

const QuestionSchema = new Schema<Question>(
  {
    type: { type: String, enum: ["mcq", "true_false", "gap_fill"], required: true },
    prompt: { type: String, required: true },
    options: [
      {
        key: String,
        text: String,
      },
    ],
    answer: String,
  },
  { _id: true }
);

const TestSchema = new Schema<ITest>(
  {
    testId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    section: { type: String, enum: ["Listening", "Reading", "Writing", "Speaking"], required: true },
    description: String,
    audioUrl: String,
    passage: String,
    questions: [QuestionSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: () => new Date() },
  },
  { collection: "tests" }
);

export const TestModel = models.Test || model<ITest>("Test", TestSchema);

export type { Question as TestQuestion };