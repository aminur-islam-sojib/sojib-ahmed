import { NextResponse } from "next/server";

import { getGithubStats } from "@/lib/github";

export const revalidate = 43200;

const cacheHeaders = {
  "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400",
};

export async function GET() {
  try {
    const data = await getGithubStats();

    return NextResponse.json(
      {
        success: true,
        message: "GitHub stats fetched successfully",
        data,
      },
      { headers: cacheHeaders },
    );
  } catch (error) {
    console.error("Failed to serve GitHub stats:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch GitHub stats",
      },
      {
        status: 500,
      },
    );
  }
}
