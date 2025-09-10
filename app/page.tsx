import { Metadata } from "next";
import PageClient from "./PageClient";
import { Product } from "@/utils/interfaces";

// Define the expected API response type
interface ProductsResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search: string;
    type: string;
    status: string;
    category: string;
    featured: string;
  };
}

// Metadata for SEO
export const metadata: Metadata = {
  title: "Dapp Mentors - Your Gateway to Web3 Success | Blockchain Academy",
  description:
    "Build, Master, and Thrive in the Decentralized Future. Join 5,450+ developers learning blockchain development with expert-led courses, bootcamps, and hands-on projects.",
  keywords: [
    "blockchain development",
    "web3 courses",
    "smart contracts",
    "solidity tutorial",
    "ethereum development",
    "dapp development",
    "blockchain academy",
    "crypto education",
  ],
  authors: [{ name: "Dapp Mentors" }],
  creator: "Dapp Mentors",
  publisher: "Dapp Mentors",
  openGraph: {
    title: "Dapp Mentors - Your Gateway to Web3 Success",
    description:
      "Join 5,450+ developers learning blockchain development with expert-led courses, bootcamps, and hands-on projects.",
    url: "https://dappmentors.org",
    siteName: "Dapp Mentors",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Dapp Mentors - Blockchain Academy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dapp Mentors - Your Gateway to Web3 Success",
    description:
      "Join 5,450+ developers learning blockchain development with expert-led courses, bootcamps, and hands-on projects.",
    images: ["/images/twitter-card.jpg"],
    creator: "@dappmentors",
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
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://dappmentors.org",
  },
};

// Server component that fetches featured products
export default async function Page() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  console.log(
    `Fetching featured products from ${BASE_URL}/api/products?status=published&featured=true`,
  );

  try {
    const response = await fetch(
      `${BASE_URL}/api/products?status=published&featured=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(`API request failed: ${response.status}`);
      return <PageClient products={[]} />;
    }

    const data: ProductsResponse = await response.json();
    const products: Product[] = data.products || [];

    return <PageClient products={products} />;
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    return <PageClient products={[]} />;
  }
}
