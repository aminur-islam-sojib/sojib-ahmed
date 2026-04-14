export interface GitHubStats {
  monthsExperience: number;
  projectsCompleted: number;
  commits: number;
  supportHours: number;
  updatedAt: string;
  source: "live" | "cached" | "fallback";
}

export interface GitHubRepo {
  id: number;
  name: string;
  created_at: string;
  fork: boolean;
}

export interface GitHubUserProfile {
  public_repos: number;
}

export interface GitHubCommitSearchResponse {
  total_count: number;
}

export interface GitHubPinnedItemsResponse {
  data?: {
    user?: {
      pinnedItems?: {
        totalCount: number;
      };
    };
  };
  errors?: Array<{
    message: string;
  }>;
}
