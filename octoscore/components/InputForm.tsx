'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function InputForm() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    setIsLoading(true);
    // Navigating with a query parameter
    router.push(`/result?user=${username}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username or URL"
        className="input input-bordered w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-blue-200 focus:outline-none"
        disabled={isLoading}
      />
      <button type="submit" className="btn bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition" disabled={isLoading}>
        {isLoading ? 'Checking...' : 'Check Profile'}
      </button>
    </form>
  );
}