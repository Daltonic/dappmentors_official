import { Metadata } from "next";
import PageClient from "./PageClient";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Dapp Mentors Products | Web3 Courses, Bootcamps & Codebases",
  description:
    "Explore Dapp Mentors’ premium Web3 products, including courses, bootcamps, codebases, and eBooks to master blockchain development and accelerate your projects.",
  keywords: [
    "web3 courses",
    "blockchain bootcamps",
    "smart contract codebases",
    "web3 ebooks",
    "blockchain development",
    "dapp mentors products",
    "crypto education",
    "web3 learning",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Dapp Mentors Products | Web3 Courses, Bootcamps & Codebases",
    description:
      "Master blockchain development with Dapp Mentors’ premium courses, bootcamps, codebases, and eBooks designed for all skill levels.",
    url: "https://dappmentors.org/products", // Replace with your actual domain
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-products.jpg", // Replace with your Open Graph image for the products page
        width: 1200,
        height: 630,
        alt: "Dapp Mentors Products - Blockchain Mastery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dapp Mentors Products | Web3 Courses, Bootcamps & Codebases",
    description:
      "Discover premium Web3 courses, bootcamps, codebases, and eBooks at Dapp Mentors to fast-track your blockchain development journey.",
    images: ["/images/twitter-products.jpg"], // Replace with your Twitter card image for the products page
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
    canonical: "https://dappmentors.org/products", // Replace with your actual domain
  },
};

// Server component that exports metadata
const Page = () => {
  return <PageClient />;
};

export default Page;
