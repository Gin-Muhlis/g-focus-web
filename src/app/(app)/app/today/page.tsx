import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TodoBoard } from "@/components/todos/todo-board";
import { getCurrentUser } from "@/lib/auth";
import { getWorkspaceTodos } from "@/lib/todos";
import { getUserWorkspaceContext } from "@/lib/workspaces";

export const metadata: Metadata = { title: "Today" };

export default async function TodayPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const context = await getUserWorkspaceContext(user.id);

  if (!context) {
    redirect("/sign-in");
  }

  const todos = await getWorkspaceTodos(user.id, context.activeWorkspace.id);

  if (!todos) {
    redirect("/app");
  }

  return <TodoBoard activeWorkspace={context.activeWorkspace} todos={todos} />;
}
