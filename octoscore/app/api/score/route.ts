import { NextRequest, NextResponse } from 'next/server';
import { fetchGitHubProfileData } from '@/lib/github';
import { scoreProfile } from '@/lib/scorer';
import { z } from 'zod';

// Zod schema for input validation
const schema = z.object({
  user: z.string().min(1, 'Username cannot be empty.'),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('user');

  try {
    schema.parse({ user: username });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid username provided.' }, { status: 400 });
  }

  const profileData = await fetchGitHubProfileData(username!);

  if (!profileData) {
    return NextResponse.json({ error: 'GitHub user not found.' }, { status: 404 });
  }

  const isHiring = false; // This can be a dynamic flag, but for now it's static.
  const scoreResult = scoreProfile(profileData, isHiring);

  return NextResponse.json(scoreResult);
}