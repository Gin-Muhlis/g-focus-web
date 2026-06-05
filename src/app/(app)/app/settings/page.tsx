import { redirect } from "next/navigation";
import { WorkspaceSettings } from "@/components/workspaces/workspace-settings";
import { getCurrentUser } from "@/lib/auth";
import {
  getUserWorkspaceContext,
  getWorkspaceInvites,
  getWorkspaceMembers,
} from "@/lib/workspaces";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const context = await getUserWorkspaceContext(user.id);

  if (!context) {
    redirect("/sign-in");
  }

  const [members, invites] = await Promise.all([
    getWorkspaceMembers(user.id, context.activeWorkspace.id),
    getWorkspaceInvites(user.id, context.activeWorkspace.id),
  ]);

  if (!members || !invites) {
    redirect("/app");
  }

  return (
    <WorkspaceSettings context={context} members={members} invites={invites} />
  );
}
