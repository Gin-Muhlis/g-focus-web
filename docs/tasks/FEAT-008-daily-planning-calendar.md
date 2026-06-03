# Task

## id
`FEAT-008`

## title
Build today, tomorrow planning, and calendar views.

## owner
`fullstack-developer`

## status
`Backlog`

## context
The product's core workflow is a night planning and next-day execution loop. Users need a Today view, a tomorrow planning flow, and monthly/weekly calendar views tied to todo due dates.

## scope
- In scope:
  - Add Today view for due-today and overdue todos.
  - Add tomorrow planning flow for reviewing today and planning the next day.
  - Add weekly and monthly calendar views showing todos by date.
  - Allow date changes and quick todo creation for selected dates.
  - Handle empty, loading, and error states.
- Out of scope:
  - Google Calendar sync.
  - Recurring tasks.
  - Time-block scheduling.

## acceptance criteria
- [ ] Users can see overdue, due-today, and planned-tomorrow todos.
- [ ] Users can create or adjust todos for tomorrow from the planning flow.
- [ ] Monthly and weekly calendar views show todos by date.
- [ ] Selecting a date supports quick todo review and creation.
- [ ] Date handling is explicit and consistent for local daily boundaries.

## implementation notes
- Calendar sync is deferred for MVP.
- Use todo due dates as the source of calendar placement.
- Keep mobile planning flow fast and focused.

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
