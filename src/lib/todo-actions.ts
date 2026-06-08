"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { requireWorkspaceMembership } from "@/lib/workspaces";
import { todoPriorities, todoStatuses } from "@/lib/todo-options";

export type TodoActionState = {
  message?: string;
  status?: "success" | "error";
  errors?: Record<string, string[] | undefined>;
};

const labelPalette = [
  "#579dff",
  "#9b72ff",
  "#4de2d1",
  "#34d399",
  "#f6b94a",
  "#f16d7a",
];

const baseTodoSchema = z.object({
  workspaceId: z.string().min(1),
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters.")
    .max(140, "Title must be no more than 140 characters."),
  description: z
    .string()
    .trim()
    .max(1200, "Notes must be no more than 1200 characters.")
    .optional()
    .transform((value) => (value ? value : null)),
  status: z.enum(todoStatuses),
  priority: z.enum(todoPriorities),
  dueDate: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Use a valid due date.",
    })
    .transform((value) => (value ? new Date(`${value}T00:00:00.000Z`) : null)),
  labels: z
    .string()
    .trim()
    .max(240, "Labels must be no more than 240 characters.")
    .optional()
    .transform(parseLabels),
});

const createTodoSchema = baseTodoSchema.omit({ status: true }).extend({
  status: z.enum(todoStatuses).default("todo"),
});

const updateTodoSchema = baseTodoSchema.extend({
  todoId: z.string().min(1),
});

const todoIdSchema = z.object({
  workspaceId: z.string().min(1),
  todoId: z.string().min(1),
});

function parseLabels(value?: string) {
  if (!value) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .split(",")
        .map((label) => label.trim())
        .filter(Boolean)
        .map((label) => label.slice(0, 32)),
    ),
  ).slice(0, 8);
}

function validationState(error: z.ZodError): TodoActionState {
  return {
    status: "error",
    message: "Check the highlighted fields and try again.",
    errors: error.flatten().fieldErrors,
  };
}

async function requireUserAndMembership(workspaceId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const membership = await requireWorkspaceMembership(user.id, workspaceId);

  if (!membership) {
    return null;
  }

  return { user, membership };
}

async function syncTodoLabels(
  todoId: string,
  workspaceId: string,
  labelNames: string[],
) {
  await prisma.todoLabel.deleteMany({ where: { todoId } });

  if (labelNames.length === 0) {
    return;
  }

  const labels = await Promise.all(
    labelNames.map((name, index) =>
      prisma.label.upsert({
        where: {
          workspaceId_name: {
            workspaceId,
            name,
          },
        },
        update: {},
        create: {
          workspaceId,
          name,
          color: labelPalette[index % labelPalette.length],
        },
        select: { id: true },
      }),
    ),
  );

  await prisma.todoLabel.createMany({
    data: labels.map((label) => ({ todoId, labelId: label.id })),
    skipDuplicates: true,
  });
}

export async function createTodoAction(
  _previousState: TodoActionState,
  formData: FormData,
): Promise<TodoActionState> {
  const result = createTodoSchema.safeParse({
    workspaceId: formData.get("workspaceId"),
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status") || "todo",
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate"),
    labels: formData.get("labels"),
  });

  if (!result.success) {
    return validationState(result.error);
  }

  const context = await requireUserAndMembership(result.data.workspaceId);

  if (!context) {
    return {
      status: "error",
      message: "You do not have access to this workspace.",
    };
  }

  const todo = await prisma.todo.create({
    data: {
      workspaceId: result.data.workspaceId,
      creatorId: context.user.id,
      assigneeId: context.user.id,
      title: result.data.title,
      description: result.data.description,
      status: result.data.status,
      priority: result.data.priority,
      dueDate: result.data.dueDate,
      completedAt: result.data.status === "done" ? new Date() : null,
    },
    select: { id: true },
  });

  await syncTodoLabels(todo.id, result.data.workspaceId, result.data.labels);
  revalidatePath("/app/today");
  revalidatePath("/app");

  return { status: "success", message: "Todo created." };
}

export async function updateTodoAction(
  _previousState: TodoActionState,
  formData: FormData,
): Promise<TodoActionState> {
  const result = updateTodoSchema.safeParse({
    workspaceId: formData.get("workspaceId"),
    todoId: formData.get("todoId"),
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate"),
    labels: formData.get("labels"),
  });

  if (!result.success) {
    return validationState(result.error);
  }

  const context = await requireUserAndMembership(result.data.workspaceId);

  if (!context) {
    return {
      status: "error",
      message: "You do not have access to this workspace.",
    };
  }

  const existing = await prisma.todo.findFirst({
    where: {
      id: result.data.todoId,
      workspaceId: result.data.workspaceId,
    },
    select: { id: true, completedAt: true },
  });

  if (!existing) {
    return { status: "error", message: "Todo was not found." };
  }

  await prisma.todo.update({
    where: { id: existing.id },
    data: {
      title: result.data.title,
      description: result.data.description,
      status: result.data.status,
      priority: result.data.priority,
      dueDate: result.data.dueDate,
      completedAt:
        result.data.status === "done"
          ? (existing.completedAt ?? new Date())
          : null,
    },
  });

  await syncTodoLabels(existing.id, result.data.workspaceId, result.data.labels);
  revalidatePath("/app/today");
  revalidatePath("/app");

  return { status: "success", message: "Todo updated." };
}

export async function toggleTodoCompletionAction(formData: FormData) {
  const result = todoIdSchema.safeParse({
    workspaceId: formData.get("workspaceId"),
    todoId: formData.get("todoId"),
  });

  if (!result.success) {
    return;
  }

  const context = await requireUserAndMembership(result.data.workspaceId);

  if (!context) {
    return;
  }

  const todo = await prisma.todo.findFirst({
    where: {
      id: result.data.todoId,
      workspaceId: result.data.workspaceId,
    },
    select: { id: true, status: true },
  });

  if (!todo) {
    return;
  }

  const done = todo.status === "done";

  await prisma.todo.update({
    where: { id: todo.id },
    data: {
      status: done ? "todo" : "done",
      completedAt: done ? null : new Date(),
    },
  });

  revalidatePath("/app/today");
  revalidatePath("/app");
}

export async function deleteTodoAction(formData: FormData) {
  const result = todoIdSchema.safeParse({
    workspaceId: formData.get("workspaceId"),
    todoId: formData.get("todoId"),
  });

  if (!result.success) {
    return;
  }

  const context = await requireUserAndMembership(result.data.workspaceId);

  if (!context) {
    return;
  }

  await prisma.todo.deleteMany({
    where: {
      id: result.data.todoId,
      workspaceId: result.data.workspaceId,
    },
  });

  revalidatePath("/app/today");
  revalidatePath("/app");
}
