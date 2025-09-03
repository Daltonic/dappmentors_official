import { Metadata } from "next";
import PageClient from "./PageClient";
import { serviceData } from "@/data/global";

// Dynamic metadata based on slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // In a real app, fetch the service data based on slug
  // For now, use the mock data
  const service = serviceData;

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
      ...service.features.map((feature) => feature.title.toLowerCase()),
      ...service.technologies.map((tech) => tech.toLowerCase()),
      ...service.blockchains.map((chain) => `${chain} development`),
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
          url: service.thumbnail,
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
      images: [service.thumbnail],
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
}

// Server component for dynamic route
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(`Fetching service data for slug: ${slug}`);

  // In a real app, fetch the service data based on slug
  // For now, use the mock data
  const service = {
    ...serviceData,
  };

  return <PageClient service={service} />;
}
