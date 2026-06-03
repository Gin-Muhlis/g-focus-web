# Git Workflow

## branch model
- `main` is the protected integration branch.
- Feature work should happen on `feature/{task-id}-{short-name}`.
- Fixes should happen on `fix/{task-id}-{short-name}`.

## delivery flow
1. `project-manager` creates or approves a task.
2. `fullstack-developer` creates a branch and implements the task.
3. Developer runs local verification and commits changes.
4. After commit, the Trello card moves automatically to `Code Review`.
5. `reviewer` reviews the diff and requests fixes or approves.
6. If review has required fixes, the card moves to `Code Inprogress` with a label indicating code changes are required.
7. After fixes are committed, the card moves back to `Code Review`.
8. If review passes, `reviewer` moves the card to `E2E Testing`.
9. `e2e-tester` runs E2E/TestSprite checks after review approval.
10. If E2E passes, the card moves to `PR Ready`.
11. Agent creates a PR automatically from the feature branch to `main` after E2E pass and sends the PR link/status to the coordinator.
12. Merge request to `main` is created only after review and E2E pass.

## commit guidance
- Use concise conventional-style commits when possible:
  - `feat: add todo creation flow`
  - `fix: validate todo title`
  - `test: add todo e2e coverage`
- Keep commits related to the assigned task.

## merge readiness
- Task acceptance criteria are satisfied.
- Required checks pass: lint, typecheck, tests, build, E2E/TestSprite.
- Review report has no blocking findings.
- Medium review findings may become follow-up tasks when they do not block correctness, security, or core UX.
- E2E report has no blocking failures.

## trello lists
- `Backlog`
- `Code Inprogress`
- `Code Review`
- `E2E Testing`
- `Fix Required`
- `PR Ready`
- `Done`

Canonical list IDs are stored in `.openclaw/context/trello-automation.md`.

## trello board
- Name: `g-focus AI Team`
- URL: `https://trello.com/b/cJc964Qc/g-focus-ai-team`

## trello automation
- Poll Trello every 5 minutes for cards moved to `Code Inprogress`.
- For each unprocessed `Code Inprogress` card, start `fullstack-developer` automatically and record the card in the runtime processed-card state file.
- When `fullstack-developer` commits completed task work, move card to `Code Review`.
- When `reviewer` requests blocking fixes, move card to `Code Inprogress` and apply a fix-required label.
- When `reviewer` approves, move card to `E2E Testing`.
- When `e2e-tester` fails a flow, move card to `Fix Required`.
- When `e2e-tester` passes, move card to `PR Ready`.
- After E2E passes, create a PR automatically from the feature branch to `main` and send the PR link/status to the coordinator.
- After merge, move card to `Done`.

## mcp notes
- Trello MCP or API integration should be configured before external card writes.
- Required capabilities:
  - find board by URL/name
  - list cards by status
  - create card
  - move card
  - apply labels
  - add comments/checklists
- Trello writes are approved for the board/list lifecycle documented in `.openclaw/context/trello-automation.md`.

## external tools
- Trello automation is approved for the configured `g-focus AI Team` board and list lifecycle.
- TestSprite execution requires project configuration and credentials.
