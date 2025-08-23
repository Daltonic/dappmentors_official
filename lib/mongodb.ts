import { MongoClient, Db } from "mongodb";

// Define a type for the cached objects
interface Cached {
  client: MongoClient | null;
  db: Db | null;
}

// Use a global variable for caching (Node.js module caching)
let cached: Cached = { client: null, db: null };

// Function to connect to MongoDB and cache the connection
export async function connectToDatabase(): Promise<Db> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  if (cached.client && cached.db) {
    // Reuse cached connection
    return cached.db;
  }

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(); // Defaults to the db in the URI; or specify dbName if needed

    cached = { client, db };
    console.log("✅ MongoDB connected successfully");

    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
