import { Metadata } from "next";
import PageClient from "./PageClient";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Payment Status | Dapp Mentors",
  description:
    "View your payment status for Dapp Mentors services. Get instant confirmation of successful transactions or assistance with payment issues.",
  keywords: [
    "payment status",
    "dapp mentors payment",
    "web3 payment",
    "blockchain transaction",
    "payment confirmation",
    "crypto payment",
    "web3 education payment",
    "transaction status",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Payment Status | Dapp Mentors",
    description:
      "Check your payment status for Dapp Mentors services with instant transaction confirmation and support.",
    url: "https://dappmentors.org/payment-status", // Replace with your actual domain
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-payment.jpg", // Replace with your Open Graph image for the payment page
        width: 1200,
        height: 630,
        alt: "Dapp Mentors Payment Status",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Status | Dapp Mentors",
    description:
      "Get instant confirmation of your Dapp Mentors payment status and transaction details.",
    images: ["/images/twitter-payment.jpg"], // Replace with your Twitter card image for the payment page
    creator: "@dappmentors", // Replace with your Twitter handle
  },
  robots: {
    index: false, // Payment status pages typically shouldn't be indexed
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with your Google verification code
  },
  alternates: {
    canonical: "https://dappmentors.org/payment-status", // Replace with your actual domain
  },
};

// Server component that exports metadata
const Page = () => {
  return <PageClient />;
};

export default Page;
