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
  - Add desktop sidebar or top-level navigation for Dashboard, Today, Calendar, Roadmap, Pomodoro, and Workspace settings.
  - Add mobile navigation optimized for quick todo entry and daily review.
  - Add workspace switcher placement and account/logout access.
  - Add loading and empty shell states.
- Out of scope:
  - Full feature implementation for each navigation target.
  - Workspace invite logic beyond linking to the later workspace settings area.

## acceptance criteria
- [ ] Authenticated users see a consistent app shell across app routes.
- [ ] Desktop navigation is persistent and scan-friendly.
- [ ] Mobile navigation is usable without horizontal scrolling.
- [ ] Active route and workspace context are visible.
- [ ] Shell styling follows the dark editorial design system.

## implementation notes
- Use shared primitives from `FEAT-002`.
- Keep navigation labels aligned with `docs/design-system.md`.
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
