import { Metadata } from "next";
import PageClient from "./PageClient";
import { Product } from "@/utils/interfaces";
import { sampleProduct } from "@/data/global";

// Dynamic metadata based on slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product: Product = sampleProduct;

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
      url: `https://dappmentors.org/products/${slug}`, // Replace with your actual domain
      siteName: "Dapp Mentors",
      images: [
        {
          url: product.imageUrl || "/placeholder-image.svg", // Fallback for undefined imageUrl
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
      images: [product.imageUrl || "/placeholder-image.svg"], // Fallback for undefined imageUrl
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
      canonical: `https://dappmentors.org/products/${slug}`, // Replace with your actual domain
    },
  };
}

// Server component for dynamic route
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(`Fetching product data for slug: ${slug}`);

  // In a real app, fetch the product data based on slug
  // const product = await fetchProductBySlug(slug);
  // For now, use the mock data
  const product: Product = sampleProduct;

  return <PageClient product={product} />;
}
