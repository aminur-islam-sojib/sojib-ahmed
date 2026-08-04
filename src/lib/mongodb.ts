/**
 * MongoDB Connection Handler
 * Implements connection pooling optimized for serverless environments
 * Reuses connections across Lambda/Function invocations
 */

import { MongoClient, Db } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const MONGO_URI: string = process.env.MONGO_URI;
const DB_NAME = "portfolio_db"; // You can change this to your desired DB name

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

/**
 * Connect to MongoDB with connection pooling
 * Reuses cached connection on subsequent invocations (serverless optimization)
 */
export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  // Return cached connection if available
  if (cachedClient && cachedDb) {
    console.log("Using cached MongoDB connection");
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log("Establishing new MongoDB connection...");

    const client = new MongoClient(MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 60000, // Close idle connections after 1 minute
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    console.log("MongoDB connected successfully");

    const db = client.db(DB_NAME);

    // Create indexes for better query performance
    await createIndexes(db);

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

/**
 * Create indexes for the contact_messages collection
 * Improves query performance for production use
 */
async function createIndexes(db: Db): Promise<void> {
  try {
    const collection = db.collection("contact_messages");

    // Index on email for quick lookups and spam prevention
    await collection.createIndex({ email: 1 });

    // Index on createdAt for sorting and date-range queries
    await collection.createIndex({ createdAt: -1 });

    // Compound index for filtering by email and date
    await collection.createIndex({ email: 1, createdAt: -1 });

    // TTL index: automatically delete messages older than 90 days (optional)
    // Uncomment if you want auto-cleanup
    // await collection.createIndex(
    //   { createdAt: 1 },
    //   { expireAfterSeconds: 7776000 } // 90 days
    // );

    console.log("MongoDB indexes created/verified");
  } catch (error) {
    console.warn("Index creation warning:", error);
    // Don't throw - indexes might already exist
  }
}

/**
 * Get the contact messages collection
 */
export async function getContactCollection() {
  const { db } = await connectToDatabase();
  return db.collection("contact_messages");
}

/**
 * Get the analytics views collection
 */
export async function getAnalyticsCollection() {
  const { db } = await connectToDatabase();
  return db.collection("analytics_views");
}

/**
 * Get the projects collection
 */
export async function getProjectsCollection() {
  const { db } = await connectToDatabase();
  return db.collection("projects");
}

/**
 * Close database connection (optional, not always needed in serverless)
 */

export async function closeConnection(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    console.log("MongoDB connection closed");
  }
}
