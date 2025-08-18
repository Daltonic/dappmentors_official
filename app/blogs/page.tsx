import { Metadata } from "next";
import PageClient from "./PageClient";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Dapp Mentors Blog | Web3 & Blockchain Development Insights",
  description:
    "Explore free, high-quality tutorials, guides, and insights on blockchain development, Web3, smart contracts, and more from Dapp Mentors’ expert team.",
  keywords: [
    "web3 blog",
    "blockchain tutorials",
    "smart contract guides",
    "web3 development",
    "blockchain development",
    "crypto tutorials",
    "dapp mentors blog",
    "web3 insights",
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
        url: "/images/og-blog.jpg", // Replace with your Open Graph image for the blog page
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
    images: ["/images/twitter-blog.jpg"], // Replace with your Twitter card image for the blog page
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
    canonical: "https://dappmentors.org/blog", // Replace with your actual domain
  },
};

// Server component that exports metadata
const Page = () => {
  return <PageClient />;
};

export default Page;
