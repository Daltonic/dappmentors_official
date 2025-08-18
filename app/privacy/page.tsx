import { Metadata } from "next";
import PageClient from "./PageClient";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Privacy Policy | Dapp Mentors",
  description:
    "Learn how Dapp Mentors collects, uses, and protects your personal information. Our Privacy Policy outlines our commitment to your privacy and data security.",
  keywords: [
    "privacy policy",
    "dapp mentors privacy",
    "web3 privacy",
    "blockchain data protection",
    "personal information",
    "data security",
    "crypto education privacy",
    "web3 community",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Privacy Policy | Dapp Mentors",
    description:
      "Understand how Dapp Mentors handles your personal information with our transparent Privacy Policy, ensuring your data is secure.",
    url: "https://dappmentors.org/privacy", // Replace with your actual domain
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-privacy.jpg", // Replace with your Open Graph image for the privacy page
        width: 1200,
        height: 630,
        alt: "Dapp Mentors Privacy Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Dapp Mentors",
    description:
      "Discover how Dapp Mentors protects your personal information in our Privacy Policy, designed for transparency and security.",
    images: ["/images/twitter-privacy.jpg"], // Replace with your Twitter card image for the privacy page
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
    canonical: "https://dappmentors.org/privacy", // Replace with your actual domain
  },
};

// Server component that exports metadata
const Page = () => {
  return <PageClient />;
};

export default Page;
