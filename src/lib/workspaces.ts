import "server-only";

import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export const ACTIVE_WORKSPACE_COOKIE_NAME = "g_focus_workspace";

export type WorkspaceSummary = {
  id: string;
  name: string;
  role: "owner" | "member";
  memberCount: number;
};

export type WorkspaceMemberSummary = {
  id: string;
  name: string;
  email: string;
  role: "owner" | "member";
  joinedAt: Date;
};

export type WorkspaceInviteSummary = {
  id: string;
  email: string;
  status: string;
  role: "owner" | "member";
  createdAt: Date;
};

export type WorkspaceContext = {
  activeWorkspace: WorkspaceSummary;
  workspaces: WorkspaceSummary[];
};

export async function setActiveWorkspaceCookie(workspaceId: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_WORKSPACE_COOKIE_NAME, workspaceId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function getUserWorkspaceContext(
  userId: string,
): Promise<WorkspaceContext | null> {
  const memberships = await prisma.workspaceMember.findMany({
    where: { userId },
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
    include: {
      workspace: {
        include: {
          _count: {
            select: { members: true },
          },
        },
      },
    },
  });

  if (memberships.length === 0) {
    return null;
  }

  const workspaces = memberships.map((membership) => ({
    id: membership.workspace.id,
    name: membership.workspace.name,
    role: membership.role,
    memberCount: membership.workspace._count.members,
  }));

  const cookieStore = await cookies();
  const requestedWorkspaceId = cookieStore.get(
    ACTIVE_WORKSPACE_COOKIE_NAME,
  )?.value;
  const activeWorkspace =
    workspaces.find((workspace) => workspace.id === requestedWorkspaceId) ??
    workspaces[0];

  return { activeWorkspace, workspaces };
}

export async function requireWorkspaceMembership(
  userId: string,
  workspaceId: string,
) {
  return prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
    include: {
      workspace: true,
    },
  });
}

export async function getWorkspaceMembers(
  userId: string,
  workspaceId: string,
): Promise<WorkspaceMemberSummary[] | null> {
  const membership = await requireWorkspaceMembership(userId, workspaceId);

  if (!membership) {
    return null;
  }

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return members.map((member) => ({
    id: member.user.id,
    name: member.user.name,
    email: member.user.email,
    role: member.role,
    joinedAt: member.createdAt,
  }));
}

export async function getWorkspaceInvites(
  userId: string,
  workspaceId: string,
): Promise<WorkspaceInviteSummary[] | null> {
  const membership = await requireWorkspaceMembership(userId, workspaceId);

  if (!membership) {
    return null;
  }

  const invites = await prisma.workspaceInvite.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return invites.map((invite) => ({
    id: invite.id,
    email: invite.email,
    status: invite.status,
    role: invite.role,
    createdAt: invite.createdAt,
  }));
}
