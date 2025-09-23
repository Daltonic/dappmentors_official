#!/usr/bin/env node

import { MongoClient } from "mongodb";
import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "node:url";

dotenv.config({ quiet: true }); // Suppress dotenv logs

// Configuration
const DATABASE_NAME: string = "dapp_mentors_official";
const USERS_COLLECTION_NAME: string = "users";
const NUM_ITEM: number = process.env.NUM_ITEMS
  ? parseInt(process.env.NUM_ITEMS, 10)
  : 50;
const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017";

// Collections to wipe (excluding users)
const COLLECTIONS_TO_WIPE: string[] = [
  "activities",
  "blogs",
  "products",
  "services",
  "transactions",
];

// Utility to prompt user input
const prompt = (question: string): Promise<string> =>
  new Promise((resolve) => {
    const rl = createInterface({ input: stdin, output: stdout });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });

// Main execution function
async function wipeDatabase(): Promise<void> {
  let client: MongoClient | undefined;

  try {
    console.log("🗑️  Database Wipe Script");
    console.log("WARNING: This will erase ALL data except the admin user!");
    console.log("=".repeat(NUM_ITEM));

    // Prompt for admin credentials
    const email = await prompt("Enter admin email: ");
    const password = await prompt("Enter admin password: ");

    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DATABASE_NAME);
    const usersCollection = db.collection(USERS_COLLECTION_NAME);

    // Verify admin credentials
    console.log("🔍 Verifying admin credentials...");
    const adminUser = await usersCollection.findOne({ email });
    if (!adminUser) {
      console.error("❌ Admin user not found!");
      process.exit(1);
    }

    if (adminUser.role !== "admin") {
      console.error("❌ User is not an admin!");
      process.exit(1);
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordValid) {
      console.error("❌ Invalid password!");
      process.exit(1);
    }

    console.log("✅ Admin credentials verified!");

    // Proceed with wipe
    console.log("\n🚨 Starting database wipe...");
    console.log("This action cannot be undone!");
    const confirm = await prompt("Type 'WIPE' to confirm: ");
    if (confirm !== "WIPE") {
      console.log("❌ Wipe cancelled.");
      process.exit(0);
    }

    let totalDeleted = 0;

    // Wipe non-users collections
    for (const collectionName of COLLECTIONS_TO_WIPE) {
      try {
        const collection = db.collection(collectionName);
        const deleteResult = await collection.deleteMany({});
        totalDeleted += deleteResult.deletedCount;
        console.log(
          `🗑️  Wiped ${collectionName}: ${deleteResult.deletedCount} documents`,
        );
      } catch (err) {
        console.warn(
          `⚠️  Collection ${collectionName} not found or empty, skipping...`,
        );
        console.error(err);
      }
    }

    // Wipe users except admin
    const usersDeleteResult = await usersCollection.deleteMany({
      role: { $ne: "admin" },
    });
    totalDeleted += usersDeleteResult.deletedCount;
    console.log(
      `🗑️  Wiped users (except admin): ${usersDeleteResult.deletedCount} documents`,
    );

    console.log("\n🎉 Database wipe completed!");
    console.log(`📊 Total documents deleted: ${totalDeleted}`);
  } catch (error: unknown) {
    console.error("❌ Error during database wipe:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("🔌 Disconnected from MongoDB");
    }
  }
}

// Run if called directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename || process.argv[1].endsWith("reset.js")) {
  wipeDatabase()
    .then(() => {
      console.log("\n✨ Wipe operation completed!");
      process.exit(0);
    })
    .catch((error: unknown) => {
      console.error("💥 Wipe failed:", error);
      process.exit(1);
    });
}
