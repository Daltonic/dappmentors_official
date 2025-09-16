#!/usr/bin/env node

import { MongoClient } from "mongodb";
import { fileURLToPath } from "node:url";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "@/utils/interfaces";

dotenv.config();

// Configuration
const DATABASE_NAME: string = "dapp_mentors_official";
const USERS_COLLECTION_NAME: string = "users";
const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017";
const NUM_INSTRUCTORS: number = parseInt(
  process.env.NUM_INSTRUCTORS || "15",
  10,
);
const NUM_STUDENTS: number = parseInt(process.env.NUM_ITEMS || "50", 10);
const TEST_PASSWORD: string = process.env.TEST_PASSWORD || "TestPassword123!";

// Data pools for random generation
const FIRST_NAMES: string[] = [
  // Male names
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Thomas",
  "Christopher",
  "Charles",
  "Daniel",
  "Matthew",
  "Anthony",
  "Mark",
  "Donald",
  "Steven",
  "Paul",
  "Andrew",
  "Joshua",
  "Kenneth",
  "Kevin",
  "Brian",
  "George",
  "Timothy",
  "Ronald",
  "Jason",
  "Edward",
  "Jeffrey",
  "Ryan",
  "Jacob",
  "Gary",
  "Nicholas",
  "Eric",
  "Jonathan",
  "Stephen",
  "Larry",
  "Justin",
  "Scott",
  "Brandon",
  "Benjamin",
  "Samuel",
  "Gregory",
  "Alexander",
  "Patrick",
  "Frank",
  // Female names
  "Mary",
  "Patricia",
  "Jennifer",
  "Linda",
  "Elizabeth",
  "Barbara",
  "Susan",
  "Jessica",
  "Sarah",
  "Karen",
  "Nancy",
  "Lisa",
  "Betty",
  "Helen",
  "Sandra",
  "Donna",
  "Carol",
  "Ruth",
  "Sharon",
  "Michelle",
  "Laura",
  "Sarah",
  "Kimberly",
  "Deborah",
  "Dorothy",
  "Lisa",
  "Nancy",
  "Karen",
  "Betty",
  "Helen",
  "Sandra",
  "Donna",
  "Carol",
  "Ruth",
  "Sharon",
  "Michelle",
  "Laura",
  "Emily",
  "Ashley",
  "Emma",
  "Olivia",
  "Sophia",
  "Ava",
  "Isabella",
  "Mia",
  "Abigail",
  "Madison",
  "Charlotte",
  "Harper",
  "Sofia",
  "Avery",
  "Elizabeth",
  "Amelia",
  "Evelyn",
];

const LAST_NAMES: string[] = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
  "Gomez",
  "Phillips",
  "Evans",
  "Turner",
  "Diaz",
  "Parker",
  "Cruz",
  "Edwards",
  "Collins",
  "Reyes",
  "Stewart",
  "Morris",
  "Morales",
  "Murphy",
  "Cook",
  "Rogers",
  "Gutierrez",
  "Ortiz",
  "Morgan",
  "Cooper",
  "Peterson",
  "Bailey",
  "Reed",
  "Kelly",
  "Howard",
  "Ramos",
  "Kim",
  "Cox",
  "Ward",
  "Richardson",
  "Watson",
  "Brooks",
  "Chavez",
  "Wood",
  "James",
  "Bennett",
  "Gray",
  "Mendoza",
  "Ruiz",
  "Hughes",
];

const LOCATIONS: string[] = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
  "Austin, TX",
  "Jacksonville, FL",
  "Fort Worth, TX",
  "Columbus, OH",
  "Charlotte, NC",
  "San Francisco, CA",
  "Indianapolis, IN",
  "Seattle, WA",
  "Denver, CO",
  "Washington, DC",
  "Boston, MA",
  "El Paso, TX",
  "Nashville, TN",
  "Detroit, MI",
  "Oklahoma City, OK",
  "Portland, OR",
  "Las Vegas, NV",
  "Memphis, TN",
  "Louisville, KY",
  "Baltimore, MD",
  "Milwaukee, WI",
  "Albuquerque, NM",
  "Tucson, AZ",
  "Fresno, CA",
  "Sacramento, CA",
  "Mesa, AZ",
  "Kansas City, MO",
  "Atlanta, GA",
  "Long Beach, CA",
  "Colorado Springs, CO",
  "Raleigh, NC",
  "Miami, FL",
  "Virginia Beach, VA",
  "Omaha, NE",
  "Oakland, CA",
  "Minneapolis, MN",
  "Tulsa, OK",
  "Arlington, TX",
  "New Orleans, LA",
  "Wichita, KS",
];

const INSTRUCTOR_BIOS: string[] = [
  "Experienced blockchain developer with 8+ years in Web3 and DeFi protocols. Former senior engineer at major crypto companies.",
  "PhD in Computer Science specializing in distributed systems and cryptocurrency. Published researcher with 50+ academic papers.",
  "Full-stack developer turned blockchain educator. Built and deployed 15+ smart contracts on Ethereum mainnet.",
  "Former software architect at Fortune 500 companies, now dedicated to teaching the next generation of Web3 developers.",
  "Cryptocurrency enthusiast since 2013. Led development teams at 3 successful DeFi startups and multiple ICO projects.",
  "Smart contract security auditor with expertise in Solidity, Rust, and formal verification methods.",
  "Blockchain consultant and technical writer. Helped 20+ companies transition to Web3 technologies.",
  "Former Google engineer with deep expertise in scalable systems, now focusing on Layer 2 solutions.",
  "DeFi protocol researcher and developer. Core contributor to several open-source blockchain projects.",
  "Web3 entrepreneur who sold two blockchain startups. Now passionate about education and community building.",
  "Senior developer with 10+ years experience in traditional finance, specializing in DeFi and tokenomics.",
  "Ethereum core contributor and smart contract developer. Expert in gas optimization and protocol design.",
  "Blockchain architect with experience building infrastructure for major exchanges and DeFi protocols.",
  "Former academic researcher in cryptography, now teaching practical blockchain development.",
  "Full-time educator and content creator with 100K+ followers across social media platforms.",
];

const STUDENT_BIOS: string[] = [
  "Computer Science student eager to learn blockchain development and build the future of Web3.",
  "Career changer from traditional software development, excited to explore DeFi and smart contracts.",
  "Recent bootcamp graduate looking to specialize in blockchain technology and cryptocurrency.",
  "Freelance developer interested in adding Web3 skills to expand career opportunities.",
  "Entrepreneur planning to build a blockchain startup and need technical knowledge.",
  "Finance professional transitioning into DeFi and cryptocurrency development.",
  "Self-taught programmer passionate about decentralized technologies and digital assets.",
  "University student majoring in Computer Science with focus on blockchain applications.",
  "Junior developer seeking to advance skills in smart contract development and Web3.",
  "Tech enthusiast and early crypto adopter, now ready to build on blockchain platforms.",
  "Software engineer from a traditional tech company exploring Web3 career opportunities.",
  "Recent graduate with background in mathematics, interested in cryptocurrency algorithms.",
  "Mobile app developer expanding into decentralized applications and NFT platforms.",
  "Data scientist curious about blockchain analytics and on-chain data analysis.",
  "Product manager looking to understand technical aspects of blockchain products.",
  "Designer interested in Web3 UX/UI and how blockchain affects user experience.",
  "Marketing professional wanting to understand technical fundamentals of crypto projects.",
  "Business analyst exploring blockchain use cases across different industries.",
  "Quality assurance engineer specializing in testing smart contracts and DApps.",
  "DevOps engineer interested in blockchain infrastructure and deployment strategies.",
];

const AVATAR_EMOJIS: string[] = [
  "👨‍💻",
  "👩‍💻",
  "👨‍💼",
  "👩‍💼",
  "👨‍🎓",
  "👩‍🎓",
  "👨‍🔬",
  "👩‍🔬",
  "👨‍🎨",
  "👩‍🎨",
  "👨‍⚕️",
  "👩‍⚕️",
  "👨‍🏫",
  "👩‍🏫",
  "👨‍⚖️",
  "👩‍⚖️",
  "👨‍🌾",
  "👩‍🌾",
  "👨‍🍳",
  "👩‍🍳",
  "👨‍🔧",
  "👩‍🔧",
  "👨‍🏭",
  "👩‍🏭",
  "👨‍🎤",
  "👩‍🎤",
  "👨‍🎨",
  "👩‍🎨",
  "🧑‍💻",
  "🧑‍💼",
  "🧑‍🎓",
  "🧑‍🔬",
];

const PHONE_FORMATS: string[] = [
  "555-0{d}{d}{d}-{d}{d}{d}{d}",
  "(555) {d}{d}{d}-{d}{d}{d}{d}",
  "555.{d}{d}{d}.{d}{d}{d}{d}",
  "+1-555-{d}{d}{d}-{d}{d}{d}{d}",
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

const generateId = (): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generateEmail = (firstName: string, lastName: string): string => {
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "protonmail.com",
    "icloud.com",
    "aol.com",
    "zoho.com",
    "mail.com",
    "fastmail.com",
  ];
  const domain = randomChoice(domains);
  const separators = [".", "_", ""];
  const separator = randomChoice(separators);
  const suffix = Math.random() < 0.3 ? randomInt(1, 999).toString() : "";

  return `${firstName.toLowerCase()}${separator}${lastName.toLowerCase()}${suffix}@${domain}`;
};

const generatePhone = (): string => {
  const format = randomChoice(PHONE_FORMATS);
  return format.replace(/\{d\}/g, () => randomInt(0, 9).toString());
};

const generateRecentDate = (daysBack: number): Date => {
  const now = new Date();
  const millisecondsBack = daysBack * 24 * 60 * 60 * 1000;
  return new Date(now.getTime() - Math.random() * millisecondsBack);
};

// Generate instructor user
const generateInstructor = async (
  hashedPassword: string,
): Promise<Omit<User, "_id">> => {
  const firstName = randomChoice(FIRST_NAMES);
  const lastName = randomChoice(LAST_NAMES);
  const email = generateEmail(firstName, lastName);

  // Generate dates - instructors typically joined earlier
  const joinDate = generateRecentDate(randomInt(180, 720)); // 6 months to 2 years ago
  const createdAt = joinDate;
  const updatedAt = generateRecentDate(randomInt(1, 30)); // Updated within last 30 days

  // Last activity should be recent for active instructors
  const lastActivity = generateRecentDate(randomInt(1, 7)); // Within last week
  const lastLogin = generateRecentDate(randomInt(1, 3)); // Within last 3 days

  return {
    id: generateId(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    name: `${firstName.trim()} ${lastName.trim()}`,
    email,
    password: hashedPassword,
    role: "instructor",
    status: "active",
    avatar: randomChoice(AVATAR_EMOJIS),
    bio: randomChoice(INSTRUCTOR_BIOS),
    phone: Math.random() < 0.7 ? generatePhone() : undefined,
    location: Math.random() < 0.8 ? randomChoice(LOCATIONS) : undefined,
    joinDate,
    createdAt,
    updatedAt,
    lastActivity,
    lastLogin,
    emailVerified: true,
    // Instructors typically have more activity
    coursesEnrolled: randomInt(2, 8), // Instructors may take other courses
    coursesCompleted: randomInt(1, 5),
    posts: randomInt(10, 50),
    comments: randomInt(20, 100),
    authMethod: "traditional",
  };
};

// Generate student user
const generateStudent = async (
  hashedPassword: string,
): Promise<Omit<User, "_id">> => {
  const firstName = randomChoice(FIRST_NAMES);
  const lastName = randomChoice(LAST_NAMES);
  const email = generateEmail(firstName, lastName);

  // Generate dates - students join more recently
  const joinDate = generateRecentDate(randomInt(30, 365)); // 1 month to 1 year ago
  const createdAt = joinDate;
  const updatedAt = generateRecentDate(randomInt(1, 60)); // Updated within last 60 days

  // Student activity varies more
  const lastActivity =
    Math.random() < 0.7 ? generateRecentDate(randomInt(1, 14)) : undefined;
  const lastLogin =
    Math.random() < 0.8 ? generateRecentDate(randomInt(1, 7)) : undefined;

  return {
    id: generateId(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    name: `${firstName.trim()} ${lastName.trim()}`,
    email,
    password: hashedPassword,
    role: "student",
    status: "active",
    avatar: Math.random() < 0.6 ? randomChoice(AVATAR_EMOJIS) : undefined,
    bio: Math.random() < 0.4 ? randomChoice(STUDENT_BIOS) : undefined,
    phone: Math.random() < 0.5 ? generatePhone() : undefined,
    location: Math.random() < 0.6 ? randomChoice(LOCATIONS) : undefined,
    joinDate,
    createdAt,
    updatedAt,
    lastActivity,
    lastLogin,
    emailVerified: true,
    // Student activity levels vary widely
    coursesEnrolled: randomInt(0, 12),
    coursesCompleted: randomInt(0, 5),
    posts: randomInt(0, 20),
    comments: randomInt(0, 50),
    authMethod: "traditional",
  };
};

// Main execution function
async function seedUsers(): Promise<void> {
  let client: MongoClient | undefined;

  try {
    console.log("🚀 Starting user database seeding...");
    console.log(`👨‍🏫 Generating ${NUM_INSTRUCTORS} instructors`);
    console.log(`👨‍🎓 Generating ${NUM_STUDENTS} students`);
    console.log(`🔐 Using test password: ${TEST_PASSWORD}`);

    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DATABASE_NAME);
    const usersCollection = db.collection<User>(USERS_COLLECTION_NAME);

    // Clear existing non-admin users if requested
    const shouldClear: boolean = process.env.CLEAR_EXISTING === "true";
    if (shouldClear) {
      const deleteResult = await usersCollection.deleteMany({
        role: { $ne: "admin" }, // Preserve admin users
      });
      console.log(
        `🗑️ Cleared ${deleteResult.deletedCount} existing non-admin users (preserved admins)`,
      );
    }

    // Hash password once for all users
    console.log("🔐 Hashing test password...");
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(TEST_PASSWORD, saltRounds);
    console.log("✅ Password hashed");

    const allUsers: Omit<User, "_id">[] = [];
    const generatedCredentials: {
      email: string;
      password: string;
      role: string;
    }[] = [];

    // Generate instructors
    console.log("👨‍🏫 Generating instructors...");
    for (let i = 0; i < NUM_INSTRUCTORS; i++) {
      const instructor = await generateInstructor(hashedPassword);
      allUsers.push(instructor);
      generatedCredentials.push({
        email: instructor.email,
        password: TEST_PASSWORD,
        role: "instructor",
      });

      if ((i + 1) % 5 === 0) {
        console.log(`   ✓ Generated ${i + 1}/${NUM_INSTRUCTORS} instructors`);
      }
    }

    // Generate students
    console.log("👨‍🎓 Generating students...");
    for (let i = 0; i < NUM_STUDENTS; i++) {
      const student = await generateStudent(hashedPassword);
      allUsers.push(student);
      generatedCredentials.push({
        email: student.email,
        password: TEST_PASSWORD,
        role: "student",
      });

      if ((i + 1) % 20 === 0) {
        console.log(`   ✓ Generated ${i + 1}/${NUM_STUDENTS} students`);
      }
    }

    // Check for email duplicates and regenerate if necessary
    console.log("📧 Checking for email duplicates...");
    const emails = new Set<string>();
    const duplicateIndices: number[] = [];

    allUsers.forEach((user, index) => {
      if (emails.has(user.email)) {
        duplicateIndices.push(index);
      } else {
        emails.add(user.email);
      }
    });

    // Regenerate users with duplicate emails
    for (const index of duplicateIndices) {
      const user = allUsers[index];
      let newEmail: string;
      let attempts = 0;

      do {
        const suffix = randomInt(1000, 9999);
        newEmail = user.email.replace("@", `${suffix}@`);
        attempts++;
      } while (emails.has(newEmail) && attempts < 10);

      if (!emails.has(newEmail)) {
        user.email = newEmail;
        emails.add(newEmail);
        // Update credentials list
        generatedCredentials[index].email = newEmail;
      }
    }

    console.log(`📊 Generated ${allUsers.length} total users`);

    // Insert users in batches
    console.log("💾 Inserting users into database...");
    const batchSize = 50;
    let insertedCount = 0;

    for (let i = 0; i < allUsers.length; i += batchSize) {
      const batch = allUsers.slice(i, i + batchSize);
      const result = await usersCollection.insertMany(batch);
      insertedCount += result.insertedCount;

      console.log(
        `   ✓ Inserted batch ${Math.ceil((i + 1) / batchSize)}: ${insertedCount} total users`,
      );
    }

    // Create indexes
    console.log("🔍 Creating database indexes...");
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ role: 1 });
    await usersCollection.createIndex({ status: 1 });
    await usersCollection.createIndex({ joinDate: -1 });
    await usersCollection.createIndex({ lastActivity: -1 });
    console.log("📊 Indexes created");

    // Generate comprehensive statistics
    const stats = {
      total: insertedCount,
      instructors: allUsers.filter((u) => u.role === "instructor").length,
      students: allUsers.filter((u) => u.role === "student").length,
      statusBreakdown: {} as Record<string, number>,
      emailVerified: allUsers.filter((u) => u.emailVerified).length,
      withAvatar: allUsers.filter((u) => u.avatar).length,
      withBio: allUsers.filter((u) => u.bio).length,
      withPhone: allUsers.filter((u) => u.phone).length,
      withLocation: allUsers.filter((u) => u.location).length,
    };

    // Calculate status breakdown
    allUsers.forEach((user) => {
      stats.statusBreakdown[user.status] =
        (stats.statusBreakdown[user.status] || 0) + 1;
    });

    // Activity statistics
    const totalCoursesEnrolled = allUsers.reduce(
      (sum, u) => sum + u.coursesEnrolled,
      0,
    );
    const totalCoursesCompleted = allUsers.reduce(
      (sum, u) => sum + u.coursesCompleted,
      0,
    );
    const totalPosts = allUsers.reduce((sum, u) => sum + u.posts, 0);
    const totalComments = allUsers.reduce((sum, u) => sum + u.comments, 0);

    console.log("\n📈 User Seeding Summary:");
    console.log("=".repeat(60));
    console.log(`👥 Total Users Generated: ${stats.total}`);
    console.log(`👨‍🏫 Instructors: ${stats.instructors}`);
    console.log(`👨‍🎓 Students: ${stats.students}`);
    console.log();
    console.log("📊 Status Distribution:");
    Object.entries(stats.statusBreakdown).forEach(([status, count]) => {
      const percentage = ((count / stats.total) * 100).toFixed(1);
      console.log(`  ${status}: ${count} (${percentage}%)`);
    });
    console.log();
    console.log("📋 Profile Completion:");
    console.log(
      `  ✅ Email Verified: ${stats.emailVerified}/${stats.total} (${((stats.emailVerified / stats.total) * 100).toFixed(1)}%)`,
    );
    console.log(
      `  🖼️ Has Avatar: ${stats.withAvatar}/${stats.total} (${((stats.withAvatar / stats.total) * 100).toFixed(1)}%)`,
    );
    console.log(
      `  📝 Has Bio: ${stats.withBio}/${stats.total} (${((stats.withBio / stats.total) * 100).toFixed(1)}%)`,
    );
    console.log(
      `  📱 Has Phone: ${stats.withPhone}/${stats.total} (${((stats.withPhone / stats.total) * 100).toFixed(1)}%)`,
    );
    console.log(
      `  📍 Has Location: ${stats.withLocation}/${stats.total} (${((stats.withLocation / stats.total) * 100).toFixed(1)}%)`,
    );
    console.log();
    console.log("📚 Activity Summary:");
    console.log(`  📖 Total Courses Enrolled: ${totalCoursesEnrolled}`);
    console.log(`  🎓 Total Courses Completed: ${totalCoursesCompleted}`);
    console.log(`  📝 Total Posts: ${totalPosts}`);
    console.log(`  💬 Total Comments: ${totalComments}`);
    console.log();
    console.log("📊 Average Activity per User:");
    console.log(
      `  📖 Avg Courses Enrolled: ${(totalCoursesEnrolled / stats.total).toFixed(1)}`,
    );
    console.log(
      `  🎓 Avg Courses Completed: ${(totalCoursesCompleted / stats.total).toFixed(1)}`,
    );
    console.log(`  📝 Avg Posts: ${(totalPosts / stats.total).toFixed(1)}`);
    console.log(
      `  💬 Avg Comments: ${(totalComments / stats.total).toFixed(1)}`,
    );
    console.log("=".repeat(60));
    console.log("🎉 User seeding completed successfully!");
    console.log();
    console.log("🔐 Test Credentials:");
    console.log(`   Password for all users: ${TEST_PASSWORD}`);
    console.log("   You can login with any generated email address");
    console.log();
    console.log("📋 Generated User Credentials (first 10 for brevity):");
    generatedCredentials.slice(0, 10).forEach((cred) => {
      console.log(
        `   - Role: ${cred.role}, Email: ${cred.email}, Password: ${cred.password}`,
      );
    });
    console.log(
      "   (All users are set to active and email verified for testing)",
    );
    console.log();
    console.log("🔍 Query Examples:");
    console.log('   - All instructors: db.users.find({role: "instructor"})');
    console.log(
      '   - Active students: db.users.find({role: "student", status: "active"})',
    );
    console.log(
      "   - Users by join date: db.users.find().sort({joinDate: -1})",
    );
    console.log("   - Verified users: db.users.find({emailVerified: true})");
  } catch (error: unknown) {
    console.error("❌ Error during user seeding:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      if (error.message.includes("E11000")) {
        console.error(
          "💡 This appears to be a duplicate key error. Try running with CLEAR_EXISTING=true",
        );
      }
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
  seedUsers()
    .then(() => {
      console.log("\n✨ User seeding operation completed!");
      process.exit(0);
    })
    .catch((error: unknown) => {
      console.error("💥 User seeding failed:", error);
      process.exit(1);
    });
}

// Export for reuse
export default {
  seedUsers,
  generateInstructor,
  generateStudent,
};

export {
  generateId,
  generateEmail,
  generatePhone,
  randomChoice,
  randomChoices,
  randomInt,
};
