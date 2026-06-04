# Task

## id

`FEAT-006`

## title

Create the authenticated app shell and navigation.

## owner

`fullstack-developer`

## status

`Backlog`

## context

The dashboard, today, calendar, roadmap, pomodoro, and workspace settings features need a shared authenticated shell that supports fast scanning, workspace switching, and responsive navigation.

## scope

- In scope:
  - Build the authenticated app shell.
  - Add a persistent desktop sidebar for Dashboard, Today, Calendar, Roadmap, Pomodoro, and Workspace settings.
  - Add mobile navigation optimized for quick todo entry and daily review.
  - Add workspace switcher placement and account/logout access.
  - Add loading and empty shell states.
- Out of scope:
  - Full feature implementation for each navigation target.
  - Workspace invite logic beyond linking to the later workspace settings area.

## acceptance criteria

- [ ] Authenticated users see a consistent app shell across app routes.
- [ ] Every desktop `/app` route uses a persistent, grouped, and scan-friendly left sidebar.
- [ ] Mobile navigation is usable without horizontal scrolling.
- [ ] Active route and workspace context are visible.
- [ ] Shell styling follows the non-generic quality bar in `docs/design-system.md`.

## implementation notes

- Use shared primitives from `FEAT-002`.
- Treat `docs/design-system.md` as the canonical visual and navigation contract.
- Avoid nested cards inside shell sections.

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
