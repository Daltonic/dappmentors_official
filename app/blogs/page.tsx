import { Metadata } from "next";
import PageClient from "./PageClient";
import { BlogPost } from "@/utils/interfaces";

// Define the expected API response type
interface BlogsResponse {
  blogs: BlogPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalBlogs: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search: string;
    status: string;
    category: string;
    featured: string;
  };
}

// Dynamic metadata based on fetched blogs
export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  try {
    const response = await fetch(
      `${BASE_URL}/api/blogs?status=published&limit=100`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    let blogs: BlogPost[] = [];
    if (response.ok) {
      const data: BlogsResponse = await response.json();
      blogs = data.blogs;
    }

    // Generate dynamic description based on blogs
    const description = blogs.length
      ? `Explore Dapp Mentors’ blog posts: ${blogs
          .map((b) => b.title.toLowerCase())
          .join(", ")} on blockchain development.`
      : "Explore free, high-quality tutorials, guides, and insights on blockchain development, Web3, smart contracts, and more from Dapp Mentors’ expert team.";

    return {
      title: "Dapp Mentors Blog | Web3 & Blockchain Development Insights",
      description,
      keywords: [
        "web3 blog",
        "blockchain tutorials",
        "smart contract guides",
        "web3 development",
        "blockchain development",
        "crypto tutorials",
        "dapp mentors blog",
        "web3 insights",
        ...blogs.flatMap((b) => b.topics || []),
      ],
      authors: [{ name: "Dapp Mentors" }],
      creator: "Dapp Mentors",
      publisher: "Dapp Mentors",
      openGraph: {
        title: "Dapp Mentors Blog | Web3 & Blockchain Development Insights",
        description:
          "Free tutorials, guides, and insights on Web3 and blockchain development from Dapp Mentors’ expert team.",
        url: "https://dappmentors.org/blogs", // Replace with your actual domain
        siteName: "Dapp Mentors",
        images: [
          {
            url: blogs[0]?.image || "/images/og-blog.jpg", // Use first blog image or default
            width: 1200,
            height: 630,
            alt: "Dapp Mentors Blog - Web3 Insights",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Dapp Mentors Blog | Web3 & Blockchain Insights",
        description:
          "Discover Web3 and blockchain development tutorials, guides, and insights from Dapp Mentors’ expert team.",
        images: [blogs[0]?.image || "/images/twitter-blog.jpg"], // Use first blog image or default
        creator: "@dappmentors", // Replace with your Twitter handle
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      verification: {
        google: "your-google-verification-code", // Replace with your Google verification code
      },
      alternates: {
        canonical: "https://dappmentors.org/blogs", // Fixed to /blogs
      },
    };
  } catch (error) {
    console.error("Failed to fetch blogs for metadata:", error);
    return {
      title: "Dapp Mentors Blog | Web3 & Blockchain Development Insights",
      description:
        "Explore free, high-quality tutorials, guides, and insights on blockchain development, Web3, smart contracts, and more from Dapp Mentors’ expert team.",
    };
  }
}

// Force dynamic rendering to avoid static prerender errors during build
export const dynamic = "force-dynamic";

// Server component for blogs page
export default async function Page() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  console.log(`Fetching blogs data from ${BASE_URL}/api/blogs`);

  try {
    const response = await fetch(
      `${BASE_URL}/api/blogs?status=published&limit=100`, // Increased limit
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(`API request failed: ${response.status}`);
      return <PageClient blogs={[]} />;
    }

    const data: BlogsResponse = await response.json();
    const blogs: BlogPost[] = data.blogs || [];

    return <PageClient blogs={blogs} />;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return <PageClient blogs={[]} />;
  }
}
