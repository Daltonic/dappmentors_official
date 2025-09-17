"use client";

import { Product, Service } from "@/utils/interfaces";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PurchaseFeed from "@/components/dashboard/purchases/PurchaseFeed";

// Dummy data
const dummyProducts: Product[] = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the basics of React JS",
    price: 99,
    type: "Course",
    status: "published",
    featured: true,
    imageUrl: "/images/react.jpg",
    slug: "intro-to-react",
    instructor: { name: "John Doe" },
    category: "Web Development",
    difficulty: "Beginner",
    duration: "5 hours",
    rating: 4.5,
    totalReviews: 100,
    studentsEnrolled: 500,
    enrollments: 500,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-10"),
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript concepts",
    price: 149,
    type: "Course",
    status: "published",
    featured: false,
    imageUrl: "/images/js.jpg",
    slug: "advanced-js",
    instructor: { name: "Jane Smith" },
    category: "Programming",
    difficulty: "Advanced",
    duration: "10 hours",
    rating: 4.8,
    totalReviews: 200,
    studentsEnrolled: 1000,
    enrollments: 1000,
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-15"),
  },
  {
    id: "3",
    title: "Full-Stack Bootcamp",
    description: "Become a full-stack developer",
    price: 999,
    type: "Bootcamp",
    status: "published",
    featured: true,
    imageUrl: "/images/bootcamp.jpg",
    slug: "full-stack-bootcamp",
    instructor: { name: "Alex Johnson" },
    category: "Web Development",
    difficulty: "Intermediate",
    duration: "12 weeks",
    rating: 4.7,
    totalReviews: 150,
    studentsEnrolled: 300,
    enrollments: 300,
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-20"),
  },
];

const dummyServices: Service[] = [
  {
    id: "1",
    title: "Mentorship Program",
    description: "One-on-one mentorship sessions",
    price: 200,
    status: "active",
    createdAt: new Date("2025-04-01"),
    updatedAt: new Date("2025-04-10"),
    featured: true,
    thumbnail: "/images/mentorship.jpg",
    slug: "mentorship-program",
    features: ["Personalized guidance", "Weekly calls"],
    faqs: [],
    icon: "👨‍🏫",
    clients: 50,
    packages: [{ name: "Basic", price: "200", features: ["1 session"] }],
    type: "Mentorship",
  },
  {
    id: "2",
    title: "Code Review Service",
    description: "Professional code review",
    price: 150,
    status: "active",
    createdAt: new Date("2025-05-01"),
    updatedAt: new Date("2025-05-15"),
    featured: false,
    thumbnail: "/images/code-review.jpg",
    slug: "code-review",
    features: ["Detailed feedback", "Best practices"],
    faqs: [],
    icon: "💻",
    clients: 30,
    packages: [
      { name: "Standard", price: "150", features: ["Up to 1000 lines"] },
    ],
    type: "Professional",
  },
  {
    id: "3",
    title: "Writing Consultation",
    description: "Help with technical writing",
    price: 100,
    status: "coming-soon",
    createdAt: new Date("2025-06-01"),
    updatedAt: new Date("2025-06-20"),
    featured: true,
    thumbnail: "/images/writing.jpg",
    slug: "writing-consultation",
    features: ["Editing", "Structure advice"],
    faqs: [],
    icon: "✍️",
    clients: 20,
    packages: [{ name: "Basic", price: "100", features: ["1 hour session"] }],
    type: "Writing",
  },
];

// Main Page Component
const Page: React.FC = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="My Purchases"
          subtitle="View your recent purchases"
        />
        <PurchaseFeed products={dummyProducts} services={dummyServices} />
      </div>
    </div>
  );
};

export default Page;
