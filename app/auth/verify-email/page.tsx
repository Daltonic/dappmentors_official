// app/auth/verify-email/page.tsx
import { Metadata } from "next";
import PageClient from "./PageClient";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // Force dynamic rendering to handle search params

// Metadata for SEO
export const metadata: Metadata = {
  title: "Verify Email | Dapp Mentors - Confirm Your Web3 Account",
  description:
    "Verify your Dapp Mentors account email to activate access to Web3 courses, mentorship, and community resources.",
  keywords: [
    "verify email dapp mentors",
    "web3 account verification",
    "blockchain email confirmation",
    "web3 courses verify",
    "crypto education verification",
    "dapp mentors email",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Verify Email | Dapp Mentors - Confirm Your Web3 Account",
    description:
      "Confirm your email address for Dapp Mentors to start your Web3 journey with courses and community support.",
    url: "https://dappmentors.org/auth/verify-email", // Replace with your actual domain
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-verify-email.jpg", // Replace with your Open Graph image for the verify email page
        width: 1200,
        height: 630,
        alt: "Dapp Mentors Verify Email - Web3 Account Confirmation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Email | Dapp Mentors - Confirm Your Web3 Account",
    description:
      "Verify your Dapp Mentors email to access Web3 courses, mentorship, and community resources.",
    images: ["/images/twitter-verify-email.jpg"], // Replace with your Twitter card image for the verify email page
    creator: "@dappmentors", // Replace with your Twitter handle
  },
  robots: {
    index: false, // Set to false for verify email page to avoid indexing sensitive pages
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
    canonical: "https://dappmentors.org/auth/verify-email", // Replace with your actual domain
  },
};

// Server component that exports metadata
const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <PageClient />
    </Suspense>
  );
};

export default Page;
