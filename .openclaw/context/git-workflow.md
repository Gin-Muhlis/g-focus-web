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
9. `e2e-tester` runs Playwright/local E2E checks after review approval. TestSprite can be added after credentials and config are available.
10. If E2E passes, `e2e-tester` pushes the feature branch, creates a PR from the feature branch to `main` when GitHub tooling/credentials are configured, and then moves the card to `PR Ready`.
11. Agent sends the PR link/status to the coordinator.
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
- Poll Trello every 5 minutes for cards moved to `Code Review` and start `reviewer` automatically.
- When `reviewer` requests blocking fixes, move card to `Code Inprogress` and apply a fix-required label.
- When `reviewer` approves, move card to `E2E Testing`.
- Poll Trello every 5 minutes for cards moved to `E2E Testing` and start `e2e-tester` automatically.
- When `e2e-tester` fails a flow, move card to `Fix Required`.
- When `e2e-tester` passes, push the feature branch, create a PR to `main` when GitHub tooling/credentials are configured, then move card to `PR Ready`.
- Poll Trello every 5 minutes for cards moved to `Fix Required` and start `fullstack-developer` automatically for the focused fix.
- Poll Trello every 5 minutes for cards moved to `PR Ready` and notify the coordinator in WhatsApp with the PR URL/status.
- PR creation requires GitHub tooling/credentials such as `gh` or a GitHub token; if unavailable, push the branch when possible and report the missing PR capability.
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
- Git push and PR creation are approved for task branches in `Gin-Muhlis/g-focus-web` after review approval and E2E pass.
- Playwright/local E2E is the initial test path.
- TestSprite execution requires project configuration and credentials before it can replace or augment Playwright.
