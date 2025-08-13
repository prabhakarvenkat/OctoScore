import { graphql } from "@octokit/graphql";
import { GitHubProfileData } from "./types";

const GITHUB_PAT = process.env.GITHUB_PAT;

if (!GITHUB_PAT) {
  throw new Error("GitHub Personal Access Token is not set in environment variables.");
}

const octokit = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_PAT}`,
  },
});

const query = `
query GetUserProfile($login: String!) {
  user(login: $login) {
    id
    login
    name
    bio
    email
    location
    websiteUrl
    avatarUrl
    followers {
      totalCount
    }
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
          }
        }
      }
    }
    repositories(first: 50, orderBy: {field: PUSHED_AT, direction: DESC}, isFork: false) {
      totalCount
      nodes {
        name
        stargazerCount
        forkCount
        isFork
        pushedAt
        primaryLanguage {
          name
        }
        languages(first: 10) {
          nodes {
            name
          }
        }
      }
    }
    pinnedItems(first: 6) {
      nodes {
        ... on Repository {
          name
        }
      }
    }
  }
}
`;

export async function fetchGitHubProfileData(username: string): Promise<GitHubProfileData | null> {
  try {
    const result: any = await octokit(query, {
      login: username,
    });
    return result;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error("GitHub user not found:", username);
      return null;
    }
    console.error("Error fetching GitHub profile:", error);
    throw error;
  }
}