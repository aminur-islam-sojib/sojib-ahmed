"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Eye,
  MessageSquare,
  FolderGit2,
  TrendingUp,
  Clock,
  ArrowRight,
  RefreshCw,
  Mail,
  FolderPlus,
  Globe,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { AnalyticsStats } from "@/types/analytics";

interface ContactMsg {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: "new" | "read";
}

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState<ContactMsg[]>([]);

  const loadOverviewData = async () => {
    setLoading(true);
    try {
      const [statsRes, msgRes] = await Promise.all([
        fetch("/api/analytics/stats"),
        fetch("/api/contact/messages"),
      ]);

      const statsJson = await statsRes.json();
      if (statsJson.success) setStats(statsJson.data);

      const msgJson = await msgRes.json();
      if (msgJson.success) setRecentMessages(msgJson.data.slice(0, 5));
    } catch (err) {
      console.error("Error loading overview data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverviewData();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            System summary, visitor traffic metrics, recent inquiries, and quick shortcuts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={loadOverviewData} className="flex items-center gap-1.5 text-xs">
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Link href="/dashboard/projects">
            <Button size="sm" className="flex items-center gap-1.5 text-xs">
              <FolderPlus className="size-3.5" /> Manage Projects
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Key Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/analytics">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-xs uppercase font-semibold group-hover:text-primary transition-colors">
                Total Unique Visitors
              </CardDescription>
              <Users className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : stats?.totalVisitors || 0}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center justify-between">
                <span>Unique IP visitors</span>
                <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/analytics">
          <Card className="bg-card border-border hover:border-blue-500/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-xs uppercase font-semibold group-hover:text-blue-500 transition-colors">
                Total Page Views
              </CardDescription>
              <Eye className="size-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : stats?.totalPageViews || 0}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center justify-between">
                <span>Across all public routes</span>
                <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/inbox">
          <Card className="bg-card border-border hover:border-amber-500/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-xs uppercase font-semibold group-hover:text-amber-500 transition-colors">
                Contact Messages
              </CardDescription>
              <MessageSquare className="size-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : stats?.totalMessages || 0}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center justify-between">
                <span>
                  {recentMessages.filter((m) => m.status === "new").length} unread inquiries
                </span>
                <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects">
          <Card className="bg-card border-border hover:border-emerald-500/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-xs uppercase font-semibold group-hover:text-emerald-500 transition-colors">
                Active Projects
              </CardDescription>
              <FolderGit2 className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : stats?.totalProjects || 0}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center justify-between">
                <span>Stored in MongoDB</span>
                <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500" />
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Traffic Trend Summary Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">14-Day Traffic Summary</CardTitle>
            <CardDescription className="text-xs">
              Daily visitor views recorded across public pages
            </CardDescription>
          </div>
          <Link href="/dashboard/analytics">
            <Button size="sm" variant="ghost" className="text-xs flex items-center gap-1">
              View Detailed Analytics <ArrowRight className="size-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="h-[240px] w-full pt-4">
          {stats?.dailyViews && stats.dailyViews.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.dailyViews}>
                <defs>
                  <linearGradient id="viewGradOverview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary, #3b82f6)" stopOpacity={0.5} />
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
                  fill="url(#viewGradOverview)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-xs">
              {loading ? "Loading overview chart..." : "No visits recorded yet. Visit public pages to see traffic!"}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Side-by-side Overview Sections: Recent Inquiries & Recent Live Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries Preview */}
        <Card className="bg-card border-border flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Mail className="size-4 text-amber-500" /> Recent Inquiries
              </CardTitle>
              <CardDescription className="text-xs">Latest messages submitted by site visitors</CardDescription>
            </div>
            <Link href="/dashboard/inbox">
              <Button size="sm" variant="outline" className="text-xs h-8">
                Go to Inbox ({recentMessages.length})
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg._id} className="flex items-start justify-between border-b border-border/50 pb-2.5 text-xs">
                  <div className="space-y-0.5 max-w-[75%]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{msg.name}</span>
                      {msg.status === "new" && (
                        <Badge variant="default" className="text-[9px] px-1 py-0 uppercase">New</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground truncate">{msg.email}</p>
                    <p className="text-foreground/80 line-clamp-1 italic">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">No contact inquiries received yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Live Visitors Log */}
        <Card className="bg-card border-border flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="size-4 text-blue-500" /> Live Traffic Activity
              </CardTitle>
              <CardDescription className="text-xs">Latest visits across your public website</CardDescription>
            </div>
            <Link href="/dashboard/analytics">
              <Button size="sm" variant="outline" className="text-xs h-8">
                Full Analytics
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats?.recentViews && stats.recentViews.length > 0 ? (
              stats.recentViews.slice(0, 5).map((v, i) => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="size-3.5 text-muted-foreground" />
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-[11px] text-foreground">{v.path}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-muted-foreground">{v.ip}</span>
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">No live visitors logged yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
