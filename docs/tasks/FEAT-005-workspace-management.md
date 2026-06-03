# Task

## id
`FEAT-005`

## title
Build workspace selection, creation, membership, and invites.

## owner
`fullstack-developer`

## status
`Backlog`

## context
All user-owned data in the MVP is scoped by workspace. Users need to create and switch workspaces, view members, and invite existing users by email without sending real emails.

## scope
- In scope:
  - Implement active workspace selection.
  - Implement workspace creation.
  - Show workspace members and owner/member roles.
  - Invite existing users by email as members.
  - Enforce workspace membership checks on workspace actions.
- Out of scope:
  - Real email delivery.
  - Invite links for non-existing users.
  - Advanced roles beyond `owner` and `member`.
  - Team billing.

## acceptance criteria
- [ ] Users can create additional workspaces.
- [ ] Users can switch between workspaces they belong to.
- [ ] Workspace-owned data is scoped to the active workspace.
- [ ] Owners can invite an existing user by email as a member.
- [ ] Non-members cannot access or mutate workspace data.

## implementation notes
- Follow the membership model from `docs/architecture.md`.
- The invite UX should clearly report when an email does not belong to an existing user.
- Store active workspace selection in a predictable server-safe way.

## verification
- [ ] lint
- [ ] typecheck
- [ ] tests
- [ ] build
- [ ] E2E/TestSprite

## handoff
- Developer summary:
- Reviewer result:
- E2E result:
