# Task

## id

`FEAT-002`

## title

Implement the dark editorial design system foundation.

## owner

`fullstack-developer`

## status

`Backlog`

## context

The app needs a consistent visual foundation before feature screens are built. The target style is a dark-first, editorial tech interface with restrained glassmorphism, dense scanning layouts, soft neon accents, and accessible contrast.

## scope

- In scope:
  - Configure Tailwind theme tokens for dark backgrounds, surfaces, borders, text, accent colors, radius, and spacing.
  - Install and configure shadcn/ui primitives needed by the MVP.
  - Create reusable layout primitives for cards, buttons, badges, inputs, dialogs/drawers, and empty states.
  - Add responsive app surface patterns for desktop and mobile.
  - Treat `docs/design-system.md` as the canonical product visual contract.
  - Use `.openclaw/templates/design-system-template.md` as supporting inspiration only.
- Out of scope:
  - Feature-specific business logic.
  - Full dashboard, calendar, roadmap, or pomodoro screens.
  - Marketing landing page polish beyond baseline public entry UI.

## acceptance criteria

- [ ] Shared UI primitives match the approved dark editorial visual language.
- [ ] Buttons, cards, badges, inputs, and dialogs have accessible focus states and contrast.
- [ ] Layout primitives support desktop content density and mobile readability.
- [ ] Design tokens are centralized and documented enough for later feature tasks.
- [ ] No feature screen depends on one-off styling that should be a shared primitive.

## implementation notes

- Use dark backgrounds near `#0D0E11`/`#0F1117`, elevated cards, subtle borders, blue/purple accents, and moderate radii.
- Avoid heavy blur or decorative effects that reduce readability.
- Use cards as repeated content units, not nested card-heavy page sections.
- Keep letter spacing normal except small all-caps labels when appropriate.

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
