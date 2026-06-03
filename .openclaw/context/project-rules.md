# Project Rules

## collaboration
- Start with discovery and shared understanding before implementation.
- Keep requirements, architecture, design, and tasks documented.
- Treat `.openclaw` files as the source of team workflow.
- Use Trello for execution tracking once board access is available.
- Use the existing Trello lists: `Backlog`, `Code Inprogress`, `Code Review`, `E2E Testing`, `Fix Required`, `PR Ready`, `Done`.
- Treat `.openclaw/agents/project-manager.md`, `.openclaw/agents/fullstack-developer.md`, `.openclaw/agents/reviewer.md`, and `.openclaw/agents/e2e-tester.md` as the canonical agent definitions.
- Detect cards moved to `Code Inprogress` through the configured 5-minute Trello polling watcher.

## scope control
- Do not implement features before they have an approved task and acceptance criteria.
- Prefer a focused MVP before expanding into advanced productivity features.
- Record non-goals to prevent hidden scope growth.

## safety
- Never commit secrets or private credentials.
- Use environment variables for sensitive configuration.
- Trello card creation and automated card movement are approved for the `g-focus AI Team` board workflow documented in `.openclaw/context/trello-automation.md`.

## quality bar
- Application code should be typed, validated, and tested according to risk.
- User-facing flows need loading, empty, success, and error states.
- Todo data changes must be validated server-side.
- Merge readiness requires review approval and E2E/TestSprite pass.
- High severity review findings must be fixed before E2E.
- Medium severity findings may become follow-up tasks when they do not block correctness, security, data integrity, or core UX.

## documentation
- Product decisions belong in `docs/product-requirement.md`.
- System decisions belong in `docs/architecture.md`.
- UI decisions belong in `docs/design-system.md`.
- Execution tasks belong in `docs/tasks/*.md` and Trello.
