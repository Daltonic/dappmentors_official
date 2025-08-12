import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  slug: string;
  userId: string;
  image: string;
  targetAmount: number;
  aboutProject: string;
  storiesImpact: string;
  conclusion: string;
  gallery: string[];
  raised: number;
  completed: boolean;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    image: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    aboutProject: { type: String, required: true },
    storiesImpact: { type: String, required: true },
    conclusion: { type: String, required: true },
    gallery: { type: [String], required: false },
    raised: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
