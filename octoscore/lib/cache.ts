import { GitProfileScore } from './scorer';

// In-memory cache for development
const cache = new Map<string, { data: GitProfileScore; expiresAt: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60; // 60 minutes

/**
 * Retrieves a cached score for a given username.
 * @param username The GitHub username.
 * @returns The cached score or null if not found or expired.
 */
export const getCachedScore = async (username: string): Promise<GitProfileScore | null> => {
  const cachedEntry = cache.get(username);
  if (cachedEntry && cachedEntry.expiresAt > Date.now()) {
    return cachedEntry.data;
  }
  return null;
};

/**
 * Stores a score result in the cache.
 * @param username The GitHub username.
 * @param score The score data to cache.
 */
export const setCachedScore = async (username: string, score: GitProfileScore): Promise<void> => {
  cache.set(username, {
    data: score,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
};