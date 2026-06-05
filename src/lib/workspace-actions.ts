"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  getUserWorkspaceContext,
  requireWorkspaceMembership,
  setActiveWorkspaceCookie,
} from "@/lib/workspaces";

export type WorkspaceActionState = {
  message?: string;
  status?: "success" | "error";
  errors?: Record<string, string[] | undefined>;
};

const workspaceNameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Workspace name must be at least 2 characters.")
    .max(80, "Workspace name must be no more than 80 characters."),
});

const switchWorkspaceSchema = z.object({
  workspaceId: z.string().min(1),
});

const inviteSchema = z.object({
  workspaceId: z.string().min(1),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .transform((email) => email.toLowerCase()),
});

function validationState(error: z.ZodError): WorkspaceActionState {
  return {
    status: "error",
    message: "Check the highlighted fields and try again.",
    errors: error.flatten().fieldErrors,
  };
}

async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return user;
}

export async function createWorkspaceAction(
  _previousState: WorkspaceActionState,
  formData: FormData,
): Promise<WorkspaceActionState> {
  const user = await requireUser();

  if (!user) {
    return { status: "error", message: "Sign in to create a workspace." };
  }

  const result = workspaceNameSchema.safeParse({
    name: formData.get("name"),
  });

  if (!result.success) {
    return validationState(result.error);
  }

  const workspace = await prisma.workspace.create({
    data: {
      name: result.data.name,
      ownerId: user.id,
      members: {
        create: {
          userId: user.id,
          role: "owner",
        },
      },
    },
    select: { id: true, name: true },
  });

  await setActiveWorkspaceCookie(workspace.id);
  revalidatePath("/app");

  return {
    status: "success",
    message: `${workspace.name} is now your active workspace.`,
  };
}

export async function switchWorkspaceAction(formData: FormData) {
  const user = await requireUser();

  if (!user) {
    return;
  }

  const result = switchWorkspaceSchema.safeParse({
    workspaceId: formData.get("workspaceId"),
  });

  if (!result.success) {
    return;
  }

  const membership = await requireWorkspaceMembership(
    user.id,
    result.data.workspaceId,
  );

  if (!membership) {
    return;
  }

  await setActiveWorkspaceCookie(result.data.workspaceId);
  revalidatePath("/app");
}

export async function inviteWorkspaceMemberAction(
  _previousState: WorkspaceActionState,
  formData: FormData,
): Promise<WorkspaceActionState> {
  const user = await requireUser();

  if (!user) {
    return { status: "error", message: "Sign in to invite a member." };
  }

  const result = inviteSchema.safeParse({
    workspaceId: formData.get("workspaceId"),
    email: formData.get("email"),
  });

  if (!result.success) {
    return validationState(result.error);
  }

  const membership = await requireWorkspaceMembership(
    user.id,
    result.data.workspaceId,
  );

  if (!membership) {
    return {
      status: "error",
      message: "You do not have access to this workspace.",
    };
  }

  if (membership.role !== "owner") {
    return {
      status: "error",
      message: "Only workspace owners can invite members.",
    };
  }

  const invitedUser = await prisma.user.findUnique({
    where: { email: result.data.email },
    select: { id: true, email: true, name: true },
  });

  if (!invitedUser) {
    return {
      status: "error",
      message: "No existing user was found for that email address.",
      errors: {
        email: ["Ask them to create an account before inviting them."],
      },
    };
  }

  if (invitedUser.id === user.id) {
    return {
      status: "error",
      message: "You are already the owner of this workspace.",
    };
  }

  const existingMember = await requireWorkspaceMembership(
    invitedUser.id,
    result.data.workspaceId,
  );

  if (existingMember) {
    return {
      status: "error",
      message: `${invitedUser.name} is already a workspace member.`,
    };
  }

  await prisma.$transaction(async (transaction) => {
    await transaction.workspaceInvite.create({
      data: {
        workspaceId: result.data.workspaceId,
        email: invitedUser.email,
        role: "member",
        status: "accepted",
        invitedById: user.id,
      },
    });

    await transaction.workspaceMember.create({
      data: {
        workspaceId: result.data.workspaceId,
        userId: invitedUser.id,
        role: "member",
      },
    });
  });

  revalidatePath("/app");

  return {
    status: "success",
    message: `${invitedUser.name} was added as a workspace member.`,
  };
}

export async function getActiveWorkspaceForCurrentUser() {
  const user = await requireUser();

  if (!user) {
    return null;
  }

  return getUserWorkspaceContext(user.id);
}
