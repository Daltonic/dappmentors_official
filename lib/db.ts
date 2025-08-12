import mongoose from "mongoose";

const MONGO_URI = process.env.NEXT_PRIVATE_MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Please define NEXT_PRIVATE_MONGO_URI in .env.local");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};
