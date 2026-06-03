# g-focus-web

Fullstack Next.js application for the g-focus daily todo MVP.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- npm

## Local Development

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Start the app:

```bash
npm run dev
```

The default local URL is `http://localhost:3000`.

## Scripts

- `npm run dev` starts the local Next.js development server.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript without emitting files.
- `npm run format:check` checks Prettier formatting.
- `npm run build` creates a production build.
- `npm run start` serves a production build.

## App Structure

- `src/app/(public)` contains public marketing and product entry routes.
- `src/app/(auth)` contains authentication routes.
- `src/app/(app)` contains authenticated product routes.

Authentication, database schema, migrations, and production deployment automation are intentionally deferred to later approved tasks.
