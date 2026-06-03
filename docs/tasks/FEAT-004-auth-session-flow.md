# Task

## id
`FEAT-004`

## title
Implement custom email/password authentication and sessions.

## owner
`fullstack-developer`

## status
`Backlog`

## context
The MVP is a public multi-user app. Users need secure registration, login, logout, persisted sessions, and protected app routes before workspace-owned data can be used safely.

## scope
- In scope:
  - Implement register, login, and logout flows.
  - Hash passwords with an approved modern library.
  - Store session tokens as hashes and set secure httpOnly cookies.
  - Protect authenticated app routes.
  - Create a default workspace for each user during registration.
  - Add validation and user-facing error states.
- Out of scope:
  - Password reset.
  - OAuth/social login.
  - Email verification.
  - Billing or enterprise permissions.

## acceptance criteria
- [ ] A new user can register and receives a default workspace.
- [ ] Existing users can log in and land on the authenticated dashboard area.
- [ ] Logout invalidates the active session and clears the cookie.
- [ ] Protected routes redirect unauthenticated users.
- [ ] Duplicate email, invalid credentials, and validation errors are handled clearly.

## implementation notes
- Use Zod for input validation.
- Keep auth utilities server-only.
- Cookie settings should account for local development and production deployment.
- Do not log sensitive auth data.

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
