# Trigger

Code completed

# Steps

1. `reviewer` reads the assigned task and acceptance criteria.
2. Read developer handoff summary.
3. Inspect diff and relevant surrounding code.
4. Run targeted checks if needed.
5. Generate review report using `.openclaw/templates/review-report-template.md`.

If failed:
move the Trello card to `Code Inprogress`, add a label indicating code fixes are required, and return to `fullstack-developer` with blocking findings

If passed:
move the Trello card to `E2E Testing` and hand off to `e2e-tester`

## severity policy
- High severity findings block E2E.
- Medium findings can become follow-up tasks if they do not block correctness, security, data integrity, or core UX.
- Low findings should usually become follow-up tasks unless they are trivial and already in scope.
