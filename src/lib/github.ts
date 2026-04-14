import "server-only";

import {
  GitHubCommitSearchResponse,
  GitHubPinnedItemsResponse,
  GitHubRepo,
  GitHubStats,
  GitHubUserProfile,
} from "@/types/github";

const GITHUB_USERNAME = "aminur-islam-sojib";
const TTL_MS = 12 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 4500;

const FALLBACK_STATS: GitHubStats = {
  monthsExperience: 6,
  projectsCompleted: 15,
  commits: 20,
  supportHours: 24,
  updatedAt: new Date(0).toISOString(),
  source: "fallback",
};

type StatsCache = {
  data: GitHubStats | null;
  expiresAt: number;
};

const statsCache: StatsCache = {
  data: null,
  expiresAt: 0,
};

function buildHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return {
      Accept: "application/vnd.github+json",
      "User-Agent": "sojib-portfolio",
    };
  }

  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "sojib-portfolio",
    Authorization: `Bearer ${token}`,
  };
}

async function fetchWithTimeout<T>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      next: { revalidate: 43200, tags: ["github-stats"] },
    });

    if (!response.ok) {
      throw new Error(`GitHub request failed (${response.status}) for ${url}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

function calculateExperienceMonths(oldestRepoDate: string): number {
  const startedAt = new Date(oldestRepoDate);
  const today = new Date();

  const monthDiff =
    (today.getFullYear() - startedAt.getFullYear()) * 12 +
    (today.getMonth() - startedAt.getMonth());

  return Math.max(1, monthDiff);
}

async function getPinnedRepositoryCount(): Promise<number | null> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return null;
  }

  const graphQlQuery = {
    query: `
      query($login: String!) {
        user(login: $login) {
          pinnedItems(first: 6, types: REPOSITORY) {
            totalCount
          }
        }
      }
    `,
    variables: {
      login: GITHUB_USERNAME,
    },
  };

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "sojib-portfolio",
    },
    body: JSON.stringify(graphQlQuery),
    next: { revalidate: 43200, tags: ["github-stats"] },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as GitHubPinnedItemsResponse;
  if (data.errors?.length) {
    return null;
  }

  return data.data?.user?.pinnedItems?.totalCount ?? null;
}

async function buildLiveStats(): Promise<GitHubStats> {
  const headers = buildHeaders();

  const [profile, oldestRepos, commitsSearch, pinnedCount] =
    await Promise.all([
      fetchWithTimeout<GitHubUserProfile>(
        `https://api.github.com/users/${GITHUB_USERNAME}`,
        { headers },
      ),
      fetchWithTimeout<GitHubRepo[]>(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=1&sort=created&direction=asc&type=owner`,
        { headers },
      ),
      fetchWithTimeout<GitHubCommitSearchResponse>(
        `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`,
        {
          headers: {
            ...headers,
            Accept: "application/vnd.github+json",
          },
        },
      ),
      getPinnedRepositoryCount(),
    ]);

  const oldestRepoDate = oldestRepos[0]?.created_at;
  const monthsExperience = oldestRepoDate
    ? calculateExperienceMonths(oldestRepoDate)
    : FALLBACK_STATS.monthsExperience;

  const projectsCompleted =
    pinnedCount ?? Math.max(0, profile.public_repos ?? FALLBACK_STATS.projectsCompleted);

  return {
    monthsExperience,
    projectsCompleted,
    commits: Math.max(0, commitsSearch.total_count ?? 0),
    supportHours: FALLBACK_STATS.supportHours,
    updatedAt: new Date().toISOString(),
    source: "live",
  };
}

export async function getGithubStats(): Promise<GitHubStats> {
  const now = Date.now();

  if (statsCache.data && statsCache.expiresAt > now) {
    return {
      ...statsCache.data,
      source: "cached",
    };
  }

  try {
    const liveStats = await buildLiveStats();

    statsCache.data = liveStats;
    statsCache.expiresAt = now + TTL_MS;

    return liveStats;
  } catch (error) {
    console.error("GitHub stats fetch failed:", error);

    if (statsCache.data) {
      return {
        ...statsCache.data,
        source: "cached",
      };
    }

    return {
      ...FALLBACK_STATS,
      updatedAt: new Date().toISOString(),
      source: "fallback",
    };
  }
}
