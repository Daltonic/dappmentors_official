// page.tsx
import { Metadata } from "next";
import { Suspense } from "react"; // Import Suspense
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
    url: "https://dappmentors.org/payment-status",
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-payment.jpg",
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
    images: ["/images/twitter-payment.jpg"],
    creator: "@dappmentors",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://dappmentors.org/payment-status",
  },
};

// Server component that wraps PageClient with Suspense
const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <PageClient />
    </Suspense>
  );
};

export default Page;
