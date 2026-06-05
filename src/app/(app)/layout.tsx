import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUser } from "@/lib/auth";
import { getUserWorkspaceContext } from "@/lib/workspaces";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const workspaceContext = await getUserWorkspaceContext(user.id);

  if (!workspaceContext) {
    redirect("/sign-in");
  }

  return (
    <AppShell user={user} workspaceContext={workspaceContext}>
      {children}
    </AppShell>
  );
}
