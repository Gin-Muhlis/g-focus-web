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
- `npm run e2e:migrate` applies Prisma migrations to the disposable E2E database from `E2E_DATABASE_URL`.
- `npm run e2e:local` starts a temporary local PGlite Postgres database, applies migrations, and runs Playwright.
- `npm run e2e` runs the Playwright browser smoke tests.
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

## E2E Testing

The Playwright suite mutates users, workspaces, todos, and labels. To avoid
accidentally writing to production-like data, `npm run e2e` refuses to start
unless the database URL is explicitly safe for browser tests.

Use a disposable local/test database and run migrations before starting E2E:

```bash
E2E_DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/g_focus_e2e" \
  npm run e2e:migrate

E2E_DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/g_focus_e2e" \
  npm run e2e
```

`npm run e2e:migrate` passes `E2E_DATABASE_URL` to Prisma as `DATABASE_URL`
internally because Prisma migrations read `DATABASE_URL` from
`prisma.config.ts`. `E2E_DATABASE_URL` is required for migrations and preferred
for browser tests. A `DATABASE_URL` containing a clear local/test marker such as
`localhost`, `127.0.0.1`, `test`, or `e2e` is also accepted by Playwright for
local runs.

When system Postgres or Docker is unavailable, use the self-contained local E2E
runner:

```bash
npm run e2e:local -- e2e/todo-management.spec.ts
```

The local runner starts a temporary PGlite Postgres-compatible socket, applies
the committed SQL migrations through `pg`, runs Playwright with a safe
`E2E_DATABASE_URL`, and deletes the temporary database after the run.
