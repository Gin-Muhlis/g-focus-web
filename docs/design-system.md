# g-focus Design System

## source of truth

This document is the canonical and product-specific visual contract for every g-focus screen. Developers must read and follow it before implementing or reviewing UI work.

`.openclaw/templates/design-system-template.md` is supporting inspiration only. When the template and this document differ, this document wins. Feature acceptance criteria and reviews must reject screens that technically use the tokens but still look generic, sparse, unfinished, or visually interchangeable with a starter template.

## visual direction

g-focus is a modern productivity command center: focused, energetic, intelligent, and premium. The interface combines dark editorial surfaces, useful information density, rich data visualization, and atmospheric blue-violet gradients.

Every primary screen must feel intentionally composed rather than assembled from default cards. It should contain:

- A clear visual focal point.
- Useful context and next actions above the fold.
- Deliberate hierarchy through scale, contrast, spacing, and composition.
- At least one distinctive visual element such as an ambient gradient, progress visualization, timeline, chart, task preview, or focus indicator.
- Polished loading, empty, hover, active, and responsive states.

## non-generic quality bar

The following are not acceptable:

- A page made primarily from a heading followed by several identical cards.
- Large empty areas without useful context or intentional visual composition.
- Placeholder copy that describes future tasks or implementation status.
- Decorative gradients that do not support hierarchy.
- Repeating the same card shape, padding, and visual weight for every content type.
- A dashboard that only displays static numbers without trends, charts, progress, or actionable content.
- A desktop `/app` route without a persistent sidebar.

Before handoff, compare each screen against this quality bar at desktop and mobile widths. A functional but visually generic screen is incomplete.

## core principles

- **Command center, not admin template:** prioritize today, progress, focus, and the next best action.
- **Dense but calm:** show meaningful data without clutter; use hierarchy instead of excessive whitespace.
- **Visual storytelling:** charts, progress rings, timelines, and task previews should explain status quickly.
- **Layered depth:** combine atmospheric backgrounds, distinct surfaces, subtle borders, and restrained glow.
- **Actionable states:** every major module should expose a useful action, not just information.
- **Responsive by composition:** reorganize modules for smaller screens instead of only stacking everything.
- **Accessible polish:** preserve contrast, keyboard access, reduced-motion support, and visible focus states.

## color and atmosphere

### foundation tokens

- Page base: `#080A10`.
- Page elevated base: `#0D1019`.
- Sidebar: `rgba(10, 12, 20, 0.88)` with backdrop blur.
- Surface: `rgba(22, 25, 38, 0.78)`.
- Raised surface: `#1B1F30`.
- Strong surface: `#222740`.
- Border: `rgba(255,255,255,0.08)`.
- Active border: `rgba(125,145,255,0.38)`.
- Primary accent: `#579DFF`.
- Secondary accent: `#9B72FF`.
- Cyan accent: `#4DE2D1`.
- Success: `#34D399`.
- Warning: `#F6B94A`.
- Error: `#F16D7A`.
- Primary text: `#F5F7FF`.
- Secondary text: `#A4ADC1`.
- Muted text: `#697287`.

### gradient language

- Primary action: `linear-gradient(135deg, #579DFF 0%, #7C6FF7 52%, #A855F7 100%)`.
- Hero atmosphere: layered radial gradients using blue, violet, and cyan at `10-24%` opacity over the page base.
- Highlight surface: subtle gradient border or inner glow, never a flat saturated block.
- Positive data: cyan-to-green gradients.
- Urgent data: amber-to-red gradients.

Use gradients on page atmosphere, primary actions, chart series, progress indicators, and selected highlights. Do not apply a gradient to every card.

## typography

- Display and UI font: Plus Jakarta Sans or a comparable geometric sans.
- Metadata and time values may use JetBrains Mono or a comparable mono font.
- Marketing hero: `56-72px` desktop, `40-48px` tablet, `34-40px` mobile; bold with tight but readable line height.
- App page title: `30-40px`, `700`.
- Primary metric: `32-44px`, `700`.
- Section title: `18-24px`, `600-700`.
- Body/UI: `14-16px`, `400-500`.
- Caption/badge: `11-13px`, `500-600`.
- Use short eyebrow labels, strong numeric hierarchy, and compact supporting copy.

## spacing, shape, and depth

- Use an 8px base grid with 4px for fine alignment.
- App page padding: `24-32px` desktop, `16-20px` mobile.
- Section gaps: `24-32px` in the app and `64-112px` on marketing pages.
- Standard module padding: `20-24px`.
- Hero or feature module padding: `28-40px`.
- Standard radius: `16px`; prominent module radius: `20-24px`; controls: `10-12px`.
- Use a mix of module sizes and shapes to create rhythm; avoid a uniform card grid.
- Prefer subtle layered shadows and inner highlights over heavy drop shadows.

## page background

All primary routes must use an atmospheric background rather than a single flat color:

- Keep the dark base readable.
- Add two or three low-opacity radial gradient fields with different sizes and positions.
- Add an optional subtle grid/noise texture for depth.
- Keep atmospheric effects fixed or slow-moving so they do not distract.
- Respect `prefers-reduced-motion`.

## authenticated app shell

All desktop routes matching `/app` and `/app/**` must use a persistent left sidebar.

### desktop sidebar

- Width: `248-280px`; collapsible to an icon rail when useful.
- Include product identity, workspace switcher, primary navigation, quick-add action, focus status or daily progress, and account/settings access.
- Show a strong active state using a tinted surface, gradient edge, or glow.
- Group navigation by purpose instead of presenting one undifferentiated list.
- Keep the content canvas independent and scrollable.

### app top bar

- Use a compact content top bar for breadcrumbs/context, global search or command trigger, notifications, and contextual primary action.
- Do not duplicate the full sidebar navigation in the top bar.

### mobile shell

- Replace the persistent sidebar with a drawer or compact bottom navigation.
- Keep quick-add and today/focus actions reachable with one thumb.
- Preserve workspace and account access without horizontal overflow.

## dashboard composition

The dashboard must be an informative, actionable overview rather than a row of counters.

Required modules:

- Personalized greeting and today summary with the next best action.
- Four compact KPI cards with trend or comparison context.
- A prominent completion/productivity trend chart using ApexCharts.
- Today's task list or timeline with priority, due time, and completion controls.
- Focus or Pomodoro summary with duration, streak, and recent sessions.
- Upcoming deadlines or roadmap snapshot.
- Priority/status distribution visualization.
- Useful empty states that explain value and provide an action.

Recommended desktop composition:

- Top row: greeting/context panel plus compact focus or daily-goal panel.
- KPI strip: four visually distinct metrics with sparklines or trend labels.
- Main grid: `2/3` productivity chart and `1/3` today's progress/focus panel.
- Lower grid: task timeline/list plus roadmap or upcoming items.

Use ApexCharts for line, area, donut, radial bar, and compact sparkline visualizations. Charts must:

- Match the blue-violet-cyan palette.
- Include readable labels/tooltips and meaningful zero-data states.
- Avoid unnecessary legends and chart chrome.
- Resize correctly without overflowing modules.
- Use real data when available and clearly structured representative data only for design prototypes.

## screen recipes

### homepage

- Use a high-impact hero with outcome-focused copy, strong primary and secondary CTAs, and an interactive-looking product preview.
- Show a dashboard/product mockup above the fold, not only abstract marketing copy.
- Include social proof or credibility indicators, feature storytelling, a productivity workflow section, and a final CTA.
- Use asymmetric composition, ambient gradients, and layered previews to avoid a generic SaaS landing page.

### sign-in

- Use a split or layered composition on desktop: focused auth form plus a visual/product-value panel.
- Include brand context, concise benefit copy, trust cue, and a dashboard/focus preview.
- Keep the form straightforward and accessible; visual richness belongs around it, not inside every field.
- On mobile, prioritize the form while retaining a compact atmospheric brand treatment.

### app dashboard

- Follow the dashboard composition and chart requirements above.
- The first viewport must answer: what matters today, how am I progressing, and what should I do next?
- Avoid placeholder implementation copy and identical empty metric cards.

## component patterns

- **Bento modules:** use varied spans and emphasis to establish hierarchy; reserve the strongest treatment for the most important insight or action.
- **Metric cards:** pair a prominent value with trend, comparison, mini-chart, or progress indicator.
- **Task rows:** show completion, title, priority, labels, due context, and a clear interaction target without excessive borders.
- **Charts:** use transparent backgrounds, subtle grid lines, custom tooltips, and accessible color differentiation.
- **Buttons:** primary uses the signature gradient and subtle glow; secondary uses a layered surface and border; destructive actions remain clearly distinct.
- **Inputs:** use elevated dark surfaces, descriptive labels, clear focus rings, validation, and saving/error states.
- **Badges:** use tinted semantic backgrounds with compact, high-contrast labels.
- **Empty states:** include a relevant visual treatment, concise explanation, and one clear action.
- **Dialogs/drawers:** use raised surfaces and strong hierarchy; prefer drawers for mobile editing workflows.

## motion and interaction

- Use `150-240ms` transitions for hover, focus, selection, and expansion.
- Allow restrained entrance animation for hero content, dashboard modules, and chart loading.
- Hover states may lift or brighten important modules by a few pixels.
- Do not animate continuously except for subtle focus/timer states.
- All motion must degrade gracefully under `prefers-reduced-motion`.

## navigation information architecture

- Dashboard
- Today
- Calendar
- Roadmap
- Pomodoro
- Workspace settings

## responsive behavior

- Design explicitly for `1440px`, `1024px`, `768px`, and `390px` reference widths.
- Dashboard bento grids must recompose cleanly; critical content comes before secondary analytics.
- Charts must remain readable and may simplify labels on mobile.
- Text, controls, dialogs, and navigation must never overflow horizontally.
- Touch targets must be at least `44px` where practical.

## accessibility

- Todo creation, editing, completion, navigation, charts, and dialogs must be keyboard-accessible.
- Focus states must remain visible over gradients and glass surfaces.
- Text contrast must remain sufficient over every atmospheric background.
- Charts require accessible summaries or labels for their key insight.
- Buttons and icon controls require accessible names.
- Do not communicate state with color alone.

## implementation rules

- Use shared design tokens and primitives; do not hardcode a new visual language per page.
- Use Lucide, Tabler, or Phosphor line icons consistently.
- Use ApexCharts for dashboard data visualization unless a task documents a justified alternative.
- Decorative blur must never reduce readability.
- Avoid card-in-card layouts unless the inner element is an interactive list item or meaningful data visualization.
- Repeated items need stable dimensions and responsive behavior.
- Every UI task must include visual verification at desktop and mobile widths.
- Reviewers must assess both functional acceptance criteria and the non-generic quality bar in this document.
