import { NextResponse } from "next/server";
import mongodbService from "@/services/mongodb.service";
import Blog, { IBlog } from "@/models/Blog";
import Donation, { IDonation } from "@/models/Donation";
import Event, { IEvent } from "@/models/Event";
import Project, { IProject } from "@/models/Project";
import Testimonial, { ITestimonial } from "@/models/Testimonial";
import User, { IUser } from "@/models/User";

type SearchResult = {
  type: string;
  data: IBlog | IDonation | IEvent | IProject | ITestimonial | IUser;
};

export async function GET(req: Request) {
  try {
    await mongodbService.connect();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (!q) {
      return NextResponse.json(
        { details: "Search query is required" },
        { status: 400 },
      );
    }

    const searchQuery = { $regex: q, $options: "i" };
    let results: SearchResult[] = [];

    // Search Blogs
    const blogs = await Blog.find({
      $or: [{ title: searchQuery }, { content: searchQuery }],
    }).limit(limit);
    results = results.concat(
      blogs.map((blog) => ({ type: "blog", data: blog })),
    );

    // Search Donations
    const donations = await Donation.find({
      $or: [{ name: searchQuery }, { message: searchQuery }],
    }).limit(limit);
    results = results.concat(
      donations.map((donation) => ({ type: "donation", data: donation })),
    );

    // Search Events
    const events = await Event.find({
      $or: [{ title: searchQuery }, { description: searchQuery }],
    }).limit(limit);
    results = results.concat(
      events.map((event) => ({ type: "event", data: event })),
    );

    // Search Projects
    const projects = await Project.find({
      $or: [{ title: searchQuery }, { description: searchQuery }],
    }).limit(limit);
    results = results.concat(
      projects.map((project) => ({ type: "project", data: project })),
    );

    // Search Testimonials
    const testimonials = await Testimonial.find({
      $or: [{ name: searchQuery }, { content: searchQuery }],
    }).limit(limit);
    results = results.concat(
      testimonials.map((testimonial) => ({
        type: "testimonial",
        data: testimonial,
      })),
    );

    // Search Users
    const users = await User.find({
      $or: [{ name: searchQuery }, { email: searchQuery }],
    }).limit(limit);
    results = results.concat(
      users.map((user) => ({ type: "user", data: user })),
    );

    return NextResponse.json({
      results,
      total: results.length,
      message: "Search results fetched successfully",
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { details: "Error fetching search results" },
      { status: 500 },
    );
  }
}
