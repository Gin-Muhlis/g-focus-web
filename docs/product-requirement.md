# Product Requirement

## product
`g-focus-web` is a multi-user daily productivity web app for planning tomorrow, reviewing today, managing todo work, and tracking longer-term roadmaps.

## target users
- Public multi-user application.
- Users who want a structured daily planning ritual:
  - Night: review today's todos and plan tomorrow.
  - Next day: work through planned todos, complete items, and repeat the cycle.

## product goals
- Make daily planning fast and clear.
- Provide an informative dashboard inspired by ClickUp.
- Support workspace-based organization.
- Support calendar and roadmap views so todos are not isolated from larger plans.
- Keep the UI productive, minimal, and visually distinctive with restrained glassmorphism.

## mvp features
- Email/password authentication:
  - register
  - login
  - logout
  - custom auth with secure password hashing and session cookies
- Workspace:
  - create workspace
  - select active workspace
  - workspace-owned data
  - invite existing users by email
  - member roles: `owner`, `member`
- Dashboard:
  - today's overview
  - upcoming todos
  - completion progress
  - priority summary
  - roadmap snapshot
- Calendar:
  - view todos by date
  - plan tomorrow from evening review flow
  - monthly view
  - weekly view
- Todos:
  - create
  - edit
  - delete
  - complete/uncomplete
  - due date
  - priority
  - labels
  - notes/description
  - creator-only assignment in MVP
- Roadmap:
  - organize larger goals or initiatives
  - connect todos to roadmap items where useful
  - board view for MVP
  - timeline view after board foundation is stable
- Pomodoro:
  - focus timer for todo execution
  - saved session history
  - focus analytics

## workflow
1. User logs in.
2. User lands on dashboard.
3. User reviews today's todo list and completion status.
4. User adds or adjusts todos for tomorrow.
5. User works through today's todos the next day.
6. User completes todos, reviews progress, and repeats the planning cycle.

## design direction
- Minimal productive interface.
- Glassmorphism accents, but not generic or over-decorated.
- Balanced desktop and mobile experience.
- Dashboard and roadmap inspiration: ClickUp.

## non-goals for initial MVP
- Team billing.
- Public sharing.
- Enterprise permissions.
- Native mobile apps.
- Complex automation.

## open questions
- Should calendar sync with Google Calendar be planned now or deferred?
- What exact analytics should the dashboard show in MVP?
