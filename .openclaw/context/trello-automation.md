# Trello Automation

## board
- Name: `g-focus AI Team`
- URL: `https://trello.com/b/cJc964Qc/g-focus-ai-team`

## lists
- `Backlog`: `6a1fa65160327f7ee8c1aca4`
- `Code Inprogress`: `6a1fa65160327f7ee8c1aca5`
- `Code Review`: `6a1fa6a404f417872081ad70`
- `E2E Testing`: `6a1fa6aac0004a17c422ce4f`
- `Fix Required`: `6a1fa6bb5cc01a166cdab174`
- `PR Ready`: `6a1fa6c1e7bca8b02b2db141`
- `Done`: `6a1fa6cd13f7480a20b477f6`

## card lifecycle
1. `project-manager` creates task card in `Backlog` automatically after task breakdown.
2. When a task is approved and assigned, card moves to `Code Inprogress`.
3. `fullstack-developer` commits completed implementation and moves card to `Code Review`.
4. `reviewer` reviews the code.
5. If blocking fixes are required:
   - card moves to `Code Inprogress`
   - add label: `fix-required`
   - add review notes as a card comment or checklist
6. If review passes:
   - remove `fix-required` label if present
   - card moves to `E2E Testing`
7. `e2e-tester` runs TestSprite/E2E.
8. If E2E fails:
   - card moves to `Fix Required`
   - add failure notes and reproduction steps
9. If E2E passes:
   - card moves to `PR Ready`
   - add E2E result summary
10. After E2E passes:
   - agent creates the PR automatically
   - agent sends the PR link/status to the coordinator
11. After merge:
   - card moves to `Done`

## proposed labels
- `fix-required`
- `follow-up`
- `blocked`
- `high-priority`
- `medium-follow-up`
- `auth`
- `workspace`
- `todo`
- `calendar`
- `roadmap`
- `pomodoro`
- `dashboard`
- `ui`
- `backend`
- `e2e`

## card fields
Each task card should include:
- task id
- title
- context
- acceptance criteria
- implementation notes
- verification checklist
- linked branch or PR
- review report summary
- E2E/TestSprite result

## approved automation decisions
- Task cards are created automatically by `project-manager` after task breakdown.
- Medium review findings are written as card comments first, not automatic follow-up cards.
- PR creation is automatic from the feature branch to `main` after E2E passes, and the agent sends the PR link/status to the coordinator.
- Review fix label: `fix-required`.
- Workspace invite MVP uses existing-user lookup by email without sending real email.
- Project-manager may create Trello cards immediately after final requirement breakdown without per-card approval.
- Card execution starts automatically when a coordinator moves a card into `Code Inprogress`.
- For the initial automation, detect `Code Inprogress` cards by polling Trello every 5 minutes.
- Use cron polling first. Trello webhooks can replace polling later if real-time execution becomes necessary.
- Polling state must be stored outside the repository by default to avoid dirtying the worktree on every run.

## recommended trello mcp
Recommended server: `delorenj/mcp-server-trello`.

Reasons:
- Mature Trello MCP option with broad card/list/board/comment support.
- Handles Trello API rate limiting.
- Supports dynamic board selection.
- TypeScript implementation with validation and error handling.
- Can be launched with `bunx @delorenj/mcp-server-trello`; this VPS currently uses a local npm install and wrapper instead.

Alternatives reviewed:
- `kocakli/Trello-Desktop-MCP`: useful and simple Node-based option with 19 tools, but less mature for this team's automation needs.
- `adriangrahldev/advanced-trello-mcp-server`: broader tool surface, but lower adoption and no published releases at time of review.

Required credentials:
- `TRELLO_API_KEY`
- `TRELLO_TOKEN`
- `TRELLO_BOARD_ID`

Optional:
- `TRELLO_WORKSPACE_ID`

Security:
- Store credentials in local MCP configuration or `.env.local`.
- Do not commit Trello credentials.
- Use a Trello token with the minimum practical access needed for this board.

## local setup
- Secret env file: `/home/ubuntu/.openclaw/secrets/g-focus-trello.env`
- MCP package install: `/home/ubuntu/.openclaw/mcp/trello/node_modules/@delorenj/mcp-server-trello`
- MCP wrapper: `/home/ubuntu/.openclaw/mcp/trello/run-trello-mcp.sh`
- MCP config example: `/home/ubuntu/.openclaw/mcp/trello/mcp-config.example.json`
- Registered OpenClaw MCP server name: `trello`
- Runtime polling state: `/home/ubuntu/.openclaw/state/g-focus-web/trello-processed.json`
- State template committed in repo: `.openclaw/state/trello-processed.example.json`

The wrapper sources the secret env file and runs the locally installed `mcp-server-trello` binary, so MCP client config does not need to contain the Trello token directly.

Registered with:

```bash
openclaw mcp set trello '{"command":"/home/ubuntu/.openclaw/mcp/trello/run-trello-mcp.sh","args":[]}'
```

After registration, restart or refresh the agent session/runtime so the MCP server is exposed as a dynamic tool.

## polling watcher
Cron job name: `g-focus-web trello code-inprogress watcher`.

Schedule:

```cron
*/5 * * * *
```

Watcher behavior:
1. Load `/home/ubuntu/.openclaw/state/g-focus-web/trello-processed.json`, creating it from the template shape when missing.
2. Read cards in Trello list `Code Inprogress`.
3. Skip cards that already have an entry in `processedCards`.
4. For each unprocessed card, record the card ID with timestamp and list name before starting work.
5. Start a `fullstack-developer` agent turn for that card.
6. The developer must read the Trello card, repository context, and task docs before editing.
7. After implementation and commit, move the card to `Code Review` and update the card comment with the handoff summary.

State file shape:

```json
{
  "processedCards": {
    "trello-card-id": {
      "name": "Card title",
      "list": "Code Inprogress",
      "startedAt": "2026-06-03T00:00:00.000Z",
      "status": "started"
    }
  },
  "updatedAt": "2026-06-03T00:00:00.000Z"
}
```
