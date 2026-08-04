"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Eye,
  Globe,
  TrendingUp,
  Clock,
  RefreshCw,
  Compass,
  Monitor,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnalyticsStats } from "@/types/analytics";

export default function AnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/analytics/stats");
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      }
    } catch (err) {
      console.error("Failed to load analytics stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const topRoute = stats?.topRoutes?.[0]?.route || "/";
  const topReferrer = stats?.topReferrers?.[0]?.referrer || "Direct";

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Visitor Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Detailed insights into your portfolio visitors, route traffic, referrers, and live view logs.
          </p>
        </div>

        <Button size="sm" variant="outline" onClick={loadStats} className="flex items-center gap-1.5 text-xs">
          <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh Data
        </Button>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-xs uppercase font-semibold">Total Unique Visitors</CardDescription>
            <Users className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats?.totalVisitors || 0}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="size-3 text-emerald-500" /> Distinct IP sessions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-xs uppercase font-semibold">Total Page Views</CardDescription>
            <Eye className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats?.totalPageViews || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all public paths</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-xs uppercase font-semibold">Top Route</CardDescription>
            <Globe className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold font-mono truncate">{loading ? "..." : topRoute}</div>
            <p className="text-xs text-muted-foreground mt-1">Most visited page</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-xs uppercase font-semibold">Top Referrer</CardDescription>
            <Compass className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">{loading ? "..." : topReferrer}</div>
            <p className="text-xs text-muted-foreground mt-1">Primary traffic source</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Traffic Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Visitor Traffic (Last 14 Days)</CardTitle>
          <CardDescription className="text-xs">
            Real-time daily pageview counts logged automatically across public pages
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full pt-4">
          {stats?.dailyViews && stats.dailyViews.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.dailyViews}>
                <defs>
                  <linearGradient id="analyticsViewGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary, #3b82f6)" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="var(--primary, #3b82f6)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e1e1f", borderColor: "#383838", borderRadius: "8px" }}
                  labelStyle={{ color: "#aaa" }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="var(--primary, #3b82f6)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#analyticsViewGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-xs">
              {loading ? "Loading analytics chart..." : "No visitor logs recorded yet."}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Route & Referrer Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Visited Routes */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Globe className="size-4 text-primary" /> Most Visited Routes
            </CardTitle>
            <CardDescription className="text-xs">Pageview distribution per public route</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats?.topRoutes && stats.topRoutes.length > 0 ? (
              stats.topRoutes.map((r, i) => {
                const total = stats.totalPageViews || 1;
                const percentage = Math.round((r.count / total) * 100);
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-medium text-foreground bg-muted px-2 py-0.5 rounded">{r.route}</span>
                      <span className="text-muted-foreground">{r.count} views ({percentage}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-muted-foreground">No route traffic recorded yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Top Traffic Referrers */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Compass className="size-4 text-amber-500" /> Top Traffic Sources
            </CardTitle>
            <CardDescription className="text-xs">Where visitors originated from</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats?.topReferrers && stats.topReferrers.length > 0 ? (
              stats.topReferrers.map((ref, i) => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                  <span className="font-medium text-foreground truncate max-w-[70%]">{ref.referrer || "Direct / Bookmark"}</span>
                  <span className="font-mono text-muted-foreground">{ref.count} visits</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No referrer data available yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Full Live Visitor Log */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Clock className="size-4 text-blue-500" /> Live Visitor Activity Log
          </CardTitle>
          <CardDescription className="text-xs">Recent incoming visits recorded in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          {stats?.recentViews && stats.recentViews.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[11px] uppercase bg-muted/50 text-muted-foreground border-b border-border">
                  <tr>
                    <th className="py-2.5 px-3">Route Path</th>
                    <th className="py-2.5 px-3">Visitor IP</th>
                    <th className="py-2.5 px-3">Referrer</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {stats.recentViews.map((v, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-primary font-medium">{v.path}</td>
                      <td className="py-2.5 px-3 font-mono text-muted-foreground">{v.ip}</td>
                      <td className="py-2.5 px-3 text-muted-foreground truncate max-w-[200px]">{v.referrer || "Direct"}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">
                        {new Date(v.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-6">No visitor logs recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
