# Architecture

## application type
Fullstack Next.js application using the App Router.

## planned stack
- Framework: Next.js App Router.
- Language: TypeScript.
- Styling: Tailwind CSS.
- UI components: shadcn/ui.
- Database: Neon Postgres.
- ORM: Prisma.
- Authentication: custom email/password auth.
- Validation: Zod.
- Deployment target: VPS.
- E2E testing: TestSprite when configured, with local browser-based preflight when needed.

## environment variables
The Neon connection string must be provided through environment variables and must not be committed.

Required:
- `DATABASE_URL`
- `AUTH_SECRET`

Likely required:
- `NEXT_PUBLIC_APP_URL`

## recommended modules
- `auth`: registration, login, logout, password hashing, session handling.
- `workspaces`: workspace creation, selection, ownership, membership, and existing-user email invites.
- `todos`: todo CRUD, completion, priorities, labels, due dates.
- `calendar`: date-based todo views and planning flows.
- `roadmap`: larger goals and links between roadmap items and todos.
- `pomodoro`: focus sessions and timer behavior.
- `analytics`: focus and productivity aggregates derived from todos and pomodoro sessions.
- `dashboard`: aggregates and user-facing summaries.

## initial schema recommendation
- `User`
  - id
  - name
  - email
  - passwordHash
  - createdAt
  - updatedAt
- `Session` or auth-provider equivalent
  - id
  - userId
  - tokenHash
  - expiresAt
  - createdAt
- `Workspace`
  - id
  - name
  - ownerId
  - createdAt
  - updatedAt
- `WorkspaceMember`
  - id
  - workspaceId
  - userId
  - role: `owner`, `member`
  - createdAt
- `WorkspaceInvite`
  - id
  - workspaceId
  - email
  - role: `member`
  - status
  - invitedById
  - createdAt
- `Todo`
  - id
  - workspaceId
  - creatorId
  - assigneeId
  - title
  - description
  - status: `todo`, `in_progress`, `blocked`, `done`
  - priority: `low`, `medium`, `high`, `urgent`
  - dueDate
  - completedAt
  - roadmapItemId
  - createdAt
  - updatedAt
- `Label`
  - id
  - workspaceId
  - name
  - color
- `TodoLabel`
  - todoId
  - labelId
- `RoadmapItem`
  - id
  - workspaceId
  - title
  - description
  - status: `planned`, `in_progress`, `blocked`, `done`
  - priority
  - startDate
  - targetDate
  - position
  - createdAt
  - updatedAt
- `PomodoroSession`
  - id
  - workspaceId
  - userId
  - todoId
  - startedAt
  - endedAt
  - durationMinutes
  - status
  - createdAt

## auth approach
- Use custom auth for MVP.
- Hash passwords with a modern password hashing library such as argon2 or bcrypt.
- Store session tokens as hashes in the database.
- Use secure, httpOnly cookies for sessions.
- Create a default workspace for each user during registration.

## important architecture decisions
- All user-owned data should be scoped by workspace.
- Workspace membership is required in MVP.
- Workspace roles are limited to `owner` and `member` for MVP.
- Workspace invites target existing users by email and do not send real emails in MVP.
- Todo assignment is creator-only in MVP.
- Roadmap board statuses are `planned`, `in_progress`, `blocked`, `done`.
- Server-side mutations must validate input and enforce workspace access.
- Date behavior should be explicit because daily planning depends on local date boundaries.
- The MVP should avoid advanced automation until the core planning loop is solid.
