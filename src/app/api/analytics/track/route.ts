import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsCollection } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { path, referrer } = body;

    if (!path || typeof path !== "string") {
      return NextResponse.json({ success: false, message: "Invalid path" }, { status: 400 });
    }

    // Ignore tracking dashboard or api routes
    if (path.startsWith("/dashboard") || path.startsWith("/api") || path.startsWith("/_next")) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const userAgent = request.headers.get("user-agent") || "unknown";

    const collection = await getAnalyticsCollection();
    await collection.insertOne({
      path,
      referrer: referrer || "Direct",
      userAgent,
      ip: clientIp,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json({ success: false, message: "Failed to record visit" }, { status: 500 });
  }
}
