# Task

## id

`FEAT-013`

## title

Redesign the core product experience.

## owner

`fullstack-developer`

## status

`Backlog`

## priority

Complete this task before continuing with subsequent feature implementation.

## context

The current homepage, sign-in screen, app shell, and dashboard foundation are functional but too simple, generic, and visually sparse. They do not yet meet the intended modern productivity command-center quality bar. This task establishes the visual benchmark that later features must extend.

## scope

- In scope:
  - Redesign the public homepage with a distinctive hero, product preview, feature storytelling, credibility content, and clear calls to action.
  - Redesign the sign-in experience with a polished responsive composition and supporting product-value visual.
  - Redesign `/app` and all authenticated shell routes around a persistent desktop sidebar and appropriate mobile navigation.
  - Redesign the dashboard into an informative overview with useful actions, task context, progress, focus activity, roadmap/deadline context, and multiple data visualizations.
  - Add and configure ApexCharts for dashboard charts and sparklines.
  - Improve shared tokens and UI primitives where required to support the new visual direction.
  - Add polished loading, empty, hover, focus, and responsive states.
- Out of scope:
  - Completing todo, calendar, roadmap, workspace, or Pomodoro business logic assigned to later feature tasks.
  - Custom dashboard configuration.
  - Long-range analytics beyond representative or currently available data.

## acceptance criteria

- [ ] All redesigned screens follow `docs/design-system.md`, including its non-generic quality bar.
- [ ] Homepage has a high-impact, responsive hero with a product preview and at least three informative sections below it.
- [ ] Sign-in has a deliberate desktop composition and a focused, polished mobile state.
- [ ] Every desktop `/app` route uses a persistent left sidebar with clear groups, active state, workspace context, and account/settings access.
- [ ] Dashboard first viewport clearly communicates what matters today, current progress, and the next best action.
- [ ] Dashboard includes four contextual KPIs, a prominent ApexCharts productivity/completion chart, priority/status visualization, today's tasks, focus summary, and upcoming/roadmap context.
- [ ] Dashboard modules are visually varied and intentionally composed rather than a grid of identical cards.
- [ ] Backgrounds use restrained modern blue-violet-cyan gradient atmosphere without reducing readability.
- [ ] Screens contain no placeholder copy that describes future implementation work.
- [ ] Loading, empty, hover, keyboard focus, reduced-motion, and zero-data chart states are polished.
- [ ] Layouts are visually verified at `1440px`, `1024px`, `768px`, and `390px` without horizontal overflow.

## implementation notes

- Treat `docs/design-system.md` as canonical; `.openclaw/templates/design-system-template.md` is supporting inspiration only.
- Prefer a cohesive bento-style dashboard composition with a `2/3 + 1/3` main analytics row.
- Use ApexCharts for area/line, donut/radial, and sparkline visualizations.
- Use representative structured data only where real feature data is not available yet, and isolate it so later tasks can replace it cleanly.
- Preserve accessible semantics, keyboard interactions, visible focus states, and chart summaries.
- Update shared primitives instead of creating one-off page-specific copies.

## verification

- [ ] lint
- [ ] typecheck
- [ ] tests
- [ ] build
- [ ] Visual verification at `1440px`, `1024px`, `768px`, and `390px`
- [ ] E2E/TestSprite

## handoff

- Developer summary:
- Reviewer result:
- E2E result:
