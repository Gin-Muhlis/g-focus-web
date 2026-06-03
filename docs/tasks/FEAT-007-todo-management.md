# Task

## id
`FEAT-007`

## title
Implement workspace-scoped todo management with labels and priority.

## owner
`fullstack-developer`

## status
`Backlog`

## context
Todos are the core object of the daily planning loop. Users need reliable CRUD, completion, due dates, priorities, notes, labels, and workspace scoping before dashboard and calendar views can be meaningful.

## scope
- In scope:
  - Create, edit, delete, complete, and uncomplete todos.
  - Support title, description/notes, status, priority, due date, and labels.
  - Enforce workspace access and creator-only assignment in MVP.
  - Add todo list and editor UI with loading, empty, saving, success, and error states.
  - Add server-side validation for mutations.
- Out of scope:
  - Recurring todos.
  - Multi-user assignment beyond creator-only.
  - Advanced filters beyond what is needed for MVP views.

## acceptance criteria
- [ ] Users can manage todos inside the active workspace.
- [ ] Todo mutations validate input server-side.
- [ ] Completed todos can be toggled without losing metadata.
- [ ] Labels and priorities render with clear visual signals.
- [ ] Non-members cannot access or mutate todos from another workspace.

## implementation notes
- Todo statuses: `todo`, `in_progress`, `blocked`, `done`.
- Priorities: `low`, `medium`, `high`, `urgent`.
- Use accessible controls and keyboard-friendly quick entry.

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
