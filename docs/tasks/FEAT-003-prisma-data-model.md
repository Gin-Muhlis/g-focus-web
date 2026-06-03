# Task

## id
`FEAT-003`

## title
Create the Prisma data model and database foundation.

## owner
`fullstack-developer`

## status
`Backlog`

## context
The MVP requires workspace-scoped persistence for users, sessions, todos, labels, roadmap items, invites, and pomodoro history. A clear schema is needed before auth and feature mutations are implemented.

## scope
- In scope:
  - Add Prisma and configure Neon Postgres via `DATABASE_URL`.
  - Implement initial schema for User, Session, Workspace, WorkspaceMember, WorkspaceInvite, Todo, Label, TodoLabel, RoadmapItem, and PomodoroSession.
  - Add enum or constrained status/priority/role fields according to architecture.
  - Add database client utilities safe for Next.js server usage.
  - Add migration/setup documentation.
- Out of scope:
  - UI screens.
  - Auth route handlers.
  - Seed data beyond minimal local development support if useful.

## acceptance criteria
- [ ] Prisma schema represents all MVP entities from `docs/architecture.md`.
- [ ] Workspace-scoped models have the required relations for access checks.
- [ ] Session tokens can be stored as hashes with expiration timestamps.
- [ ] Todo labels and roadmap links are modeled.
- [ ] Local setup docs explain migration commands without exposing secrets.

## implementation notes
- Date handling must support daily planning based on explicit local date boundaries.
- Workspace invites target existing users by email in MVP and do not send emails.
- Todo assignment is creator-only in MVP, but schema may keep `assigneeId` for future expansion.

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
