// app/products/[slug]/page.tsx
import { Metadata } from "next";
import PageClient from "./PageClient";
import { Product } from "@/utils/interfaces";
import { notFound } from "next/navigation";

// Define the expected API response type
interface ProductResponse {
  product: Product;
}

// Dynamic metadata based on slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Define BASE_URL with a fallback
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  // Fetch product data directly from the API
  try {
    const response = await fetch(`${BASE_URL}/api/products/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for dynamic data
    });

    // Handle response
    let product: Product | null = null;
    if (response.ok) {
      const data: ProductResponse = await response.json();
      product = data.product;
    }

    // Handle errors or not found
    if (!response.ok || !product) {
      return {
        title: "Product Not Found | Dapp Mentors",
        description: "The requested product could not be found.",
        openGraph: {
          title: "Product Not Found | Dapp Mentors",
          description: "The requested product could not be found.",
          url: `https://dappmentors.org/products/${slug}`,
          siteName: "Dapp Mentors",
          images: [
            {
              url: "/placeholder-image.svg",
              width: 1280,
              height: 720,
              alt: "Product Not Found",
            },
          ],
          locale: "en_US",
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: "Product Not Found | Dapp Mentors",
          description: "The requested product could not be found.",
          images: ["/placeholder-image.svg"],
          creator: "@dappmentors",
        },
      };
    }

    return {
      title: `${product.title} | Dapp Mentors`,
      description: product.description,
      keywords: [
        "web3 course",
        "blockchain development",
        "smart contract course",
        "dapp mentors",
        "crypto education",
        ...(product.features
          ? product.features.map((feature) => feature.title.toLowerCase())
          : []),
      ],
      authors: [{ name: product.instructor.name }],
      creator: "Dapp Mentors",
      publisher: "Dapp Mentors",
      openGraph: {
        title: `${product.title} | Dapp Mentors`,
        description: product.description,
        url: `https://dappmentors.org/products/${slug}`,
        siteName: "Dapp Mentors",
        images: [
          {
            url: product.imageUrl || "/placeholder-image.svg",
            width: 1280,
            height: 720,
            alt: product.title,
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.title} | Dapp Mentors`,
        description: product.description,
        images: [product.imageUrl || "/placeholder-image.svg"],
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
        google: "your-google-verification-code", // Replace with your Google verification code
      },
      alternates: {
        canonical: `https://dappmentors.org/products/${slug}`,
      },
    };
  } catch (error) {
    console.error(`Failed to fetch product for slug ${slug}:`, error);
    return {
      title: "Error | Dapp Mentors",
      description: "An error occurred while fetching the product.",
    };
  }
}

// Server component for dynamic route
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  // Fetch product data directly from the API
  try {
    const response = await fetch(`${BASE_URL}/api/products/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for dynamic data
    });

    // Handle response
    if (!response.ok) {
      console.error(`API request failed for slug ${slug}: ${response.status}`);
      notFound(); // Trigger Next.js 404 page
    }

    const data: ProductResponse = await response.json();
    const product: Product = data.product;

    if (!product) {
      console.error(`No product found for slug ${slug}`);
      notFound(); // Trigger Next.js 404 page
    }

    return <PageClient product={product} />;
  } catch (error) {
    console.error(`Failed to fetch product for slug ${slug}:`, error);
    notFound();
  }
}
