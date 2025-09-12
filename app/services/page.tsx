import { Metadata } from "next";
import PageClient from "./PageClient";
import { Service } from "@/utils/interfaces";

// Define the expected API response type
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

// Dynamic metadata based on fetched services
export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${BASE_URL}/api/services?status=published`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    let services: Service[] = [];
    if (response.ok) {
      const data: ServicesResponse = await response.json();
      services = data.services;
    }

    // Generate dynamic description based on services
    const description = services.length
      ? `Explore Dapp Mentors’ Web3 services: ${services
          .map((s) => s.title.toLowerCase())
          .join(", ")} to empower your blockchain journey.`
      : "Discover Dapp Mentors’ Web3 services, including education, mentorship, professional development, technical writing, and developer hiring.";

    return {
      title: "Dapp Mentors Services | Web3 Education & Development Solutions",
      description,
      keywords: [
        "web3 services",
        "blockchain education",
        "web3 mentorship",
        "blockchain development services",
        "technical writing",
        "web3 developer hiring",
        "dapp mentors services",
        "crypto education",
        ...services.flatMap((s) =>
          s.features ? s.features.map((f) => f.toLowerCase()) : [],
        ),
      ],
      authors: [{ name: "Dapp Mentors" }],
      creator: "Dapp Mentors",
      publisher: "Dapp Mentors",
      openGraph: {
        title: "Dapp Mentors Services | Web3 Education & Development Solutions",
        description,
        url: "https://dappmentors.org/services",
        siteName: "Dapp Mentors",
        images: [
          {
            url: services[0]?.thumbnail || "/images/og-services.jpg",
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
        description,
        images: [services[0]?.thumbnail || "/images/twitter-services.jpg"],
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
        canonical: "https://dappmentors.org/services",
      },
    };
  } catch (error) {
    console.error("Failed to fetch services for metadata:", error);
    return {
      title: "Dapp Mentors Services | Web3 Education & Development Solutions",
      description:
        "Discover Dapp Mentors’ Web3 services, including education, mentorship, professional development, technical writing, and developer hiring to empower your blockchain journey.",
    };
  }
}

// Force dynamic rendering to avoid static prerender errors during build
export const dynamic = "force-dynamic";

// Server component for services page
export default async function Page() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  console.log(`Fetching services data from ${BASE_URL}/api/services`);

  try {
    const response = await fetch(
      `${BASE_URL}/api/services?status=active&featured=true&limit=100`,
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
      return <PageClient services={[]} />;
    }

    const data: ServicesResponse = await response.json();
    const services: Service[] = data.services || [];

    return <PageClient services={services} />;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return <PageClient services={[]} />;
  }
}
