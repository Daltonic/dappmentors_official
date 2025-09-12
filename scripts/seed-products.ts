#!/usr/bin/env node

import { MongoClient, ObjectId } from "mongodb";
import { fileURLToPath } from "node:url";
import * as dotenv from "dotenv";
import { Product, ProductType } from "@/utils/interfaces";

dotenv.config();

// Configuration
const DATABASE_NAME: string = "dapp_mentors_official";
const COLLECTION_NAME: string = "products";
const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017";
const NUM_PRODUCTS: number = parseInt(process.env.NUM_ITEM || "50", 10);

// Data pools for random generation
const PRODUCT_TYPES: ProductType[] = [
  "Course",
  "Bootcamp",
  "EBook",
  "Codebase",
];

const CATEGORIES: string[] = [
  "Blockchain",
  "Web3",
  "DeFi",
  "Smart Contracts",
  "NFT",
  "Cryptocurrency",
  "Metaverse",
  "GameFi",
  "DAOs",
  "Layer 2",
];

const DIFFICULTIES: string[] = ["Beginner", "Intermediate", "Advanced"];

const DURATIONS: Record<ProductType, string[]> = {
  Course: ["2-4 weeks", "4-8 weeks", "8-12 weeks", "3-6 months"],
  Bootcamp: ["2-3 months", "3-6 months", "6-12 months"],
  EBook: ["Self-paced", "1-2 weeks", "2-4 weeks"],
  Codebase: ["Instant download", "Self-paced", "Lifetime access"],
};

const TECHNOLOGIES: string[] = [
  "Solidity",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Web3.js",
  "Ethers.js",
  "Hardhat",
  "Truffle",
  "Ganache",
  "MetaMask",
  "IPFS",
  "The Graph",
  "Chainlink",
  "Polygon",
  "Arbitrum",
  "Ethereum",
  "Bitcoin",
  "Binance Smart Chain",
  "Avalanche",
  "Cardano",
];

const INSTRUCTORS = [
  {
    name: "Dr. Emily Carter",
    bio: "PhD in Computer Science with 10+ years in blockchain and AI research.",
    avatar: "👩‍💻",
    credentials: [
      "PhD in Computer Science",
      "Certified Blockchain Developer",
      "AI Research Fellow at MIT",
    ],
  },
  {
    name: "Michael Rodriguez",
    bio: "Senior blockchain engineer with experience at top DeFi protocols.",
    avatar: "👨‍💻",
    credentials: [
      "Senior Software Engineer",
      "DeFi Protocol Developer",
      "Smart Contract Auditor",
    ],
  },
  {
    name: "Sarah Chen",
    bio: "Web3 entrepreneur and educator with 8+ years in the crypto space.",
    avatar: "👩‍💼",
    credentials: [
      "Web3 Entrepreneur",
      "Blockchain Consultant",
      "Y Combinator Alumni",
    ],
  },
  {
    name: "Alex Thompson",
    bio: "Former Google engineer turned Web3 developer and instructor.",
    avatar: "👨‍🔬",
    credentials: [
      "Ex-Google Engineer",
      "Full-Stack Web3 Developer",
      "Technical Writer",
    ],
  },
  {
    name: "Dr. Priya Sharma",
    bio: "Cryptocurrency researcher and DeFi protocol architect.",
    avatar: "👩‍🔬",
    credentials: [
      "PhD in Cryptography",
      "DeFi Protocol Architect",
      "Research Scientist",
    ],
  },
];

const COURSE_TITLES: string[] = [
  "Complete Ethereum Development",
  "DeFi Protocol Development",
  "NFT Marketplace Creation",
  "Smart Contract Security",
  "Web3 Frontend Development",
  "Blockchain Game Development",
  "DAO Governance Systems",
  "Cross-Chain Bridge Development",
  "Layer 2 Scaling Solutions",
  "Decentralized Identity Systems",
  "Yield Farming Strategies",
  "Flash Loan Development",
  "MEV and Arbitrage Trading",
  "Tokenomics Design",
  "Blockchain Data Analytics",
];

const BOOTCAMP_TITLES: string[] = [
  "Full-Stack Web3 Developer Bootcamp",
  "DeFi Developer Intensive",
  "Blockchain Security Expert Program",
  "NFT Creator Bootcamp",
  "Smart Contract Auditor Training",
  "Web3 Product Manager Program",
  "Cryptocurrency Trading Bootcamp",
];

const EBOOK_TITLES: string[] = [
  "The Complete Guide to DeFi",
  "Smart Contract Best Practices",
  "Web3 Security Handbook",
  "NFT Creator's Manual",
  "Blockchain Developer's Toolkit",
  "DeFi Yield Farming Guide",
  "DAO Governance Strategies",
];

const CODEBASE_TITLES: string[] = [
  "ERC20 Token Implementation",
  "NFT Collection Smart Contracts",
  "DeFi Lending Protocol Codebase",
  "DAO Voting and Governance System",
  "Cross-Chain Bridge Framework",
  "Yield Farming Smart Contracts",
  "Flash Loan Arbitrage Bot",
  "Tokenomics and Vesting Contracts",
  "Layer 2 Rollup Integration",
  "Decentralized Identity Solution",
];

const FEATURES_POOL = [
  {
    icon: "📚",
    title: "Hands-On Projects",
    description: "Build real-world applications with guided projects.",
  },
  {
    icon: "🤝",
    title: "Expert Support",
    description: "Get guidance from industry-leading instructors.",
  },
  {
    icon: "💻",
    title: "Interactive Labs",
    description: "Practice with live coding environments.",
  },
  {
    icon: "🚀",
    title: "Lifetime Access",
    description: "Keep access to all materials forever.",
  },
  {
    icon: "📜",
    title: "Certificate",
    description: "Earn a certificate of completion.",
  },
  {
    icon: "💬",
    title: "Community Access",
    description: "Join our exclusive developer community.",
  },
  {
    icon: "🔄",
    title: "Regular Updates",
    description: "Content updated with latest trends.",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    description: "Learn on any device, anywhere.",
  },
  {
    icon: "🎯",
    title: "Project Portfolio",
    description: "Build a portfolio of real projects.",
  },
  {
    icon: "⚡",
    title: "Quick Start",
    description: "Get up and running in minutes.",
  },
];

const TESTIMONIALS_POOL = [
  {
    name: "Michael Lee",
    role: "Software Engineer",
    rating: 5,
    comment: "This course transformed my career! Highly recommended.",
    avatar: "👨‍💻",
  },
  {
    name: "Sarah Johnson",
    role: "Data Scientist",
    rating: 4,
    comment: "Great content, practical examples, well-structured.",
    avatar: "👩‍💻",
  },
  {
    name: "David Kim",
    role: "Product Manager",
    rating: 5,
    comment: "Perfect introduction to Web3. Clear explanations.",
    avatar: "👨‍💼",
  },
  {
    name: "Lisa Wang",
    role: "Frontend Developer",
    rating: 4,
    comment: "Learned so much about blockchain development.",
    avatar: "👩‍💼",
  },
  {
    name: "James Wilson",
    role: "Blockchain Developer",
    rating: 5,
    comment: "Exactly what I needed to level up my skills.",
    avatar: "👨‍💻",
  },
  {
    name: "Emma Brown",
    role: "Smart Contract Auditor",
    rating: 5,
    comment: "Comprehensive coverage of security best practices.",
    avatar: "👩‍🔬",
  },
];

const FAQS_POOL = [
  {
    question: "Do I need prior blockchain experience?",
    answer:
      "Basic programming knowledge is recommended, but we cover fundamentals.",
  },
  {
    question: "What tools will I learn?",
    answer: "You'll master industry-standard tools and frameworks.",
  },
  {
    question: "Is there a certificate provided?",
    answer: "Yes, you'll receive a certificate upon completion.",
  },
  {
    question: "How long do I have access?",
    answer: "You get lifetime access to all course materials.",
  },
  {
    question: "Are there any prerequisites?",
    answer: "Basic programming knowledge is helpful but not required.",
  },
  {
    question: "Is this course regularly updated?",
    answer: "Yes, we update content to reflect the latest industry trends.",
  },
];

// List of valid Pexels image URLs for tech, blockchain, crypto, etc. (verified working)
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

// Direct playable video preview URLs from Pexels (mp4 links for embedding/preview)
const VALID_PEXELS_VIDEOS: string[] = [
  "https://player.vimeo.com/external/407516680.sd.mp4?s=1d3a5d3a5d3a5d3a5d3a5d3a5d3a5d3a5d3a5d3a&profile_id=165",
  "https://videos.pexels.com/video-files/8557642/8557642-uhd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/5835106/5835106-uhd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/6153354/6153354-uhd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/8728382/8728382-uhd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/7947456/7947456-uhd_1920_1080_30fps.mp4",
  "https://videos.pexels.com/video-files/4819840/4819840-uhd_1920_1080_30fps.mp4",
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
const randomFloat = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

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

// Generate random image URL using valid Pexels images
const generateImageUrl = (): string => {
  return randomChoice(VALID_PEXELS_IMAGES);
};

// Generate random video preview URL
const generateVideoUrl = (): string => {
  return randomChoice(VALID_PEXELS_VIDEOS);
};

// Generate product data with fixed type
const generateProduct = (type: ProductType): Product => {
  const _id: ObjectId = new ObjectId();
  const category: string = randomChoice(CATEGORIES);
  const difficulty: string = randomChoice(DIFFICULTIES);
  const instructor = randomChoice(INSTRUCTORS);

  let title: ProductType;
  switch (type) {
    case "Course":
      title = randomChoice(COURSE_TITLES) + ` - ${category} Edition`;
      break;
    case "Bootcamp":
      title = randomChoice(BOOTCAMP_TITLES) + ` in ${category}`;
      break;
    case "EBook":
      title = randomChoice(EBOOK_TITLES) + `: Focus on ${category}`;
      break;
    case "Codebase":
      title = randomChoice(CODEBASE_TITLES) + ` - ${category} Ready`;
      break;
    default:
      title = "Course";
  }

  const basePrice: number = randomInt(29, 499);
  const originalPrice: number = basePrice + randomInt(20, 100);

  const numFeatures: number = randomInt(3, 6);
  const features = randomChoices(FEATURES_POOL, numFeatures);

  const numTestimonials: number = randomInt(2, 4);
  const testimonials = randomChoices(TESTIMONIALS_POOL, numTestimonials);

  const numFaqs: number = randomInt(3, 6);
  const faqs = randomChoices(FAQS_POOL, numFaqs);

  const numTechnologies: number = randomInt(3, 8);
  const technologies: string[] = randomChoices(TECHNOLOGIES, numTechnologies);

  const numTags: number = randomInt(3, 6);
  const tags: string[] = randomChoices(
    [...CATEGORIES, ...TECHNOLOGIES],
    numTags,
  );

  const modules = [];
  const numModules: number = randomInt(3, 8);
  for (let i = 0; i < numModules; i++) {
    modules.push({
      title: `Module ${i + 1}: ${randomChoice(["Introduction to", "Advanced", "Practical", "Deep Dive into"])} ${randomChoice(technologies)}`,
      duration: `${randomInt(1, 5)} hours`,
      lessons: randomInt(5, 15),
      description: `Learn ${randomChoice(technologies)} with hands-on examples and real-world projects.`,
    });
  }

  const includes: string[] = [
    "Access to all course materials",
    "Downloadable resources and code samples",
    "Certificate of completion",
    `${randomInt(1, 3)}-year access to updates`,
    "Community Discord/Slack access",
    "24/7 student support",
  ];

  return {
    _id,
    id: _id.toString(),
    slug: generateSlug(title, _id),
    title,
    subtitle: `Master ${category} development with ${difficulty.toLowerCase()} level training`,
    description: `Learn ${category} development through hands-on projects and real-world applications. Perfect for ${difficulty.toLowerCase()} developers.`,
    longDescription: `This comprehensive ${type.toLowerCase()} provides in-depth coverage of ${category} development. You'll learn ${technologies.slice(0, 3).join(", ")}, and more. Through practical projects and expert guidance, you'll build the skills needed to succeed in the Web3 industry. Our ${difficulty.toLowerCase()}-friendly approach ensures you'll master both theoretical concepts and practical implementation.`,
    type,
    price: basePrice,
    originalPrice,
    currency: "USD",
    status: randomChoice(["published", "published", "published", "draft"]),
    category,
    difficulty,
    duration: randomChoice(DURATIONS[type] || DURATIONS["Course"]),
    level: difficulty,
    language: "English",
    lastUpdated: new Date(
      Date.now() - randomInt(1, 30) * 24 * 60 * 60 * 1000,
    ).toISOString(),
    instructor,
    createdAt: new Date(Date.now() - randomInt(30, 365) * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - randomInt(1, 30) * 24 * 60 * 60 * 1000),
    featured: Math.random() < 0.2,
    imageUrl: generateImageUrl(),
    enrollments: randomInt(0, 1000),
    rating: parseFloat(randomFloat(3.5, 5.0).toFixed(1)),
    totalReviews: randomInt(10, 500),
    studentsEnrolled: randomInt(50, 2000),
    tags,
    technologies,
    features,
    modules,
    includes,
    testimonials,
    faqs,
    videoPreviewUrl: generateVideoUrl(),
    createdBy: new ObjectId().toString(),
  };
};

// Main execution function
async function seedDatabase(): Promise<void> {
  let client: MongoClient | undefined;

  try {
    console.log("🚀 Starting database seeding...");
    console.log(`📊 Generating ${NUM_PRODUCTS} products...`);

    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DATABASE_NAME);
    const collection = db.collection<Product>(COLLECTION_NAME);

    // Generate products evenly across types
    const products: Product[] = [];
    const productsPerType = Math.floor(NUM_PRODUCTS / PRODUCT_TYPES.length);
    const extraProducts = NUM_PRODUCTS % PRODUCT_TYPES.length;

    PRODUCT_TYPES.forEach((type, index) => {
      const countForType = productsPerType + (index < extraProducts ? 1 : 0);
      console.log(`📝 Generating ${countForType} products for type: ${type}`);
      for (let i = 0; i < countForType; i++) {
        products.push(generateProduct(type));
      }
    });

    // Clear existing products (optional)
    const shouldClear: boolean = process.env.CLEAR_EXISTING === "true";
    if (shouldClear) {
      const deleteResult = await collection.deleteMany({});
      console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing products`);
    }

    // Insert products
    const result = await collection.insertMany(products);
    console.log(`✅ Inserted ${result.insertedCount} products successfully!`);

    // Create indexes for better performance
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ type: 1 });
    await collection.createIndex({ category: 1 });
    await collection.createIndex({ status: 1 });
    await collection.createIndex({ featured: 1 });
    await collection.createIndex({ createdAt: -1 });

    console.log("📊 Created database indexes");

    // Display summary
    interface Stat {
      _id: string;
      count: number;
      avgPrice: number;
    }
    const stats: Stat[] = await collection
      .aggregate<Stat>([
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 },
            avgPrice: { $avg: "$price" },
          },
        },
      ])
      .toArray();

    console.log("\n📈 Seeding Summary:");
    stats.forEach((stat: Stat) => {
      console.log(
        `  ${stat._id}: ${stat.count} products (avg price: $${stat.avgPrice.toFixed(2)})`,
      );
    });
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

// Named export to satisfy ESLint
const seedExports = { generateProduct, seedDatabase };
export default seedExports;
