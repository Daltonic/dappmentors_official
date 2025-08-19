import { Metadata } from "next";
import PageClient from "./PageClient";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Forgot Password | Dapp Mentors - Reset Your Web3 Account",
  description:
    "Reset your Dapp Mentors account password with ease. Enter your email to receive instructions and regain access to your Web3 resources.",
  keywords: [
    "forgot password dapp mentors",
    "web3 account reset",
    "blockchain password recovery",
    "web3 login help",
    "crypto education reset",
    "dapp mentors password",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Forgot Password | Dapp Mentors - Reset Your Web3 Account",
    description:
      "Recover your Dapp Mentors account by resetting your password. Get instructions sent to your email now!",
    url: "https://dappmentors.org/auth/forgot-password", // Replace with your actual domain
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-forgot-password.jpg", // Replace with your Open Graph image for the forgot password page
        width: 1200,
        height: 630,
        alt: "Dapp Mentors Forgot Password - Web3 Account Recovery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forgot Password | Dapp Mentors - Reset Your Web3 Account",
    description:
      "Reset your Dapp Mentors password to regain access to Web3 courses and community resources.",
    images: ["/images/twitter-forgot-password.jpg"], // Replace with your Twitter card image for the forgot password page
    creator: "@dappmentors", // Replace with your Twitter handle
  },
  robots: {
    index: false, // Set to false for forgot password page to avoid indexing sensitive pages
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
    canonical: "https://dappmentors.org/auth/forgot-password", // Replace with your actual domain
  },
};

// Server component that exports metadata
const Page = () => {
  return <PageClient />;
};

export default Page;
