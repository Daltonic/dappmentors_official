import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  slug?: string;
  content: string;
  position: string;
  image: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String, default: "" },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
