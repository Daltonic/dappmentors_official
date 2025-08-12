// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  slug: string;
  gender: string;
  authType: string;
  city: string; // Required field
  country: string; // Required field
  resetPin?: string;
  resetPinExpires?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    authType: { type: String, required: true },
    city: { type: String, required: true }, // Now mandatory
    country: { type: String, required: true }, // Now mandatory
    resetPin: { type: String },
    resetPinExpires: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
