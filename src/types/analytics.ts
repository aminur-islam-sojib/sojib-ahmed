export interface PageView {
  _id?: string;
  path: string;
  referrer: string;
  userAgent: string;
  ip: string;
  timestamp: Date;
}

export interface RouteStat {
  route: string;
  count: number;
}

export interface ReferrerStat {
  referrer: string;
  count: number;
}

export interface DailyViewStat {
  date: string;
  views: number;
}

export interface AnalyticsStats {
  totalVisitors: number;
  totalPageViews: number;
  totalMessages: number;
  totalProjects: number;
  topRoutes: RouteStat[];
  topReferrers: ReferrerStat[];
  dailyViews: DailyViewStat[];
  recentViews: PageView[];
}
