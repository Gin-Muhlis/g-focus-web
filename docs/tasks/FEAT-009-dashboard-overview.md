# Task

## id
`FEAT-009`

## title
Create the productivity dashboard overview.

## owner
`fullstack-developer`

## status
`Backlog`

## context
Users should land on a clear dashboard that summarizes today's work, upcoming todos, completion progress, priority distribution, roadmap status, and focus activity.

## scope
- In scope:
  - Add dashboard summary widgets for today's overview, upcoming todos, completion progress, and priority summary.
  - Add roadmap snapshot when roadmap data exists.
  - Add focus/pomodoro summary when session data exists.
  - Add empty states for new users.
  - Keep dashboard dense, scan-friendly, and responsive.
- Out of scope:
  - Complex analytics beyond MVP summaries.
  - Custom dashboard configuration.
  - Long-range trend charts beyond available MVP data.

## acceptance criteria
- [ ] Authenticated users land on the dashboard after login.
- [ ] Dashboard aggregates are scoped to the active workspace.
- [ ] Today's overview and upcoming todo widgets reflect real todo data.
- [ ] Progress and priority summaries handle zero-data states.
- [ ] The layout matches the dark editorial, ClickUp-inspired direction.

## implementation notes
- Derive metrics from todos, roadmap items, and pomodoro sessions.
- Use server-side access checks for workspace-scoped aggregates.
- Avoid overbuilding analytics until the core planning loop is stable.

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
