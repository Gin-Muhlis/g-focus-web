import "server-only";

import { prisma } from "@/lib/db";
import type { TodoSummary } from "@/lib/todo-options";
import { requireWorkspaceMembership } from "@/lib/workspaces";

export async function getWorkspaceTodos(
  userId: string,
  workspaceId: string,
): Promise<TodoSummary[] | null> {
  const membership = await requireWorkspaceMembership(userId, workspaceId);

  if (!membership) {
    return null;
  }

  const todos = await prisma.todo.findMany({
    where: { workspaceId },
    orderBy: [
      { status: "asc" },
      { dueDate: "asc" },
      { priority: "desc" },
      { updatedAt: "desc" },
    ],
    include: {
      creator: {
        select: {
          name: true,
        },
      },
      labels: {
        include: {
          label: true,
        },
        orderBy: {
          label: {
            name: "asc",
          },
        },
      },
    },
  });

  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    status: todo.status,
    priority: todo.priority,
    dueDate: todo.dueDate,
    completedAt: todo.completedAt,
    creatorName: todo.creator.name,
    labels: todo.labels.map(({ label }) => ({
      id: label.id,
      name: label.name,
      color: label.color,
    })),
  }));
}
