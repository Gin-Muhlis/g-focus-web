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
- `npm run typecheck` generates the Prisma client, then runs TypeScript without emitting files.
- `npm run format:check` checks Prettier formatting.
- `npm run build` generates the Prisma client, then creates a production build.
- `npm run start` serves a production build.

## App Structure

- `src/app/(public)` contains public marketing and product entry routes.
- `src/app/(auth)` contains authentication routes.
- `src/app/(app)` contains authenticated product routes.

Authentication and production deployment automation are intentionally deferred to later approved tasks.

## Database

This app uses Prisma with Neon Postgres. Keep the real connection string in a local environment file and never commit it:

```bash
cp .env.example .env.local
```

Generate the Prisma client after installing dependencies or after changing the schema when you need it outside the normal typecheck/build flow:

```bash
npm run prisma:generate
```

Validate the schema:

```bash
npm run prisma:validate
```

Create and apply a local development migration when `DATABASE_URL` points at a disposable development database:

```bash
npm run prisma:migrate:dev -- --name initial_schema
```

The generated Prisma client is written to `src/generated/prisma` and intentionally ignored by git. The committed source of truth is `prisma/schema.prisma`.
`npm run typecheck` and `npm run build` run Prisma generation first so clean checkouts compile without committing generated files.
