import { Metadata } from "next";
import PageClient from "./PageClient";
import { Service } from "@/utils/interfaces";
import { notFound } from "next/navigation";

// Define the expected API response type
interface ServiceResponse {
  service: Service;
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

  // Fetch service data directly from the API
  try {
    const response = await fetch(`${BASE_URL}/api/services/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for dynamic data
    });

    // Handle response
    let service: Service | null = null;
    if (response.ok) {
      const data: ServiceResponse = await response.json();
      service = data.service;
    }

    // Handle errors or not found
    if (!response.ok || !service) {
      return {
        title: "Service Not Found | Dapp Mentors",
        description: "The requested service could not be found.",
        openGraph: {
          title: "Service Not Found | Dapp Mentors",
          description: "The requested service could not be found.",
          url: `https://dappmentors.org/services/${slug}`,
          siteName: "Dapp Mentors",
          images: [
            {
              url: "/placeholder-image.svg",
              width: 1280,
              height: 720,
              alt: "Service Not Found",
            },
          ],
          locale: "en_US",
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: "Service Not Found | Dapp Mentors",
          description: "The requested service could not be found.",
          images: ["/placeholder-image.svg"],
          creator: "@dappmentors",
        },
      };
    }

    return {
      title: `${service.title} | Dapp Mentors`,
      description: service.description,
      keywords: [
        "smart contract development",
        "ethereum development",
        "solidity development",
        "blockchain development services",
        "dapp development",
        "multi-chain smart contracts",
        ...(service.features
          ? service.features.map((feature) => feature.title.toLowerCase())
          : []),
        ...(service.technologies
          ? service.technologies.map((tech) => tech.toLowerCase())
          : []),
        ...(service.blockchains
          ? service.blockchains.map((chain) => `${chain} development`)
          : []),
      ],
      authors: [{ name: service.lead }],
      creator: "Dapp Mentors",
      publisher: "Dapp Mentors",
      openGraph: {
        title: `${service.title} | Dapp Mentors`,
        description: service.description,
        url: `https://dappmentors.org/services/${slug}`,
        siteName: "Dapp Mentors",
        images: [
          {
            url: service.thumbnail || "/placeholder-image.svg",
            width: 1280,
            height: 720,
            alt: service.title,
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${service.title} | Dapp Mentors`,
        description: service.description,
        images: [service.thumbnail || "/placeholder-image.svg"],
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
        canonical: `https://dappmentors.org/services/${slug}`,
      },
    };
  } catch (error) {
    console.error(`Failed to fetch service for slug ${slug}:`, error);
    return {
      title: "Error | Dapp Mentors",
      description: "An error occurred while fetching the service.",
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

  // Fetch service data directly from the API
  try {
    const response = await fetch(`${BASE_URL}/api/services/${slug}`, {
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

    const data: ServiceResponse = await response.json();
    const service: Service = data.service;

    if (!service) {
      console.error(`No service found for slug ${slug}`);
      notFound(); // Trigger Next.js 404 page
    }

    return <PageClient service={service} />;
  } catch (error) {
    console.error(`Failed to fetch service for slug ${slug}:`, error);
    notFound();
  }
}
