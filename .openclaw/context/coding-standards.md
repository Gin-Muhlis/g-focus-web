# Coding Standards

## general
- Use TypeScript for application code.
- Prefer existing project patterns over new abstractions.
- Keep modules small and named by responsibility.
- Validate external/user input at server boundaries.
- Avoid unrelated refactors in feature tasks.

## next.js
- Prefer App Router conventions.
- Keep server-only logic in server-safe modules.
- Use server actions or route handlers intentionally; document the chosen pattern in architecture.
- Handle loading, empty, success, and error states.

## ui
- Build accessible controls with semantic HTML.
- Use consistent spacing, typography, and component primitives.
- Ensure mobile layouts are usable for daily task entry and review.
- Avoid decorative UI that reduces scanning speed for todo workflows.

## data
- Use migrations for schema changes.
- Store dates/times consistently and document timezone behavior.
- Keep todo ownership/auth assumptions explicit.

## tests
- Add focused tests for validation, mutations, and important UI flows.
- E2E should cover create, update, complete, delete, filtering, and persistence once those features exist.
