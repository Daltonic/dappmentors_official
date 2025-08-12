import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
  name: string;
  email: string;
  amount: number;
  currency: string;
  message?: string;
  slug: string;
  createdAt: Date;
  userId: string;
}

const DonationSchema = new Schema<IDonation>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    message: { type: String },
    slug: { type: String, unique: true, required: true },
    userId: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Donation ||
  mongoose.model<IDonation>("Donation", DonationSchema);
