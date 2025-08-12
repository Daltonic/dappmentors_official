import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  image: string;
  targetAmount?: number;
  storiesImpact: string;
  conclusion: string;
  gallery: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: { type: [String], default: [] },
    image: { type: String, required: true },
    targetAmount: { type: Number },
    storiesImpact: { type: String, required: true },
    conclusion: { type: String, required: true },
    gallery: { type: [String], default: [] },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
