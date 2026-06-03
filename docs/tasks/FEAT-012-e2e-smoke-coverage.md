# Task

## id
`FEAT-012`

## title
Add MVP E2E smoke coverage and release preflight.

## owner
`fullstack-developer`

## status
`Backlog`

## context
The team workflow requires E2E/TestSprite validation before PR readiness. The MVP needs repeatable smoke coverage for auth, workspace selection, todo management, planning, calendar, roadmap, dashboard, and pomodoro flows.

## scope
- In scope:
  - Add local E2E tooling and scripts if not already present.
  - Add smoke tests for registration/login/logout.
  - Add workspace, todo CRUD, today/tomorrow planning, calendar, roadmap, dashboard, and pomodoro smoke paths.
  - Add test data setup/cleanup guidance.
  - Document how `e2e-tester` should run local preflight and TestSprite when configured.
- Out of scope:
  - Exhaustive visual regression.
  - Load testing.
  - Production monitoring.

## acceptance criteria
- [ ] E2E scripts are documented and runnable locally.
- [ ] Critical MVP flows have smoke coverage.
- [ ] Tests avoid real production credentials and secrets.
- [ ] E2E setup can run against a controlled local database.
- [ ] Failure output is useful for handoff to `fullstack-developer`.

## implementation notes
- Prefer Playwright for local browser preflight unless the scaffold selects another established E2E tool.
- TestSprite remains the preferred remote E2E path when configured.
- Keep tests stable and focused on critical user flows.

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
