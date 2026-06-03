# Task

## id
`FEAT-010`

## title
Implement roadmap board and todo links.

## owner
`fullstack-developer`

## status
`Backlog`

## context
Roadmap items let users connect daily todos to larger goals. The MVP starts with a board view using planned, in-progress, blocked, and done statuses; timeline view is deferred until the board foundation is stable.

## scope
- In scope:
  - Create, edit, delete, and reorder roadmap items.
  - Show board columns for `planned`, `in_progress`, `blocked`, and `done`.
  - Support priority, start date, target date, and description.
  - Link todos to roadmap items.
  - Show linked todo counts or summaries on roadmap cards.
- Out of scope:
  - Timeline view.
  - Dependencies between roadmap items.
  - Public sharing.

## acceptance criteria
- [ ] Users can manage roadmap items in the active workspace.
- [ ] Roadmap board columns reflect item status.
- [ ] Todos can be linked to a roadmap item.
- [ ] Roadmap cards show enough metadata for scanning progress.
- [ ] Workspace access is enforced for roadmap and linked todo operations.

## implementation notes
- Preserve a `position` field for board ordering.
- Keep the board usable on mobile with horizontal overflow or stacked columns only when readable.
- Timeline is explicitly deferred.

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
