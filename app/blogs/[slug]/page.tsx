import { Metadata } from "next";
import PageClient from "./PageClient";
import { BlogPost } from "@/utils/interfaces";
import { sampleBlogPost } from "@/data/global";

const blogPost: BlogPost = sampleBlogPost;

// Dynamic metadata based on slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // In a real app, fetch the blog post data based on slug
  // const blogPost = await fetchBlogPostBySlug(slug);
  // For now, use the mock data
  return {
    title: `${blogPost.title} | Dapp Mentors Blog`,
    description: blogPost.excerpt,
    keywords: blogPost.topics.concat([
      "blockchain tutorial",
      "web3 guide",
      "dapp mentors",
    ]),
    authors: [{ name: blogPost.author.name }],
    creator: "Dapp Mentors",
    publisher: "Dapp Mentors",
    openGraph: {
      title: `${blogPost.title} | Dapp Mentors Blog`,
      description: blogPost.excerpt,
      url: `https://dappmentors.org/blog/${slug}`, // Replace with your actual domain
      siteName: "Dapp Mentors",
      images: [
        {
          url: "/images/og-blog-post.jpg", // Replace with your Open Graph image for blog posts
          width: 1200,
          height: 630,
          alt: blogPost.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: blogPost.publishDate.toISOString(),
      authors: [blogPost.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blogPost.title} | Dapp Mentors Blog`,
      description: blogPost.excerpt,
      images: ["/images/twitter-blog-post.jpg"], // Replace with your Twitter card image for blog posts
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
      canonical: `https://dappmentors.org/blog/${slug}`, // Replace with your actual domain
    },
  };
}

// Server component for dynamic route
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(`Fetching blog post for slug: ${slug}`);

  // In a real app, fetch the blog post data based on slug
  // const blogPost = await fetchBlogPostBySlug(slug);
  // For now, pass the mock data
  return <PageClient blogPost={{ ...blogPost }} />;
}
