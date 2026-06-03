# Design System

## direction
Dark-first editorial tech interface inspired by modern AI/devtool products and ClickUp-style productivity density. The app should feel focused, futuristic, trustworthy, premium, and fast to scan.

The detailed UI reference lives in `.openclaw/templates/design-system-template.md`; this document is the product-facing implementation summary that feature tasks should treat as canonical.

## core principles
- Use dark layered surfaces with high-contrast typography.
- Use soft blue and violet accents, subtle glow, and restrained glassmorphism.
- Prioritize information density without visual clutter.
- Use cards as repeated content primitives for todos, metrics, roadmap items, and focus history.
- Keep chrome minimal so daily planning, execution, and review stay central.
- Maintain readable mobile layouts with no horizontal text overflow.

## color system
- Page background: `#0D0E11` or `#0F1117`.
- Card/surface background: `#161820` or `#1A1C24`.
- Raised surface: `#1E2030` or `#22253A`.
- Border: `rgba(255,255,255,0.08)`.
- Hover/active border: `rgba(255,255,255,0.15)`.
- Primary accent: electric blue, around `#4A9EFF` or `#3B8EEA`.
- Secondary accent: soft violet, around `#8B5CF6` or `#7C6FF7`.
- Success: muted green, around `#34D399` or `#10B981`.
- Warning: soft amber, around `#F59E0B`.
- Error: muted red, around `#EF4444`.
- Primary text: near-white, around `#F0F2F8`.
- Secondary text: `#9CA3AF` or `#8B95A6`.

## typography
- Use a clean geometric sans such as Plus Jakarta Sans, DM Sans, or system fallback.
- Use a mono font such as JetBrains Mono, Fira Code, or SF Mono for code-like metadata if needed.
- Hero/page titles: 32-48px, 700 weight.
- Section/card titles: 20-24px, 600 weight.
- Body/UI text: 14-16px, 400 weight.
- Captions/badges: 11-13px, 400-500 weight.
- Body line height should be around 1.5; headings around 1.2-1.3.
- Avoid negative letter spacing. Use slightly increased letter spacing only for small all-caps labels.

## spacing and radius
- Use an 8px base grid.
- Card padding: 24px desktop, 16px mobile.
- Major section spacing: 48-64px.
- Component gaps: 16-20px.
- Large cards/modals: 16px radius.
- Standard cards: 12px radius.
- Buttons and inputs: 8px radius.
- Chips/badges: 6px radius.
- Avoid fully pill-shaped buttons unless a specific component pattern requires it.

## layout
- Authenticated app uses a dense dashboard-first shell.
- Desktop should use persistent navigation, ideally sidebar-based when feature density grows.
- Mobile should use compact navigation optimized for quick todo entry and today/tomorrow review.
- Content should be constrained around 1200px where appropriate, with 24px page padding on desktop.
- Common dashboard layout patterns:
  - 3-4 stat cards in a row on desktop.
  - 2/3 main content with 1/3 side panel where useful.
  - Stacked, readable sections on mobile.

## navigation
- Dashboard
- Today
- Calendar
- Roadmap
- Pomodoro
- Workspace settings

## component patterns
- Cards:
  - Dark elevated surface.
  - Subtle border and optional soft glow.
  - Hover may lift slightly, but should not distract.
- Buttons:
  - Primary uses blue-to-violet gradient.
  - Secondary/ghost uses transparent dark surface and subtle border.
  - Icon buttons should have accessible labels.
- Badges/chips:
  - Small, 6px radius, tinted background, high-contrast label.
  - Use for status, priority, labels, and metadata.
- Inputs:
  - Dark surface with clear border and focus ring.
  - Must show validation and saving/error states.
- Dialogs/drawers:
  - Use raised dark surfaces.
  - Prefer drawers for mobile todo editing when ergonomic.
- Progress and metrics:
  - Thin progress bars.
  - Large numbers for primary stats.
  - Clear trend/status colors.

## core screens and components
- Public entry and auth forms.
- Authenticated app shell.
- Workspace switcher.
- Dashboard summary widgets.
- Todo list and todo item row/card.
- Quick add todo input.
- Todo editor dialog/drawer.
- Today review and tomorrow planning panel.
- Calendar monthly and weekly views.
- Roadmap board.
- Pomodoro timer panel.
- Focus history and analytics widgets.
- Workspace settings and member invite dialog.

## todo states
- Empty
- Loading
- Saving
- Error
- Complete
- Overdue
- Due today
- Planned for tomorrow

## accessibility
- Todo creation, editing, completion, navigation, and dialogs must be keyboard-accessible.
- Focus states must be visible on dark surfaces.
- Text contrast must remain sufficient over glass surfaces and glow effects.
- Buttons and icon controls need accessible names.
- Mobile controls must be large enough for reliable touch input.

## implementation constraints
- Do not let decorative blur reduce readability.
- Do not create card-in-card layouts for page sections.
- Do not overuse gradient/orb decorations; glows should support hierarchy, not become the UI.
- Text must not overlap or overflow its containers on mobile or desktop.
- Use stable component dimensions for repeated items such as todo rows, boards, counters, and icon buttons.
