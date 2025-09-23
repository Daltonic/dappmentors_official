#!/usr/bin/env node

import { MongoClient, ObjectId } from "mongodb";
import { fileURLToPath } from "node:url";
import * as dotenv from "dotenv";
import { services } from "@/data/services";

// Load environment variables
dotenv.config();

// Configuration
const DATABASE_NAME = "dapp_mentors_official";
const COLLECTION_NAME = "services";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

// Main execution function
async function seedDatabase() {
  let client;

  try {
    console.log("🚀 Starting database seeding...");
    console.log(`📊 Seeding ${services.length} services...`);

    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Clear existing services
    const deleteResult = await collection.deleteMany({});
    console.log(`🗑️ Cleared ${deleteResult.deletedCount} existing services`);

    // Add ObjectId to each service
    const servicesWithObjectId = services.map((service) => ({
      ...service,
      _id: new ObjectId(),
      createdAt: new Date(service.createdAt),
      updatedAt: new Date(service.updatedAt),
    }));

    // Insert services
    const result = await collection.insertMany(servicesWithObjectId);
    console.log(`✅ Inserted ${result.insertedCount} services successfully!`);

    // Create indexes for better performance
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ status: 1 });
    await collection.createIndex({ featured: 1 });
    await collection.createIndex({ createdAt: -1 });

    console.log("📊 Created database indexes");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
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
if (process.argv[1] === __filename) {
  seedDatabase()
    .then(() => {
      console.log("🎉 Database seeding completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding failed:", error);
      process.exit(1);
    });
}

export default { seedDatabase };
