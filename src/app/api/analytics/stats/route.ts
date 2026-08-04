import { NextResponse } from "next/server";
import { getAnalyticsCollection, getContactCollection, getProjectsCollection } from "@/lib/mongodb";

export async function GET() {
  try {
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

    // 7. Daily Views over the last 14 days
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);
    fourteenDaysAgo.setHours(0, 0, 0, 0);

    const dailyViewsAgg = await analyticsCol
      .aggregate([
        { $match: { timestamp: { $gte: fourteenDaysAgo } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
            },
            views: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    // Fill in missing dates in the 14-day range
    const dailyMap = new Map(dailyViewsAgg.map((item) => [item._id, item.views]));
    const dailyViews = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      dailyViews.push({
        date: dateStr,
        views: dailyMap.get(dateStr) || 0,
      });
    }

    // 8. Recent 10 Visitor Logs
    const recentViews = await analyticsCol
      .find({})
      .sort({ timestamp: -1 })
      .limit(10)
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
