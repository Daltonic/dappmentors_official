import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  slug: string;
  createdAt: Date;
  userId: string;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    userId: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);
