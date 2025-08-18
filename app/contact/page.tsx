import { Metadata } from "next";
import PageClient from "./PageClient";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Contact Dapp Mentors | Get Support for Your Web3 Journey",
  description:
    "Reach out to Dapp Mentors for questions about our blockchain tutorials, Academy membership, or professional Web3 development services. Join our community today!",
  keywords: [
    "contact dapp mentors",
    "web3 support",
    "blockchain mentorship",
    "web3 development services",
    "blockchain academy",
    "crypto education",
    "dapp development",
    "web3 community",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Contact Dapp Mentors | Get Support for Your Web3 Journey",
    description:
      "Connect with Dapp Mentors for blockchain tutorials, Academy membership, or Web3 development services. Let’s build the decentralized future together!",
    url: "https://dappmentors.org/contact", // Replace with your actual domain
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-contact.jpg", // Replace with your Open Graph image for the contact page
        width: 1200,
        height: 630,
        alt: "Contact Dapp Mentors - Blockchain Academy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Dapp Mentors | Get Support for Your Web3 Journey",
    description:
      "Reach out for blockchain tutorials, mentorship, or Web3 services at Dapp Mentors. Join our community!",
    images: ["/images/twitter-contact.jpg"], // Replace with your Twitter card image for the contact page
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
    canonical: "https://dappmentors.org/contact", // Replace with your actual domain
  },
};

// Server component that exports metadata
const Page = () => {
  return <PageClient />;
};

export default Page;
