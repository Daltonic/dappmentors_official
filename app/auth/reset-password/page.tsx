// app/auth/reset-password/page.tsx
import { Metadata } from "next";
import PageClient from "./PageClient";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // Force dynamic rendering to handle search params

// Metadata for SEO
export const metadata: Metadata = {
  title: "Reset Password | Dapp Mentors - Secure Your Web3 Account",
  description:
    "Reset your Dapp Mentors account password securely. Use the reset link to create a new password and regain access to your Web3 resources.",
  keywords: [
    "reset password dapp mentors",
    "web3 password reset",
    "blockchain account recovery",
    "web3 login reset",
    "crypto education password",
    "dapp mentors reset",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Reset Password | Dapp Mentors - Secure Your Web3 Account",
    description:
      "Reset your Dapp Mentors password with a secure link. Create a new password to access your Web3 courses and community.",
    url: "https://dappmentors.org/auth/reset-password", // Replace with your actual domain
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-reset-password.jpg", // Replace with your Open Graph image for the reset password page
        width: 1200,
        height: 630,
        alt: "Dapp Mentors Reset Password - Web3 Account Security",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reset Password | Dapp Mentors - Secure Your Web3 Account",
    description:
      "Reset your Dapp Mentors password securely to access Web3 courses and community resources.",
    images: ["/images/twitter-reset-password.jpg"], // Replace with your Twitter card image for the reset password page
    creator: "@dappmentors", // Replace with your Twitter handle
  },
  robots: {
    index: false, // Set to false for reset password page to avoid indexing sensitive pages
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
    canonical: "https://dappmentors.org/auth/reset-password", // Replace with your actual domain
  },
};

// Server component that exports metadata
export default function Page() {
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
}
