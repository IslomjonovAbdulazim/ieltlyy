import { Schema, model, models, Document, Types } from "mongoose";

export interface IPartResult {
  partNumber: number;
  answers: any[];
  score?: number;
  maxScore: number;
  needsManualReview?: boolean;
}

export interface ISubmission extends Document {
  userId: Types.ObjectId;
  testId: Types.ObjectId;
  partResults: IPartResult[];
  totalScore?: number;
  status: "pending" | "graded";
  createdAt: Date;
}

const PartResultSchema = new Schema<IPartResult>({
  partNumber: { type: Number, required: true },
  answers: { type: [Schema.Types.Mixed], default: [] },
  score: { type: Number },
  maxScore: { type: Number, required: true },
  needsManualReview: { type: Boolean, default: false }
}, { _id: false });

const SubmissionSchema = new Schema<ISubmission>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    partResults: { type: [PartResultSchema], default: [] },
    totalScore: { type: Number },
    status: { type: String, enum: ["pending", "graded"], default: "pending" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Submission = models.Submission || model<ISubmission>("Submission", SubmissionSchema);