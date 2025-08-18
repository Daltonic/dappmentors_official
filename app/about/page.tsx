// app/about/page.tsx
import { Metadata } from "next";
import PageClient from "./PageClient";

// Metadata for SEO
export const metadata: Metadata = {
  title: "About Dapp Mentors | Empowering Web3 Innovators",
  description:
    "Learn about Dapp Mentors: Empowering the next generation of Web3 innovators through education, mentorship, and hands-on support in blockchain development.",
  keywords: [
    "about dapp mentors",
    "blockchain academy",
    "web3 education",
    "blockchain mentorship",
    "dapp development",
    "crypto community",
    "web3 innovators",
    "decentralized future",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "About Dapp Mentors | Empowering Web3 Innovators",
    description:
      "Discover how Dapp Mentors is empowering the next generation of Web3 innovators through expert-led education, mentorship, and hands-on blockchain projects.",
    url: "https://dappmentors.org/about",
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-about.jpg", // Add your Open Graph image for About page
        width: 1200,
        height: 630,
        alt: "About Dapp Mentors - Blockchain Academy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dapp Mentors | Empowering Web3 Innovators",
    description:
      "Learn about Dapp Mentors: Empowering Web3 innovators with education, mentorship, and hands-on support in blockchain development.",
    images: ["/images/twitter-about.jpg"], // Add your Twitter card image for About page
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
    canonical: "https://dappmentors.org/about",
  },
};

// Server component that exports metadata
const Page = () => {
  return <PageClient />;
};

export default Page;
