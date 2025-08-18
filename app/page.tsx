import { Metadata } from "next";
import PageClient from "./PageClient";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Dapp Mentors - Your Gateway to Web3 Success | Blockchain Academy",
  description:
    "Build, Master, and Thrive in the Decentralized Future. Join 5,450+ developers learning blockchain development with expert-led courses, bootcamps, and hands-on projects.",
  keywords: [
    "blockchain development",
    "web3 courses",
    "smart contracts",
    "solidity tutorial",
    "ethereum development",
    "dapp development",
    "blockchain academy",
    "crypto education",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Dapp Mentors - Your Gateway to Web3 Success",
    description:
      "Join 5,450+ developers learning blockchain development with expert-led courses, bootcamps, and hands-on projects.",
    url: "https://dappmentors.org",
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-home.jpg", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "Dapp Mentors - Blockchain Academy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dapp Mentors - Your Gateway to Web3 Success",
    description:
      "Join 5,450+ developers learning blockchain development with expert-led courses, bootcamps, and hands-on projects.",
    images: ["/images/twitter-card.jpg"], // Add your Twitter card image
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
    canonical: "https://dappmentors.org",
  },
};

// Server component that exports metadata
const Page = () => {
  return <PageClient />;
};

export default Page;
