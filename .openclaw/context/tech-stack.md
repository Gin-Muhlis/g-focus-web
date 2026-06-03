# Tech Stack

## status
Partially approved. Remaining schema and auth implementation details still need confirmation.

## current product target
- Product: daily todo-list web application.
- Application type: fullstack Next.js.
- Primary users: public multi-user app users.
- Deployment target: VPS.

## recommended baseline
- Framework: Next.js App Router.
- Language: TypeScript.
- Styling: Tailwind CSS.
- UI primitives: shadcn/ui.
- Validation: Zod.
- Database: Neon Postgres.
- ORM: Prisma.
- Auth: custom email/password auth for MVP.
- Testing: unit/integration with Vitest or Jest, E2E with Playwright plus TestSprite where configured.
- Package manager: use the repository's existing lockfile once the app is scaffolded.

## decisions needed
- Password hashing library: argon2 or bcrypt.
- Exact VPS deployment shape: Node process + reverse proxy, Docker, or another process manager.
- Exact session implementation details.
- Workspace invite UX detail for users that do not exist yet.
- Whether calendar sync is deferred or planned.
