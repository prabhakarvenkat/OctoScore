import { GitProfileScore } from '@/lib/scorer';
import ResultCard from '@/components/ResultCard';
import { notFound } from 'next/navigation';

// The searchParams prop is automatically passed by Next.js to pages
interface ResultPageProps {
  searchParams: {
    user: string;
  };
}

async function getScore(username: string): Promise<GitProfileScore | { error: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/score?user=${username}`, {
    cache: 'no-store', // This ensures a fresh request is always made
  });

  if (!res.ok) {
    if (res.status === 404) {
      // Handle the case where the user is not found
      return { error: 'GitHub user not found.' };
    }
    // Handle other server errors
    throw new Error('Failed to fetch data from API.');
  }

  return res.json();
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const username = searchParams.user;

  if (!username) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <p className="text-center text-red-500">Error: No username provided.</p>
      </main>
    );
  }

  const scoreData = await getScore(username);

  if ('error' in scoreData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <p className="text-center text-red-500">{scoreData.error}</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl font-bold mb-8">Score for {username}</h1>
      <ResultCard scoreData={scoreData} />
    </main>
  );
}