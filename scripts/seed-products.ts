#!/usr/bin/env node

import { MongoClient, ObjectId } from "mongodb";
import { fileURLToPath } from "node:url";
import * as dotenv from "dotenv";
import {
  FAQs,
  Lesson,
  ModuleWithLessons,
  Product,
  ProductFeature,
  ProductTestimonial,
  ProductType,
  Resource,
} from "@/utils/interfaces";

dotenv.config();

// Configuration
const DATABASE_NAME: string = "dapp_mentors_official";
const PRODUCTS_COLLECTION_NAME: string = "products";
const MODULES_COLLECTION_NAME: string = "modules";
const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017";
const NUM_PRODUCTS: number = parseInt(process.env.NUM_ITEM || "50", 10);

// Data pools for random generation
const PRODUCT_TYPES: ProductType[] = [
  "Course",
  "Bootcamp",
  "Ebook",
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
const DIFFICULTIES: string[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "All Levels",
];
const STATUSES: string[] = ["published", "draft", "archived"];
const DURATIONS: Record<ProductType, string[]> = {
  Course: ["2-4 weeks", "4-8 weeks", "8-12 weeks", "3-6 months"],
  Bootcamp: ["2-3 months", "3-6 months", "6-12 months"],
  Ebook: ["Self-paced", "1-2 weeks", "2-4 weeks"],
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
];

const FEATURES_POOL: ProductFeature[] = [
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
];

const TESTIMONIALS_POOL: ProductTestimonial[] = [
  {
    name: "Michael Lee",
    role: "Software Engineer",
    rating: 5,
    comment:
      "This course transformed my career! The practical approach and real-world projects helped me land a Web3 developer position.",
    avatar: "👨‍💻",
  },
  {
    name: "Sarah Johnson",
    role: "Data Scientist",
    rating: 4,
    comment:
      "Great content with practical examples. The instructor explains complex concepts in an easy-to-understand manner.",
    avatar: "👩‍💻",
  },
  {
    name: "Lisa Wang",
    role: "Frontend Developer",
    rating: 4,
    comment:
      "Learned so much about blockchain development. The hands-on projects were particularly valuable.",
    avatar: "👩‍💼",
  },
];

const FAQS_POOL: FAQs[] = [
  {
    question: "Do I need prior blockchain experience?",
    answer:
      "Basic programming knowledge is recommended, but no prior blockchain experience is required. We start with fundamentals.",
  },
  {
    question: "What tools and technologies will I learn?",
    answer:
      "You'll master industry-standard tools including Solidity, Web3.js, Hardhat, and more depending on the specific course.",
  },
  {
    question: "Is there a certificate provided?",
    answer:
      "Yes, upon successful completion of the course, you will receive a certificate of completion.",
  },
  {
    question: "How long do I have access to the course materials?",
    answer:
      "You get lifetime access to all course materials, including future updates and additions.",
  },
];

const VALID_PEXELS_IMAGES: string[] = [
  "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const VALID_YOUTUBE_VIDEOS: string[] = [
  "https://www.youtube.com/watch?v=0pThnRneDjw",
  "https://www.youtube.com/watch?v=vKJpN5FAeF4",
  "https://www.youtube.com/watch?v=DHvZLI7Db8E",
  "https://www.youtube.com/watch?v=p0bGHP-PH5M",
  "https://www.youtube.com/watch?v=gyMwXuJrbJQ",
];

// Lesson-specific data pools
const LESSON_TYPES: Lesson["type"][] = [
  "video",
  "reading",
  "code",
  "quiz",
  "project",
];

// Lesson title pool to reflect cascading structure
const LESSON_TITLES: Record<Lesson["type"], string[]> = {
  video: [
    "Introduction to {topic}",
    "Understanding {topic} Concepts",
    "Exploring {topic} with Examples",
    "Deep Dive into {topic}",
  ],
  reading: [
    "{topic} Fundamentals",
    "{topic} Best Practices",
    "{topic} Implementation Guide",
    "{topic} Overview",
  ],
  code: [
    "Building Your First {topic}",
    "Implementing {topic} Features",
    "Creating a {topic} Component",
    "Coding {topic} Solutions",
  ],
  quiz: [
    "{topic} Knowledge Check",
    "{topic} Quiz",
    "{topic} Assessment",
    "Test Your {topic} Skills",
  ],
  project: [
    "Build a {topic} Application",
    "Create a {topic} Project",
    "Develop a {topic} System",
    "Complete {topic} Challenge",
  ],
};

const RESOURCE_TYPES: Resource["type"][] = ["pdf", "code", "link", "image"];

// Resource titles to match example style
const RESOURCE_TITLES: Record<Resource["type"], string[]> = {
  pdf: [
    "{topic} Guide",
    "{topic} Cheat Sheet",
    "{topic} Documentation",
    "{topic} Reference",
  ],
  code: [
    "{topic} Examples",
    "{topic} Starter Code",
    "{topic} Template",
    "{topic} Scripts",
  ],
  link: [
    "{topic} Documentation",
    "{topic} Reference",
    "Official {topic} Docs",
    "{topic} Resources",
  ],
  image: [
    "{topic} Diagram",
    "{topic} Flow Chart",
    "{topic} Architecture",
    "{topic} Visual Guide",
  ],
};

// Module topics to match fakeModules style
const MODULE_TOPICS = [
  "Web Development",
  "JavaScript Concepts",
  "Building Projects",
  "Smart Contract Development",
  "DeFi Protocols",
  "NFT Development",
  "Web3 Integration",
  "DAO Governance",
  "Cross-Chain Development",
  "Token Economics",
  "Security Practices",
  "Gas Optimization",
];

// Utility functions
const randomChoice = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

const randomChoices = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
};

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomFloat = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const generateId = (): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 9; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${result}`;
};

const generateSlug = (title: string, id: string): string => {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-") + `-${id.slice(-8)}`
  );
};

const generateImageUrl = (): string => randomChoice(VALID_PEXELS_IMAGES);
const generateVideoUrl = (): string => randomChoice(VALID_YOUTUBE_VIDEOS);

// Generate resource to match fakeModules style
const generateResource = (type: Resource["type"], topic: string): Resource => {
  const titleTemplate = randomChoice(RESOURCE_TITLES[type]);
  const title = titleTemplate.replace("{topic}", topic);

  let url: string;
  switch (type) {
    case "image":
      url = `https://example.com/${topic.toLowerCase().replace(/\s+/g, "-")}-diagram.png`;
      break;
    case "code":
      url = `https://example.com/${topic.toLowerCase().replace(/\s+/g, "-")}-examples.js`;
      break;
    case "pdf":
      url = `https://example.com/${topic.toLowerCase().replace(/\s+/g, "-")}-guide.pdf`;
      break;
    case "link":
      url = `https://example.com/${topic.toLowerCase().replace(/\s+/g, "-")}-docs`;
      break;
    default:
      url = "https://example.com/resource";
  }

  return {
    id: `resource-${generateId()}`,
    title,
    type,
    url,
    downloadable: type === "pdf" || type === "code" || Math.random() < 0.5,
  };
};

// Generate lesson to match fakeModules structure
const generateLesson = (index: number, topic: string): Lesson => {
  // Define lesson type progression to match fakeModules
  const lessonTypeOrder: Lesson["type"][] = [
    "video",
    "reading",
    "code",
    "quiz",
    "project",
  ];
  const type =
    index < lessonTypeOrder.length
      ? lessonTypeOrder[index]
      : randomChoice(LESSON_TYPES);

  const titleTemplate = randomChoice(LESSON_TITLES[type]);
  const title = titleTemplate.replace("{topic}", topic);

  // Generate duration to match fakeModules
  let duration: string;
  switch (type) {
    case "video":
      duration = `${randomInt(15, 30)} minutes`;
      break;
    case "reading":
      duration = `${randomInt(15, 25)} minutes`;
      break;
    case "code":
      duration = `${randomInt(30, 60)} minutes`;
      break;
    case "quiz":
      duration = `${randomInt(10, 20)} minutes`;
      break;
    case "project":
      duration = `${randomInt(1, 2)} hour${randomInt(1, 2) > 1 ? "s" : ""}`;
      break;
    default:
      duration = `${randomInt(15, 30)} minutes`;
  }

  // Generate description to match fakeModules style
  const description = (() => {
    switch (type) {
      case "video":
        return `An introductory video on ${topic.toLowerCase()}.`;
      case "reading":
        return `Guide to ${topic.toLowerCase()} concepts and practices.`;
      case "code":
        return `Write ${topic.toLowerCase()} code with practical examples.`;
      case "quiz":
        return `Test your knowledge of ${topic.toLowerCase()}.`;
      case "project":
        return `Create a ${topic.toLowerCase()} application or component.`;
      default:
        return `Learn about ${topic.toLowerCase()}.`;
    }
  })();

  // Generate content based on type, matching fakeModules
  let content: string | undefined;
  let videoUrl: string | undefined;

  if (type === "video") {
    videoUrl = generateVideoUrl();
  } else if (type === "reading") {
    content = `This lesson covers ${topic.toLowerCase()}, including key concepts, practical implementation details, and best practices for development.`;
  } else if (type === "code") {
    content = `// ${title}\nfunction ${topic.toLowerCase().replace(/\s+/g, "")}Example() {\n  console.log('Working on ${topic}');\n  // TODO: Implement your solution\n}\n\n${topic.toLowerCase().replace(/\s+/g, "")}Example();`;
  }
  // No content for quiz or project, as per fakeModules

  // First lesson is always unlocked, others have 50% chance of being locked
  const locked = index > 0 && Math.random() < 0.5;

  // Generate 0-2 resources per lesson
  const numResources = Math.random() < 0.3 ? 0 : randomInt(1, 2);
  const resources: Resource[] = [];
  for (let i = 0; i < numResources; i++) {
    const resourceType = randomChoice(RESOURCE_TYPES);
    resources.push(generateResource(resourceType, topic));
  }

  return {
    id: `lesson-${generateId()}`,
    title,
    type,
    duration,
    description,
    completed: false,
    locked,
    videoUrl,
    content,
    transcript: undefined, // No transcript, as per fakeModules
    resources,
    order: index,
  };
};

// Generate module with lessons to match fakeModules structure
const generateModuleWithLessons = (
  index: number,
  productId: string,
): ModuleWithLessons => {
  const topic = randomChoice(MODULE_TOPICS);
  const prefixes = ["Introduction to", "Advanced", "Building", "Understanding"];
  const prefix = randomChoice(prefixes);
  const title = `${prefix} ${topic}`;

  const description = `Learn ${topic.toLowerCase()} with practical examples and hands-on exercises.`;

  // Generate 2-4 lessons per module, as per fakeModules
  const numLessons = randomInt(2, 4);
  const lessons: Lesson[] = [];

  for (let i = 0; i < numLessons; i++) {
    const lesson = generateLesson(i, topic);
    lessons.push(lesson);
  }

  // Calculate total duration
  const totalMinutes = lessons.reduce((total, lesson) => {
    const match = lesson.duration.match(/(\d+)/);
    const value = match ? parseInt(match[1]) : 30;
    return total + (lesson.duration.includes("hour") ? value * 60 : value);
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  let duration: string;
  if (hours > 0 && remainingMinutes > 0) {
    duration = `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} minutes`;
  } else if (hours > 0) {
    duration = `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    duration = `${totalMinutes} minutes`;
  }

  return {
    id: `module-${generateId()}`,
    productId,
    title,
    description,
    duration,
    lessons,
    completed: false,
    progress: 0,
    order: index,
  };
};

// Generate product with full modules including lessons
const generateProduct = (type: ProductType): Product => {
  const _id = new ObjectId();
  const id = _id.toString();
  const category = randomChoice(CATEGORIES);
  const difficulty = randomChoice(DIFFICULTIES);
  const instructor = randomChoice(INSTRUCTORS);
  const status = randomChoice(STATUSES);

  const title = `${randomChoice(COURSE_TITLES)} - ${category} Mastery`;
  const basePrice = randomInt(99, 299);
  const originalPrice = basePrice + randomInt(50, 120);

  const subtitle = `Master ${category} development with ${difficulty.toLowerCase()}-level training. Build real projects and advance your blockchain career.`;
  const description = `Comprehensive ${type.toLowerCase()} covering ${category} development from fundamentals to advanced topics. Perfect for ${difficulty.toLowerCase()} developers looking to excel in Web3.`;
  const longDescription = `This ${type.toLowerCase()} provides comprehensive coverage of ${category} development with practical, hands-on learning. You'll master essential concepts, build real-world projects, and gain the expertise needed to succeed in the rapidly growing blockchain industry. Our expert-led curriculum combines theoretical knowledge with practical application, ensuring you're job-ready upon completion.`;

  // Generate 4-6 technologies
  const technologies = randomChoices(TECHNOLOGIES, randomInt(4, 6));

  // Generate 4-6 features
  const features = randomChoices(FEATURES_POOL, randomInt(4, 6));

  // Generate 3-4 testimonials
  const testimonials = randomChoices(TESTIMONIALS_POOL, randomInt(3, 4));

  // Generate 4-5 FAQs
  const faqs = randomChoices(FAQS_POOL, randomInt(4, 5));

  // Generate realistic tags
  const tags = randomChoices(
    [
      ...CATEGORIES.slice(0, 3),
      ...technologies.slice(0, 3),
      "Web3",
      "Blockchain",
      "Development",
      "Programming",
      difficulty,
    ],
    randomInt(8, 10),
  );

  const includes = [
    `${randomInt(25, 45)}+ hours of comprehensive content`,
    "Lifetime access to all course materials",
    "Downloadable resources and starter code",
    "Certificate of completion",
    `${randomInt(5, 10)} real-world projects`,
    "Access to exclusive developer community",
    "30-day money-back guarantee",
    "Mobile and desktop compatibility",
    "Regular updates and new content",
    "Direct instructor support and Q&A",
  ];

  // Generate dates
  const createdAt = new Date(
    Date.now() - randomInt(30, 180) * 24 * 60 * 60 * 1000,
  );
  const updatedAt = new Date(
    createdAt.getTime() + randomInt(1, 30) * 24 * 60 * 60 * 1000,
  );

  // Generate 2-4 modules with full lessons
  const numModules = randomInt(2, 4);
  const modules: ModuleWithLessons[] = [];
  for (let moduleIndex = 0; moduleIndex < numModules; moduleIndex++) {
    const moduleWithLessons = generateModuleWithLessons(moduleIndex, id);
    modules.push(moduleWithLessons);
  }

  return {
    _id,
    id,
    slug: generateSlug(title, id),
    title,
    subtitle,
    description,
    longDescription,
    type,
    price: basePrice,
    originalPrice,
    currency: "USD",
    status,
    category,
    difficulty,
    level: difficulty,
    duration: randomChoice(DURATIONS[type]),
    language: "English",
    lastUpdated: updatedAt.toISOString(),
    instructor,
    createdAt,
    updatedAt,
    featured: Math.random() < 0.15,
    imageUrl: generateImageUrl(),
    enrollments: randomInt(0, 1000),
    rating: parseFloat(randomFloat(3.5, 5.0).toFixed(1)),
    totalReviews: randomInt(50, 300),
    studentsEnrolled: randomInt(200, 1500),
    tags,
    technologies,
    features,
    modules, // Store full ModuleWithLessons objects
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
    console.log(
      "🚀 Starting database seeding with full module and lesson data...",
    );
    console.log(
      `📊 Generating ${NUM_PRODUCTS} products with embedded ModuleWithLessons data...`,
    );

    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DATABASE_NAME);
    const productsCollection = db.collection<Product>(PRODUCTS_COLLECTION_NAME);
    const modulesCollection = db.collection<ModuleWithLessons>(
      MODULES_COLLECTION_NAME,
    );

    // Clear existing collections if requested
    const shouldClear: boolean = process.env.CLEAR_EXISTING === "true";
    if (shouldClear) {
      await productsCollection.deleteMany({});
      await modulesCollection.deleteMany({});
      console.log("🗑️ Cleared existing data");
    }

    const products: Product[] = [];
    const allModulesWithLessons: ModuleWithLessons[] = [];
    const productsPerType = Math.floor(NUM_PRODUCTS / PRODUCT_TYPES.length);
    const extraProducts = NUM_PRODUCTS % PRODUCT_TYPES.length;

    for (const [typeIndex, type] of PRODUCT_TYPES.entries()) {
      const countForType =
        productsPerType + (typeIndex < extraProducts ? 1 : 0);
      console.log(`📝 Generating ${countForType} ${type} products...`);

      for (let i = 0; i < countForType; i++) {
        const product = generateProduct(type);
        products.push(product);
        allModulesWithLessons.push(...(product.modules || []));

        const totalLessons = (product.modules || []).reduce(
          (sum, m) => sum + m.lessons.length,
          0,
        );
        console.log(
          `   ✓ "${product.title}" - ${product.modules?.length} modules, ${totalLessons} lessons`,
        );
      }
    }

    console.log(
      `\n📦 Generated: ${products.length} products, ${allModulesWithLessons.length} modules`,
    );

    // Insert all data
    console.log("💾 Inserting products with full module and lesson data...");
    const productsResult = await productsCollection.insertMany(products);
    console.log(`✅ Inserted ${productsResult.insertedCount} products`);

    console.log("💾 Inserting modules with lessons for reference...");
    const modulesResult = await modulesCollection.insertMany(
      allModulesWithLessons,
    );
    console.log(
      `✅ Inserted ${modulesResult.insertedCount} modules with full lesson data`,
    );

    // Create indexes
    console.log("🔍 Creating indexes...");
    await productsCollection.createIndex({ slug: 1 }, { unique: true });
    await productsCollection.createIndex({ type: 1 });
    await productsCollection.createIndex({ category: 1 });
    await productsCollection.createIndex({ status: 1 });
    await modulesCollection.createIndex({ productId: 1 });
    await modulesCollection.createIndex({ productId: 1, order: 1 });
    console.log("📊 Indexes created");

    // Generate summary
    const totalLessons = allModulesWithLessons.reduce(
      (sum, m) => sum + m.lessons.length,
      0,
    );

    console.log("\n📈 Seeding Summary:");
    console.log("=".repeat(50));
    console.log(`📚 Total Products: ${products.length}`);
    console.log(`📝 Total Modules: ${allModulesWithLessons.length}`);
    console.log(`🎓 Total Lessons: ${totalLessons}`);
    console.log(
      `📊 Avg Modules per Product: ${(allModulesWithLessons.length / products.length).toFixed(1)}`,
    );
    console.log(
      `📖 Avg Lessons per Module: ${(totalLessons / allModulesWithLessons.length).toFixed(1)}`,
    );

    // Product type breakdown
    const typeBreakdown = products.reduce(
      (acc, product) => {
        acc[product.type] = (acc[product.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    console.log("\n📊 Product Type Distribution:");
    Object.entries(typeBreakdown).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} products`);
    });

    // Lesson type breakdown
    const lessonTypeBreakdown = allModulesWithLessons
      .flatMap((m) => m.lessons)
      .reduce(
        (acc, lesson) => {
          acc[lesson.type] = (acc[lesson.type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

    console.log("\n🎓 Lesson Type Distribution:");
    Object.entries(lessonTypeBreakdown).forEach(([type, count]) => {
      const percentage = ((count / totalLessons) * 100).toFixed(1);
      console.log(`  ${type}: ${count} lessons (${percentage}%)`);
    });

    // Status distribution
    const statusBreakdown = products.reduce(
      (acc, product) => {
        acc[product.status || "unknown"] =
          (acc[product.status || "unknown"] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    console.log("\n📊 Product Status Distribution:");
    Object.entries(statusBreakdown).forEach(([status, count]) => {
      console.log(`  ${status}: ${count} products`);
    });

    console.log("=".repeat(50));
    console.log("🎉 Database seeding completed successfully!");
    console.log(
      "💡 Products collection now contains full module and lesson data",
    );
    console.log(
      "📱 Modules collection contains module references for querying",
    );
  } catch (error: unknown) {
    console.error("❌ Error during database seeding:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("🔌 Database connection closed");
    }
  }
}

// Run if called directly
const __filename: string = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  seedDatabase()
    .then(() => {
      console.log("\n✨ Seeding operation completed!");
      console.log("🔍 Query examples:");
      console.log('  - Products: db.products.find({type: "Course"})');
      console.log(
        '  - Modules: db.modules.find({productId: "your-product-id"})',
      );
      console.log('  - Lessons: db.modules.find({"lessons.type": "video"})');
      process.exit(0);
    })
    .catch((error: unknown) => {
      console.error("💥 Seeding failed:", error);
      process.exit(1);
    });
}

// Export for reuse
export default {
  seedDatabase,
  generateProduct,
  generateModuleWithLessons,
  generateLesson,
  generateResource,
};

export {
  generateId,
  generateSlug,
  generateImageUrl,
  generateVideoUrl,
  randomChoice,
  randomChoices,
  randomInt,
  randomFloat,
};
