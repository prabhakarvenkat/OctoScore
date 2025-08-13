# OctoScore

OctoScore is a Next.js application that scores a GitHub profile based on various metrics to provide a comprehensive evaluation. This project is built with modern development practices, including continuous integration and structured contribution guidelines.

![Picture](https://github.com/prabhakarvenkat/OctoScore/blob/8a8d3aa900bf6da72652d7468cc53b9a90fbef60/octoscore/thumbnail.png)

-----
### Working Video

Watch Link: [Watch the demo](<https://youtu.be/_Nz4VhuS5NU>)
-----

### Table of Contents

1.  [Features](#features)
2.  [Getting Started](#getting-started)
3.  [Environment Variables](#environment-variables)
4.  [Running the Application](#running-the-application)
5.  [Project Structure](#project-structure)
6.  [Testing](#testing)
7.  [Continuous Integration (CI)](#continuous-integration-ci)
8.  [Deployment](#deployment)
9.  [Contributing](#contributing)

-----

### Features

  - **Profile Scoring Logic**: A server-side scoring algorithm (`lib/scorer.ts`) evaluates a GitHub user based on metrics like followers, contributions, top repository stars, and profile completeness.
  - **GitHub API Integration**: Uses a GraphQL API to efficiently fetch all necessary profile data with a single request.
  - **Robust Testing**: Comprehensive unit tests for the core scoring logic and placeholder tests for other components.
  - **Continuous Integration (CI)**: A GitHub Actions workflow automatically runs linting, type-checking, and tests on every code change to ensure quality.
  - **Structured Contributions**: A pre-defined issue template (`ISSUE_TEMPLATE.md`) to guide bug reports and feature requests.

-----

### Getting Started

To set up and run this project locally, follow these steps.

**Prerequisites:**

  * Node.js (version 20 or higher)
  * npm

**Installation:**

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/prabhakarvenkat/OctoScore.git
    cd OctoScore
    ```
2.  Install all project dependencies:
    ```bash
    npm install
    ```

-----

### Environment Variables

The application requires a GitHub Personal Access Token (PAT) for API authentication. Create a `.env.local` file in the project's root directory and add the following variables:

  - `GITHUB_PAT`: Your GitHub Personal Access Token with `public_repo` and `read:user` scopes.
  - `NEXT_PUBLIC_BASE_URL`: The base URL for your application (e.g., `http://localhost:3000`). This is used for API calls.

Your `.env.local` file should look like this:

```
GITHUB_PAT=your_github_personal_access_token_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

-----

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

-----

### Project Structure

  - `app/`: Contains the Next.js App Router components and API routes.
  - `lib/`: Houses the core business logic, including the GitHub API utility (`github.ts`), the scoring algorithm (`scorer.ts`), and type definitions (`types.ts`).
  - `tests/`: Contains the test suite for the application.
  - `.github/`: Holds the GitHub Actions workflow (`ci.yml`) and the issue template (`ISSUE_TEMPLATE.md`).

-----

### Testing

You can run the project's entire test suite manually with the following command:

```bash
npm run test
```

This will execute all tests defined in the `tests/` directory, including:

  - `scorer.test.ts`: Unit tests for the profile scoring logic.
  - `e2e/profile-check.spec.ts`: Placeholder tests for end-to-end functionality.
  - `github.test.ts`: Placeholder tests for the GitHub API utility.

-----

### Continuous Integration (CI)

This project uses a GitHub Actions workflow to automate the quality assurance process. The workflow, defined in `.github/workflows/ci.yml`, runs automatically on every `push` and `pull_request` to the `main` branch.

The CI workflow performs the following tasks:

  - **Linting**: Runs `npm run lint` to enforce code quality standards.
  - **Type-checking**: Runs `npm run typecheck` to catch TypeScript errors.
  - **Testing**: Executes the test suite with `npm run test`.
  - **Building**: Attempts to create a production build with `npm run build` to verify the project's integrity.

-----

### Deployment

To prepare the application for a production environment, you can create a build using:

```bash
npm run build
```

This project is optimized for deployment on Vercel. During the deployment process, you must configure the `GITHUB_PAT` and `NEXT_PUBLIC_BASE_URL` as environment variables within your Vercel project settings.

-----

### Contributing

We welcome contributions\! To report a bug or suggest a new feature, please use the provided **`ISSUE_TEMPLATE.md`**. This ensures all submissions are well-documented and easy to understand.
