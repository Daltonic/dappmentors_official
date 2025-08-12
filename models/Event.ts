import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  slug: string;
  userId: string;
  image: string;
  targetAmount: number;
  aboutEvent: string;
  storiesImpact: string;
  conclusion: string;
  gallery: string[];
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    image: { type: String, required: false }, // Optional
    targetAmount: { type: Number, required: true },
    aboutEvent: { type: String, required: true },
    storiesImpact: { type: String, required: true },
    conclusion: { type: String, required: true },
    gallery: { type: [String], required: false },
  },
  { timestamps: true },
);

export default mongoose.models.Event ||
  mongoose.model<IEvent>("Event", EventSchema);
