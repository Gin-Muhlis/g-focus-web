# Developer Flow

Canonical workflow for `fullstack-developer`.

## trigger
Trello card is moved to `Code Inprogress` by the coordinator or returned there for required fixes.

## steps
1. Read assigned task and acceptance criteria.
2. Read the Trello card description, comments, labels, and linked task file when available.
3. Read `.openclaw/context/*.md`, `docs/architecture.md`, and `docs/design-system.md`.
4. Fetch and sync `main` before creating or reusing a task branch:
   - `git fetch origin --prune`
   - `git switch main`
   - `git pull --ff-only origin main`
   - verify local `main` equals `origin/main`
5. Create the task feature branch from the freshly synced `main`.
6. Inspect existing source code before editing.
7. Create a short implementation plan.
8. Implement frontend, backend, schema, validation, and tests required by the task.
9. Run lint, typecheck, tests, and build when available.
10. Commit changes after implementation is complete.
11. Write developer handoff summary as a Trello card comment.
12. Move the Trello card to `Code Review`.

## output
- Code changes.
- Test/verification summary.
- Handoff notes for `reviewer`.

## fix loop
If review returns required fixes:
1. Read review notes.
2. Fix only the requested issues unless a related defect must be addressed.
3. Commit the fix.
4. Move the Trello card back to `Code Review`.
