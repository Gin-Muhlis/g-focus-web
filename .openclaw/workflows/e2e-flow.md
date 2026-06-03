# Trigger

Review passed

# Steps

1. `e2e-tester` reads the task, acceptance criteria, and review report.
2. Define E2E scenarios.
3. Start the application locally.
4. Run TestSprite if configured.
5. Run local E2E/browser tests as fallback or preflight.
6. Test relevant desktop and mobile flows.
7. Collect results and evidence.

If failed:
create E2E failure report, move the Trello card to `Fix Required`, and return to `fullstack-developer`

If passed:
push the feature branch, create a pull request to `main` when GitHub tooling/credentials are configured, then move the Trello card to `PR Ready` and include the PR URL/status in the handoff
