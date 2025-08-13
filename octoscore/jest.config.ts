import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json', 
  },
  }, 
  moduleNameMapper: {
    // Handle module aliases (this is Next.js-specific)
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    // This tells Jest to use ts-jest for .ts, .tsx files
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // ... other transformations if needed
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js configuration, which is async
export default createJestConfig(config);