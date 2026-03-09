/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Health Check API Route
 * Tests MongoDB connection and configuration
 * Useful for debugging connection issues
 */

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    // Check if MONGO_URI is configured
    if (!process.env.MONGO_URI) {
      return NextResponse.json(
        {
          status: "error",
          message: "MONGO_URI environment variable is not set",
          details: {
            mongoUri: "❌ Not configured",
            suggestion: "Add MONGO_URI to .env.local",
          },
        },
        { status: 500 },
      );
    }

    // Check if it's a placeholder
    if (
      process.env.MONGO_URI.includes("username:password") ||
      process.env.MONGO_URI ===
        "mongodb+srv://username:password@cluster.mongodb.net"
    ) {
      return NextResponse.json(
        {
          status: "error",
          message: "MONGO_URI contains placeholder credentials",
          details: {
            mongoUri: "❌ Placeholder credentials detected",
            suggestion:
              "Replace placeholder with real MongoDB Atlas credentials",
            example:
              "mongodb+srv://your-username:your-password@your-cluster.mongodb.net",
          },
        },
        { status: 500 },
      );
    }

    // Try to connect to MongoDB
    console.log("Testing MongoDB connection...");
    const { client, db } = await connectToDatabase();

    // Try a simple health check query
    const adminDb = client.db("admin");
    const pingResult = await adminDb.command({ ping: 1 });

    return NextResponse.json({
      status: "success",
      message: "MongoDB connection successful",
      details: {
        mongoUri: "✅ Configured",
        connection: "✅ Connected",
        ping: pingResult.ok === 1 ? "✅ Responding" : "❌ Not responding",
        database: "portfolio_db",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.error("Health check error:", errorMessage);

    return NextResponse.json(
      {
        status: "error",
        message: "MongoDB connection failed",
        details: {
          error: errorMessage,
          advice: [
            "1. Check MONGO_URI in .env.local",
            "2. Verify credentials are correct",
            "3. Ensure IP is whitelisted in MongoDB Atlas",
            "4. Check network connectivity",
          ],
        },
      },
      { status: 500 },
    );
  }
}
