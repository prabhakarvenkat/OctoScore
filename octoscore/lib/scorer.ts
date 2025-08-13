import { GitHubProfileData } from './github';

export interface ScoreBreakdown {
  metric: string;
  raw: any;
  normalized: number;
  weight: number;
}

export interface GitProfileScore {
  score: number;
  eligible: boolean;
  remarks: string[];
  breakdown: ScoreBreakdown[];
}

// Scoring weights and thresholds
const WEIGHTS = {
  followers: 0.1,
  activity: 0.2,
  contributions: 0.2,
  stars: 0.2,
  pinnedRepos: 0.1,
  profileCompleteness: 0.2,
};

const THRESHOLDS = {
  followers: 50,
  contributions: 500,
  stars: 100,
};

export function scoreProfile(data: GitHubProfileData, isHiring: boolean = false): GitProfileScore {
  if (!data.user) {
    return {
      score: 0,
      eligible: false,
      remarks: ["User not found or profile is private."],
      breakdown: [],
    };
  }

  const user = data.user;
  const remarks: string[] = [];
  const breakdown: ScoreBreakdown[] = [];

  let score = 0;

  // 1. Profile Completeness
  let completenessScore = 0;
  const profileFields = [user.name, user.bio, user.location, user.email, user.websiteUrl];
  const completedFields = profileFields.filter(f => f).length;
  completenessScore = completedFields / profileFields.length;
  breakdown.push({ metric: 'Profile Completeness', raw: completedFields, normalized: completenessScore, weight: WEIGHTS.profileCompleteness });

  // 2. Follower Count
  const followers = user.followers.totalCount;
  const followersScore = Math.min(1, followers / THRESHOLDS.followers);
  breakdown.push({ metric: 'Followers', raw: followers, normalized: followersScore, weight: WEIGHTS.followers });

  // 3. Contribution Activity
  const totalContributions = user.contributionsCollection.totalCommitContributions;
  const contributionScore = Math.min(1, totalContributions / THRESHOLDS.contributions);
  breakdown.push({ metric: 'Total Contributions', raw: totalContributions, normalized: contributionScore, weight: WEIGHTS.contributions });

  // 4. Stargazer Count (from top repo)
  const topRepoStars = user.repositories.nodes[0]?.stargazerCount || 0;
  const starsScore = Math.min(1, topRepoStars / THRESHOLDS.stars);
  breakdown.push({ metric: 'Top Repo Stars', raw: topRepoStars, normalized: starsScore, weight: WEIGHTS.stars });

  // 5. Pinned Repos
  const pinnedRepos = user.pinnedItems.nodes.length;
  const pinnedScore = Math.min(1, pinnedRepos / 3); // 3 pinned repos is a good signal
  breakdown.push({ metric: 'Pinned Repos', raw: pinnedRepos, normalized: pinnedScore, weight: WEIGHTS.pinnedRepos });

  // Calculate final score
  score = breakdown.reduce((acc, curr) => acc + curr.normalized * curr.weight, 0) * 10;
  score = parseFloat(score.toFixed(2));

  // Determine eligibility and add remarks
  let eligible = score > 5;
  if (score < 3) remarks.push("Score is too low. Check for empty profile or lack of activity.");
  if (score < 5) remarks.push("The profile needs more activity to be considered eligible.");

  // Apply penalties (if needed)
  if (user.repositories.nodes.length > 0) {
    const latestPush = new Date(user.repositories.nodes[0].pushedAt!);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    if (latestPush < oneYearAgo) {
      score -= 2; // Penalty for inactivity
      remarks.push("Major inactivity detected (>12 months).");
    }
  }

  return {
    score,
    eligible,
    remarks,
    breakdown,
  };
}