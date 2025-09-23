import { Metadata } from "next";
import PageClient from "./PageClient";
import { Product, Service, BlogPost } from "@/utils/interfaces";

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

interface ServicesResponse {
  services: Service[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalServices: number;
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

interface BlogsResponse {
  blogs: BlogPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalBlogs: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search: string;
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

// Force dynamic rendering to avoid static prerender errors during build
export const dynamic = "force-dynamic";

export default async function Page() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  // Fetch products
  console.log(
    `Fetching featured products from ${BASE_URL}/api/products?status=published&featured=true&limit=6`,
  );
  let products: Product[] = [];
  try {
    const productsResponse = await fetch(
      `${BASE_URL}/api/products?status=published&featured=true&limit=6`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (productsResponse.ok) {
      const data: ProductsResponse = await productsResponse.json();
      products = data.products || [];
    } else {
      console.error(`Products API request failed: ${productsResponse.status}`);
    }
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }

  // Fetch services
  console.log(
    `Fetching services data from ${BASE_URL}/api/services?status=active&featured=true&limit=6`,
  );
  let services: Service[] = [];
  try {
    const servicesResponse = await fetch(
      `${BASE_URL}/api/services?status=active&featured=true&limit=6`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (servicesResponse.ok) {
      const data: ServicesResponse = await servicesResponse.json();
      // Map API services to match ServicesSection's Service type
      services = data.services || [];
    } else {
      console.error(`Services API request failed: ${servicesResponse.status}`);
    }
  } catch (error) {
    console.error("Failed to fetch services:", error);
  }

  // Fetch recent blogs
  console.log(
    `Fetching recent blogs from ${BASE_URL}/api/blogs?status=published&limit=6&sortBy=publishDate&sortOrder=desc`,
  );
  let blogs: BlogPost[] = [];
  try {
    const blogsResponse = await fetch(
      `${BASE_URL}/api/blogs?status=published&limit=6&sortBy=publishDate&sortOrder=desc`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (blogsResponse.ok) {
      const data: BlogsResponse = await blogsResponse.json();
      blogs = data.blogs || [];
    } else {
      console.error(`Blogs API request failed: ${blogsResponse.status}`);
    }
  } catch (error) {
    console.error("Failed to fetch recent blogs:", error);
  }

  return <PageClient products={products} services={services} blogs={blogs} />;
}
