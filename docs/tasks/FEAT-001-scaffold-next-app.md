# Task

## id
`FEAT-001`

## title
Scaffold the Next.js application foundation.

## owner
`fullstack-developer`

## status
`Backlog`

## context
`g-focus-web` needs a production-ready fullstack Next.js baseline before feature work can start. This task establishes the repository structure, core tooling, and environment contract for the MVP.

## scope
- In scope:
  - Scaffold a Next.js App Router project with TypeScript.
  - Configure Tailwind CSS, ESLint, formatting conventions, and path aliases.
  - Add baseline app routes for public, auth, and authenticated app areas.
  - Add `.env.example` coverage for required runtime variables.
  - Add README setup notes for local development.
- Out of scope:
  - Authentication implementation.
  - Database schema and migrations.
  - Production deployment automation.

## acceptance criteria
- [ ] The app starts locally with the documented package manager command.
- [ ] TypeScript, lint, and build scripts are available.
- [ ] The App Router directory structure is ready for public/auth/app route groups.
- [ ] Tailwind is configured and usable in app styles.
- [ ] Environment variable requirements are documented without secrets.

## implementation notes
- Follow `.openclaw/context/tech-stack.md`.
- Use the package manager selected by the scaffolded lockfile.
- Prefer route groups such as `(public)`, `(auth)`, and `(app)` if they keep app boundaries clear.
- Keep the initial UI minimal; detailed styling belongs in `FEAT-002`.

## verification
- [ ] lint
- [ ] typecheck
- [ ] tests
- [ ] build
- [ ] E2E/TestSprite

## handoff
- Developer summary:
- Reviewer result:
- E2E result:
