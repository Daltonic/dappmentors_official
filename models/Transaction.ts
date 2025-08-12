import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  userId: string;
  transaction: string;
  userEmail: string;
  createdAt: Date;
  amount: number;
  transactionType: "card" | "crypto";
  transactionPurpose: string;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, required: true },
    transaction: { type: String, required: true },
    userEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: ["card", "crypto"], required: true },
    transactionPurpose: { type: String, required: true },
  },
  { timestamps: true },
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
