import { Schema, model, models, Document } from "mongoose";

export type UserRole = "student" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string; // hashed
  role: UserRole;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const User = models.User || model<IUser>("User", UserSchema);