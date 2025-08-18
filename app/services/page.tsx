import { Metadata } from "next";
import PageClient from "./PageClient";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Dapp Mentors Services | Web3 Education & Development Solutions",
  description:
    "Discover Dapp Mentors’ Web3 services, including education, mentorship, professional development, technical writing, and developer hiring to empower your blockchain journey.",
  keywords: [
    "web3 services",
    "blockchain education",
    "web3 mentorship",
    "blockchain development services",
    "technical writing",
    "web3 developer hiring",
    "dapp mentors services",
    "crypto education",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Dapp Mentors Services | Web3 Education & Development Solutions",
    description:
      "From Web3 education to professional development and developer hiring, Dapp Mentors provides expert solutions to bring your blockchain vision to life.",
    url: "https://dappmentors.org/services", // Replace with your actual domain
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-services.jpg", // Replace with your Open Graph image for the services page
        width: 1200,
        height: 630,
        alt: "Dapp Mentors Services - Web3 Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dapp Mentors Services | Web3 Education & Development Solutions",
    description:
      "Explore Dapp Mentors’ services: Web3 education, mentorship, professional development, technical writing, and developer hiring for your blockchain journey.",
    images: ["/images/twitter-services.jpg"], // Replace with your Twitter card image for the services page
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
    canonical: "https://dappmentors.org/services", // Replace with your actual domain
  },
};

// Server component that exports metadata
const Page = () => {
  return <PageClient />;
};

export default Page;
