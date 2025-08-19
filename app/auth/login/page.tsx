import { Metadata } from "next";
import PageClient from "./PageClient";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Log In | Dapp Mentors - Access Your Web3 Account",
  description:
    "Log in to your Dapp Mentors account to access Web3 courses, mentorship, and community resources. Continue your blockchain journey today!",
  keywords: [
    "log in dapp mentors",
    "web3 account login",
    "blockchain community login",
    "web3 courses access",
    "crypto education login",
    "dapp mentors authentication",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Log In | Dapp Mentors - Access Your Web3 Account",
    description:
      "Log in to Dapp Mentors to continue your Web3 journey with courses, mentorship, and a vibrant blockchain community.",
    url: "https://dappmentors.org/auth/login", // Replace with your actual domain
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-login.jpg", // Replace with your Open Graph image for the login page
        width: 1200,
        height: 630,
        alt: "Dapp Mentors Log In - Web3 Account Access",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Log In | Dapp Mentors - Access Your Web3 Account",
    description:
      "Log in at Dapp Mentors to access your Web3 courses, mentorship, and community support.",
    images: ["/images/twitter-login.jpg"], // Replace with your Twitter card image for the login page
    creator: "@dappmentors", // Replace with your Twitter handle
  },
  robots: {
    index: false, // Set to false for login page to avoid indexing sensitive pages
    follow: true,
    googleBot: {
      index: false,
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
    canonical: "https://dappmentors.org/auth/login", // Replace with your actual domain
  },
};

// Server component that exports metadata
const Page = () => {
  return <PageClient />;
};

export default Page;
