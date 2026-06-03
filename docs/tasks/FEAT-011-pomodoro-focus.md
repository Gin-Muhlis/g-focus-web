# Task

## id
`FEAT-011`

## title
Build pomodoro timer, session history, and focus analytics.

## owner
`fullstack-developer`

## status
`Backlog`

## context
The pomodoro feature supports todo execution and focus analytics. Users need a timer that can attach focus sessions to todos and persist completed sessions for dashboard summaries.

## scope
- In scope:
  - Add pomodoro timer UI for focus sessions.
  - Allow optional linking of a focus session to a todo.
  - Persist session history with start/end timestamps, duration, and status.
  - Show recent focus history and basic focus analytics.
  - Handle timer running, paused/stopped, completed, and discarded states.
- Out of scope:
  - Notifications.
  - Cross-device live timer sync.
  - Advanced focus reports.

## acceptance criteria
- [ ] Users can start and complete a focus session.
- [ ] Users can link a focus session to an active workspace todo.
- [ ] Completed sessions are saved and visible in history.
- [ ] Focus summaries can be used by the dashboard.
- [ ] Timer UI remains usable on desktop and mobile.

## implementation notes
- Persist server state only for meaningful session milestones.
- Prevent sessions from being written to another workspace.
- Keep analytics simple: total focus minutes, completed sessions, and recent activity are enough for MVP.

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
