import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
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

  const membership = await prisma.workspaceMember.findFirst({
    where: { userId: user.id },
    orderBy: [{ role: "desc" }, { createdAt: "asc" }],
    select: {
      role: true,
      workspace: {
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              members: true,
            },
          },
        },
      },
    },
  });

  const workspace = membership
    ? {
        id: membership.workspace.id,
        name: membership.workspace.name,
        role: membership.role,
        memberCount: membership.workspace._count.members,
      }
    : null;

  return (
    <AppShell user={user} workspace={workspace}>
      {children}
    </AppShell>
  );
}
