import { Metadata } from "next";
import PageClient from "./PageClient";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Sign Up | Dapp Mentors - Join the Web3 Community",
  description:
    "Create an account with Dapp Mentors to access Web3 courses, mentorship, and community resources. Start your blockchain journey today!",
  keywords: [
    "sign up dapp mentors",
    "web3 account creation",
    "blockchain community",
    "web3 courses signup",
    "crypto education account",
    "dapp mentors registration",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Sign Up | Dapp Mentors - Join the Web3 Community",
    description:
      "Join Dapp Mentors to explore Web3 courses, mentorship, and a vibrant blockchain community. Sign up now!",
    url: "https://dappmentors.org/auth/signup", // Replace with your actual domain
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-signup.jpg", // Replace with your Open Graph image for the signup page
        width: 1200,
        height: 630,
        alt: "Dapp Mentors Sign Up - Web3 Community",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | Dapp Mentors - Join the Web3 Community",
    description:
      "Sign up at Dapp Mentors to start your Web3 journey with courses, mentorship, and community support.",
    images: ["/images/twitter-signup.jpg"], // Replace with your Twitter card image for the signup page
    creator: "@dappmentors", // Replace with your Twitter handle
  },
  robots: {
    index: false, // Set to false for signup page to avoid indexing sensitive pages
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
    canonical: "https://dappmentors.org/auth/signup", // Replace with your actual domain
  },
};

// Server component that exports metadata
const Page = () => {
  return <PageClient />;
};

export default Page;
