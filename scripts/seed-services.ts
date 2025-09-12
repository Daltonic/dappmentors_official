#!/usr/bin/env node

import { MongoClient, ObjectId } from "mongodb";
import { fileURLToPath } from "node:url";
import * as dotenv from "dotenv";
import { Service, ServiceType } from "@/utils/interfaces";

dotenv.config();

// Configuration
const DATABASE_NAME: string = "dapp_mentors_official";
const COLLECTION_NAME: string = "services";
const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017";
const NUM_SERVICES: number = parseInt(process.env.NUM_ITEM || "50", 10);

const SERVICE_TYPES: ServiceType[] = [
  "Hiring",
  "Education",
  "Mentorship",
  "Professional",
  "Writing",
];

// Data pools for random generation
const SERVICE_TITLES: string[] = [
  "Smart Contract Development",
  "Full-Stack dApp Development",
  "Decentralized Storage & Identity",
  "Blockchain Consulting Services",
  "Web3 Security Auditing",
  "DeFi Protocol Implementation",
  "NFT Marketplace Development",
  "DAO Governance Solutions",
  "Cross-Chain Bridge Building",
  "Tokenomics Design & Consulting",
  "Layer 2 Scaling Solutions",
  "Decentralized Finance Tools",
  "Web3 Game Development",
  "Metaverse Platform Creation",
  "Cryptocurrency Wallet Development",
];

const ICONS: string[] = [
  "⚡",
  "🌐",
  "🛡️",
  "📊",
  "🔒",
  "💰",
  "🎨",
  "🏛️",
  "🔗",
  "📈",
  "🚀",
  "🎮",
  "🌌",
  "🔑",
];

const FEATURES_POOL: string[] = [
  "Solidity & Rust Support",
  "Multi-chain Compatibility",
  "Comprehensive Security Audits",
  "Gas Usage Optimization",
  "React & Next.js Integration",
  "TypeScript Development",
  "Modern UI/UX Design",
  "Web3.js & Ethers.js",
  "IPFS Content Storage",
  "Filecoin & Arweave Integration",
  "Decentralized Identity (DID) Systems",
  "Enhanced Data Security",
  "Custom Protocol Design",
  "Yield Farming Implementation",
  "Governance Module Development",
  "Bridge Protocol Creation",
  "Token Distribution Models",
  "Economic Incentive Systems",
  "Scalability Solutions",
  "Cross-Chain Functionality",
];

const PACKAGE_NAMES: string[] = [
  "Basic",
  "Standard",
  "Premium",
  "Enterprise",
  "Custom",
];

const FAQS_POOL = [
  {
    question: "What is the typical turnaround time?",
    answer:
      "Our projects usually take 2-8 weeks depending on complexity and scope.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer maintenance packages and post-launch support.",
  },
  {
    question: "Which blockchains do you support?",
    answer: "We work with Ethereum, Solana, Polygon, BSC, and many others.",
  },
  {
    question: "Is security auditing included?",
    answer:
      "Basic security review is included; full third-party audits available.",
  },
  {
    question: "Can the service be customized?",
    answer:
      "All our services are tailored to meet specific client requirements.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept major cryptocurrencies and fiat payments via bank transfer.",
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes, client confidentiality is our top priority.",
  },
  {
    question: "What if I need changes after completion?",
    answer: "We provide revision rounds as part of the project scope.",
  },
];

// List of valid Pexels image URLs (same as products for consistency)
const VALID_PEXELS_IMAGES: string[] = [
  "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

// Define durations for service packages
const PACKAGE_DURATIONS: string[] = [
  "1 month",
  "2-3 months",
  "3-6 months",
  "6-12 months",
  "Ongoing",
  "Custom",
];

// Utility functions
const randomChoice = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];
const randomChoices = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Generate slug from title
const generateSlug = (title: string, id: ObjectId): string => {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-") +
    "-" +
    id.toString().slice(-12)
  );
};

// Generate random image URL
const generateImageUrl = (): string => {
  return randomChoice(VALID_PEXELS_IMAGES);
};

// Generate service data
const generateService = (): Service => {
  const _id: ObjectId = new ObjectId();
  const title: string = randomChoice(SERVICE_TITLES);
  const description: string = `Expert ${title.toLowerCase()} services. We design, develop, and audit secure solutions using cutting-edge technologies.`;
  const price: number | string =
    Math.random() < 0.3 ? "Custom Quote" : randomInt(999, 9999);
  const status: "active" | "inactive" | "coming-soon" = randomChoice([
    "active",
    "active",
    "active",
    "inactive",
    "coming-soon",
  ]);
  const createdAt: Date = new Date(
    Date.now() - randomInt(30, 365) * 24 * 60 * 60 * 1000,
  );
  const updatedAt: Date = new Date(
    createdAt.getTime() + randomInt(1, 30) * 24 * 60 * 60 * 1000,
  );
  const featured: boolean = Math.random() < 0.2;
  const thumbnail: string = generateImageUrl();
  const slug: string = generateSlug(title, _id);
  const features: string[] = randomChoices(FEATURES_POOL, randomInt(3, 6));
  const faqs = randomChoices(FAQS_POOL, randomInt(3, 5));
  const icon: string = randomChoice(ICONS);
  const clients: number = randomInt(10, 500);
  const type: ServiceType = randomChoice(SERVICE_TYPES); // Add random service type

  const packages = [];
  const numPackages: number = randomInt(1, 3);
  for (let i = 0; i < numPackages; i++) {
    packages.push({
      name: PACKAGE_NAMES[i],
      price: Math.random() < 0.2 ? "Custom" : randomInt(500, 5000).toString(),
      duration: randomChoice(PACKAGE_DURATIONS),
      features: randomChoices(FEATURES_POOL, randomInt(3, 5)),
      popular: Math.random() < 0.3,
    });
  }

  return {
    _id,
    id: _id.toString(),
    title,
    description,
    price,
    status,
    createdAt,
    updatedAt,
    featured,
    thumbnail,
    slug,
    features,
    faqs,
    icon,
    clients,
    packages,
    type, // Include the type
  };
};

// Main execution function
async function seedDatabase(): Promise<void> {
  let client: MongoClient | undefined;

  try {
    console.log("🚀 Starting database seeding...");
    console.log(`📊 Generating ${NUM_SERVICES} services...`);

    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DATABASE_NAME);
    const collection = db.collection<Service>(COLLECTION_NAME);

    // Generate services
    const services: Service[] = [];
    for (let i = 0; i < NUM_SERVICES; i++) {
      services.push(generateService());
    }

    // Clear existing services (optional)
    const shouldClear: boolean = process.env.CLEAR_EXISTING === "true";
    if (shouldClear) {
      const deleteResult = await collection.deleteMany({});
      console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing services`);
    }

    // Insert services
    const result = await collection.insertMany(services);
    console.log(`✅ Inserted ${result.insertedCount} services successfully!`);

    // Create indexes for better performance
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ status: 1 });
    await collection.createIndex({ featured: 1 });
    await collection.createIndex({ createdAt: -1 });

    console.log("📊 Created database indexes");
  } catch (error: unknown) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("🔌 Disconnected from MongoDB");
    }
  }
}

// Run if called directly (ES module compatible)
const __filename: string = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  seedDatabase()
    .then(() => {
      console.log("🎉 Database seeding completed!");
      process.exit(0);
    })
    .catch((error: unknown) => {
      console.error("💥 Seeding failed:", error);
      process.exit(1);
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { generateService, seedDatabase };
