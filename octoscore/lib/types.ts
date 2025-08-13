export interface GitHubProfileData {
  user: {
    login: string;
    name: string | null;
    avatarUrl: string;
    bio: string | null;
    location: string | null;
    email: string | null;
    websiteUrl: string | null;
    followers: {
      totalCount: number;
    };
    contributionsCollection: {
      totalCommitContributions: number;
      restrictedContributionsCount: number;
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            contributionCount: number;
          }[];
        }[];
      };
    };
    repositories: {
      totalCount: number;
      nodes: {
        name: string;
        stargazerCount: number;
        forkCount: number;
        isFork: boolean;
        pushedAt?: string;
        primaryLanguage: {
          name: string;
        } | null;
        languages: {
          nodes: {
            name: string;
          }[];
        };
      }[];
    };
    pinnedItems: {
      nodes: {
        name: string;
      }[];
    };
  } | null;
}