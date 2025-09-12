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

// Dynamic metadata based on fetched products
export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${BASE_URL}/api/products?status=published`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    let products: Product[] = [];
    if (response.ok) {
      const data: ProductsResponse = await response.json();
      products = data.products;
    }

    // Generate dynamic description based on products
    const description = products.length
      ? `Explore Dapp Mentors’ Web3 products: ${products
          .map((p) => p.title.toLowerCase())
          .join(", ")} to master blockchain development.`
      : "Explore Dapp Mentors’ premium Web3 products, including courses, bootcamps, codebases, and eBooks.";

    return {
      title: "Dapp Mentors Products | Web3 Courses, Bootcamps & Codebases",
      description,
      keywords: [
        "web3 courses",
        "blockchain bootcamps",
        "smart contract codebases",
        "web3 ebooks",
        "blockchain development",
        "dapp mentors products",
        "crypto education",
        "web3 learning",
        ...products.flatMap((p) =>
          p.features ? p.features.map((f) => f.title.toLowerCase()) : [],
        ),
      ],
      authors: [{ name: "Dapp Mentors" }],
      creator: "Dapp Mentors",
      publisher: "Dapp Mentors",
      openGraph: {
        title: "Dapp Mentors Products | Web3 Courses, Bootcamps & Codebases",
        description,
        url: "https://dappmentors.org/products",
        siteName: "Dapp Mentors",
        images: [
          {
            url: products[0]?.imageUrl || "/images/og-products.jpg",
            width: 1200,
            height: 630,
            alt: "Dapp Mentors Products - Blockchain Mastery",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Dapp Mentors Products | Web3 Courses, Bootcamps & Codebases",
        description,
        images: [products[0]?.imageUrl || "/images/twitter-products.jpg"],
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
        canonical: "https://dappmentors.org/products",
      },
    };
  } catch (error) {
    console.error("Failed to fetch products for metadata:", error);
    return {
      title: "Dapp Mentors Products | Web3 Courses, Bootcamps & Codebases",
      description:
        "Explore Dapp Mentors’ premium Web3 products, including courses, bootcamps, codebases, and eBooks.",
    };
  }
}

// Force dynamic rendering to avoid static prerender errors during build
export const dynamic = "force-dynamic";

// Server component for products page
export default async function Page() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  console.log(`Fetching products data from ${BASE_URL}/api/products`);

  try {
    const response = await fetch(
      `${BASE_URL}/api/products?status=published&featured=true&limit=100`, // Increased limit
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
    console.error("Failed to fetch products:", error);
    return <PageClient products={[]} />;
  }
}
