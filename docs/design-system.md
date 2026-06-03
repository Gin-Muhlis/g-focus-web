# Design System

## direction
Minimal productive interface with restrained glassmorphism. The app should feel focused and modern without becoming decorative or generic.

## references
- ClickUp dashboard density and roadmap clarity.
- Productivity dashboards that prioritize scanning, quick entry, and status review.

## layout
- Desktop:
  - persistent sidebar navigation
  - dashboard-first layout
  - dense but readable cards for summaries
  - calendar and roadmap views optimized for comparison
- Mobile:
  - bottom or compact navigation
  - quick todo creation
  - today/tomorrow review as the primary flow
  - cards and lists must remain readable without horizontal scrolling

## navigation
- Dashboard
- Today
- Calendar
- Roadmap
- Pomodoro
- Workspace settings

## visual style
- Neutral productive base.
- Glassmorphism used for panels, overlays, and highlight surfaces.
- Avoid heavy blur that reduces readability.
- Use clear color signals for priority and status.

## core components
- App shell
- Sidebar / mobile navigation
- Dashboard summary widgets
- Todo list
- Todo item row/card
- Quick add todo input
- Todo editor dialog/drawer
- Calendar grid/list
- Roadmap board
- Roadmap timeline
- Pomodoro timer panel
- Focus analytics widgets
- Workspace switcher
- Member invite dialog
- Auth forms

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
- Keyboard-accessible todo creation and completion.
- Visible focus states.
- Sufficient contrast over glass surfaces.
- Buttons and icon controls need accessible labels.
