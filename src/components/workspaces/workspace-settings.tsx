"use client";

import { useActionState } from "react";
import { Building2, MailPlus, ShieldCheck, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  createWorkspaceAction,
  inviteWorkspaceMemberAction,
  type WorkspaceActionState,
} from "@/lib/workspace-actions";
import type {
  WorkspaceContext,
  WorkspaceInviteSummary,
  WorkspaceMemberSummary,
} from "@/lib/workspaces";

const initialState: WorkspaceActionState = {};

type WorkspaceSettingsProps = {
  context: WorkspaceContext;
  members: WorkspaceMemberSummary[];
  invites: WorkspaceInviteSummary[];
};

export function WorkspaceSettings({
  context,
  members,
  invites,
}: WorkspaceSettingsProps) {
  const activeWorkspace = context.activeWorkspace;
  const [createState, createAction, createPending] = useActionState(
    createWorkspaceAction,
    initialState,
  );
  const [inviteState, inviteAction, invitePending] = useActionState(
    inviteWorkspaceMemberAction,
    initialState,
  );
  const ownerCanInvite = activeWorkspace.role === "owner";

  return (
    <section className="space-y-5 pb-24 lg:pb-0">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)]">
        <Card className="border-border-strong">
          <CardHeader>
            <Badge variant="blue">
              <Building2 className="size-3" /> Active workspace
            </Badge>
            <CardTitle>{activeWorkspace.name}</CardTitle>
            <CardDescription>
              {activeWorkspace.memberCount} member
              {activeWorkspace.memberCount === 1 ? "" : "s"} · You are{" "}
              {activeWorkspace.role === "owner" ? "an owner" : "a member"}.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {context.workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="rounded-md border border-border bg-surface-muted/50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {workspace.name}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {workspace.memberCount} member
                      {workspace.memberCount === 1 ? "" : "s"}
                    </p>
                  </div>
                  <Badge
                    variant={
                      workspace.id === activeWorkspace.id
                        ? "success"
                        : "neutral"
                    }
                  >
                    {workspace.id === activeWorkspace.id
                      ? "Active"
                      : workspace.role}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create workspace</CardTitle>
            <CardDescription>
              Add a separate space for another team, project, or planning loop.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createAction} className="space-y-3">
              <Field
                id="name"
                label="Workspace name"
                placeholder="Launch team"
                error={createState.errors?.name?.[0]}
              />
              <ActionMessage state={createState} />
              <Button type="submit" disabled={createPending}>
                {createPending ? "Creating..." : "Create workspace"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,.8fr)]">
        <Card>
          <CardHeader>
            <Badge variant="violet">
              <UsersRound className="size-3" /> Members
            </Badge>
            <CardTitle>Workspace access</CardTitle>
            <CardDescription>
              Members listed here can access this active workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-accent/15 text-sm font-bold text-blue-200">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {member.name}
                  </p>
                  <p className="truncate text-xs text-muted">{member.email}</p>
                </div>
                <Badge
                  variant={member.role === "owner" ? "success" : "neutral"}
                >
                  {member.role}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge variant="blue">
              <MailPlus className="size-3" /> Invites
            </Badge>
            <CardTitle>Add an existing user</CardTitle>
            <CardDescription>
              Invites add existing accounts immediately as members.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ownerCanInvite ? (
              <form action={inviteAction} className="space-y-3">
                <input
                  type="hidden"
                  name="workspaceId"
                  value={activeWorkspace.id}
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="teammate@example.com"
                  error={inviteState.errors?.email?.[0]}
                />
                <ActionMessage state={inviteState} />
                <Button type="submit" disabled={invitePending}>
                  {invitePending ? "Adding..." : "Add member"}
                </Button>
              </form>
            ) : (
              <div className="rounded-md border border-border bg-surface-muted/50 p-4 text-sm text-muted">
                Only workspace owners can invite members.
              </div>
            )}

            {invites.length > 0 ? (
              <div className="mt-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-muted-foreground">
                  Recent invites
                </p>
                {invites.map((invite) => (
                  <div
                    key={invite.id}
                    className="flex items-center gap-3 rounded-md border border-border bg-surface-muted/40 p-3"
                  >
                    <ShieldCheck className="size-4 text-cyan" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {invite.email}
                      </p>
                      <p className="text-xs text-muted">{invite.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  ...inputProps
}: {
  id: string;
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${id}-error`;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        required
        {...inputProps}
      />
      {error ? (
        <p id={errorId} className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ActionMessage({ state }: { state: WorkspaceActionState }) {
  if (!state.message) {
    return null;
  }

  return (
    <p
      className={
        state.status === "success"
          ? "rounded-md border border-success/30 bg-success/10 px-3 py-2 text-sm text-emerald-200"
          : "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-200"
      }
      role="status"
    >
      {state.message}
    </p>
  );
}
