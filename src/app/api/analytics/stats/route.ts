import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsCollection, getContactCollection, getProjectsCollection } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "14d"; // "7d" | "14d" | "30d" | "lifetime"

    const analyticsCol = await getAnalyticsCollection();
    const contactCol = await getContactCollection();
    const projectsCol = await getProjectsCollection();

    // 1. Total Page Views
    const totalPageViews = await analyticsCol.countDocuments();

    // 2. Unique Visitors (distinct IP addresses)
    const uniqueIps = await analyticsCol.distinct("ip");
    const totalVisitors = uniqueIps.length;

    // 3. Total Messages Sent
    const totalMessages = await contactCol.countDocuments();

    // 4. Total Projects
    const totalProjects = await projectsCol.countDocuments();

    // 5. Top Routes Breakdown
    const topRoutesAgg = await analyticsCol
      .aggregate([
        { $group: { _id: "$path", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ])
      .toArray();

    const topRoutes = topRoutesAgg.map((item) => ({
      route: item._id || "/",
      count: item.count,
    }));

    // 6. Top Referrers Breakdown
    const topReferrersAgg = await analyticsCol
      .aggregate([
        { $group: { _id: "$referrer", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ])
      .toArray();

    const topReferrers = topReferrersAgg.map((item) => ({
      referrer: item._id || "Direct",
      count: item.count,
    }));

    // 7. Dynamic Daily Views based on range parameter
    let daysCount = 14;
    if (range === "7d") daysCount = 7;
    if (range === "30d") daysCount = 30;

    let pipeline: any[] = [];

    if (range === "lifetime") {
      pipeline = [
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            views: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ];
    } else {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (daysCount - 1));
      startDate.setHours(0, 0, 0, 0);

      pipeline = [
        { $match: { timestamp: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            views: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ];
    }

    const dailyViewsAgg = await analyticsCol.aggregate(pipeline).toArray();
    const dailyMap = new Map(dailyViewsAgg.map((item) => [item._id, item.views]));

    let dailyViews: { date: string; views: number }[] = [];

    if (range === "lifetime") {
      if (dailyViewsAgg.length > 0) {
        const firstDateStr = dailyViewsAgg[0]._id;
        const firstDate = new Date(firstDateStr);
        const today = new Date();

        const cur = new Date(firstDate);
        while (cur <= today) {
          const dateStr = cur.toISOString().split("T")[0];
          dailyViews.push({
            date: dateStr,
            views: dailyMap.get(dateStr) || 0,
          });
          cur.setDate(cur.getDate() + 1);
        }
      } else {
        const dateStr = new Date().toISOString().split("T")[0];
        dailyViews.push({ date: dateStr, views: 0 });
      }
    } else {
      for (let i = daysCount - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        dailyViews.push({
          date: dateStr,
          views: dailyMap.get(dateStr) || 0,
        });
      }
    }

    // 8. Recent Visitor Logs
    const recentViews = await analyticsCol
      .find({})
      .sort({ timestamp: -1 })
      .limit(15)
      .toArray();

    return NextResponse.json({
      success: true,
      data: {
        totalVisitors,
        totalPageViews,
        totalMessages,
        totalProjects,
        topRoutes,
        topReferrers,
        dailyViews,
        recentViews,
        range,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch analytics stats" },
      { status: 500 }
    );
  }
}
