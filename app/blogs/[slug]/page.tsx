import { Metadata } from "next";
import PageClient from "./PageClient";
import { BlogPost } from "@/utils/interfaces";
import { notFound } from "next/navigation";

// Define the expected API response type
interface BlogResponse {
  blog: BlogPost;
}

// Dynamic metadata based on slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Define BASE_URL with a fallback
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  // Fetch blog post data directly from the API
  try {
    const response = await fetch(`${BASE_URL}/api/blogs/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for dynamic data
    });

    // Handle response
    let blog: BlogPost | null = null;
    if (response.ok) {
      const data: BlogResponse = await response.json();
      blog = data.blog;
    }

    // Handle errors or not found
    if (!response.ok || !blog) {
      return {
        title: "Blog Not Found | Dapp Mentors",
        description: "The requested blog post could not be found.",
        openGraph: {
          title: "Blog Not Found | Dapp Mentors",
          description: "The requested blog post could not be found.",
          url: `https://dappmentors.org/blog/${slug}`,
          siteName: "Dapp Mentors",
          images: [
            {
              url: "/placeholder-image.svg",
              width: 1200,
              height: 630,
              alt: "Blog Not Found",
            },
          ],
          locale: "en_US",
          type: "article",
        },
        twitter: {
          card: "summary_large_image",
          title: "Blog Not Found | Dapp Mentors",
          description: "The requested blog post could not be found.",
          images: ["/placeholder-image.svg"],
          creator: "@dappmentors",
        },
      };
    }

    return {
      title: `${blog.title} | Dapp Mentors Blog`,
      description: blog.excerpt,
      keywords: blog.topics.concat([
        "blockchain tutorial",
        "web3 guide",
        "dapp mentors",
      ]),
      authors: [{ name: blog.author.name }],
      creator: "Dapp Mentors",
      publisher: "Dapp Mentors",
      openGraph: {
        title: `${blog.title} | Dapp Mentors Blog`,
        description: blog.excerpt,
        url: `https://dappmentors.org/blog/${slug}`,
        siteName: "Dapp Mentors",
        images: [
          {
            url: blog.image || "/placeholder-image.svg",
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        locale: "en_US",
        type: "article",
        publishedTime: new Date(blog.publishDate).toISOString(),
        authors: [blog.author.name],
      },
      twitter: {
        card: "summary_large_image",
        title: `${blog.title} | Dapp Mentors Blog`,
        description: blog.excerpt,
        images: [blog.image || "/placeholder-image.svg"],
        creator: "@dappmentors",
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
        canonical: `https://dappmentors.org/blog/${slug}`,
      },
    };
  } catch (error) {
    console.error(`Failed to fetch blog post for slug ${slug}:`, error);
    return {
      title: "Error | Dapp Mentors Blog",
      description: "An error occurred while fetching the blog post.",
    };
  }
}

// Force dynamic rendering to avoid static prerender errors during build
export const dynamic = "force-dynamic";

// Server component for dynamic route
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  // Fetch blog post data directly from the API
  try {
    const response = await fetch(`${BASE_URL}/api/blogs/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for dynamic data
      credentials: "include", // Include cookies for authentication
    });

    // Handle response
    if (!response.ok) {
      console.error(`API request failed for slug ${slug}: ${response.status}`);
      notFound(); // Trigger Next.js 404 page
    }

    const data: BlogResponse = await response.json();
    const blog: BlogPost = data.blog;

    if (!blog) {
      console.error(`No blog post found for slug ${slug}`);
      notFound(); // Trigger Next.js 404 page
    }

    return <PageClient blogPost={blog} />;
  } catch (error) {
    console.error(`Failed to fetch blog post for slug ${slug}:`, error);
    notFound();
  }
}
