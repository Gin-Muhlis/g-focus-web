"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarDays,
  CheckSquare2,
  ChevronDown,
  CircleUserRound,
  Command,
  Focus,
  LayoutDashboard,
  Map,
  Menu,
  Plus,
  Search,
  Settings2,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/auth-actions";
import { switchWorkspaceAction } from "@/lib/workspace-actions";
import type { WorkspaceContext } from "@/lib/workspaces";

const navGroups = [
  {
    label: "Plan",
    items: [
      { href: "/app", label: "Dashboard", icon: LayoutDashboard },
      { href: "/app/today", label: "Today", icon: CheckSquare2 },
      { href: "/app/calendar", label: "Calendar", icon: CalendarDays },
      { href: "/app/roadmap", label: "Roadmap", icon: Map },
    ],
  },
  {
    label: "Focus",
    items: [{ href: "/app/pomodoro", label: "Pomodoro", icon: Focus }],
  },
];

const routeLabels = [
  { href: "/app/today", label: "Today" },
  { href: "/app/calendar", label: "Calendar" },
  { href: "/app/roadmap", label: "Roadmap" },
  { href: "/app/pomodoro", label: "Pomodoro" },
  { href: "/app/settings", label: "Settings" },
];

export function AppShell({
  children,
  user,
  workspaceContext,
}: {
  children: React.ReactNode;
  user: { name: string; email: string };
  workspaceContext: WorkspaceContext;
}) {
  const pathname = usePathname();
  const activeWorkspace = workspaceContext.activeWorkspace;
  const routeLabel =
    routeLabels.find((route) => pathname.startsWith(route.href))?.label ??
    "Dashboard";
  const mobileNavItems = navGroups.flatMap((group) => group.items);

  return (
    <div className="min-h-svh bg-background text-foreground lg:grid lg:grid-cols-[264px_minmax(0,1fr)]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col border-r border-border bg-[#0a0c14]/88 p-4 backdrop-blur-xl lg:flex">
        <Link href="/app" className="flex items-center gap-3 px-2 py-3">
          <span className="grid size-9 place-items-center rounded-md bg-linear-to-br from-accent to-accent-secondary shadow-[0_0_24px_rgba(87,157,255,.24)]">
            <Sparkles className="size-4" />
          </span>
          <span className="font-semibold tracking-tight">g-focus</span>
        </Link>

        <form
          action={switchWorkspaceAction}
          className="mt-5 rounded-lg border border-border bg-surface px-3 py-3 transition hover:border-border-strong"
        >
          <label className="sr-only" htmlFor="workspaceId">
            Active workspace
          </label>
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-md bg-accent/15 text-sm font-bold text-blue-200">
              {activeWorkspace.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <select
                id="workspaceId"
                name="workspaceId"
                defaultValue={activeWorkspace.id}
                className="w-full appearance-none bg-transparent text-sm font-semibold text-foreground outline-none"
                onChange={(event) => event.currentTarget.form?.requestSubmit()}
              >
                {workspaceContext.workspaces.map((workspace) => (
                  <option key={workspace.id} value={workspace.id}>
                    {workspace.name}
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-xs text-muted-foreground">
                {activeWorkspace.role} · {activeWorkspace.memberCount} member
                {activeWorkspace.memberCount === 1 ? "" : "s"}
              </span>
            </span>
            <ChevronDown className="size-4 text-muted" />
          </div>
        </form>

        <Button className="mt-4 w-full justify-start">
          <Plus className="size-4" /> Quick add
        </Button>
        <nav className="mt-7 flex-1 space-y-7" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active =
                    item.href === "/app"
                      ? pathname === "/app"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "relative flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-foreground",
                        active &&
                          "bg-accent/12 text-foreground before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-accent",
                      )}
                    >
                      <item.icon className="size-[18px]" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mb-3 rounded-lg border border-border bg-linear-to-br from-accent/12 to-accent-secondary/8 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">Daily goal</span>
            <span className="font-mono text-cyan">72%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
            <div className="h-full w-[72%] rounded-full bg-linear-to-r from-accent to-cyan" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            3 tasks left to close the day.
          </p>
        </div>
        <div className="flex items-center gap-3 border-t border-border px-2 pt-4">
          <CircleUserRound className="size-8 text-muted" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">
              {user.name}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </span>
          <Link
            href="/app/settings"
            aria-label="Workspace settings"
            className="rounded-md p-2 text-muted transition hover:bg-white/5 hover:text-foreground"
          >
            <Settings2 className="size-4" />
          </Link>
        </div>
      </aside>

      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 flex min-h-16 items-center gap-3 border-b border-border bg-background/75 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="inset-y-0 left-0 top-0 flex h-svh w-[min(22rem,calc(100%-2rem))] max-w-none translate-x-0 translate-y-0 flex-col rounded-none rounded-r-xl p-4">
              <DialogHeader className="flex-row items-start justify-between gap-4 px-2 py-2 text-left">
                <div>
                  <DialogTitle className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-md bg-linear-to-br from-accent to-accent-secondary">
                      <Sparkles className="size-4" />
                    </span>
                    g-focus
                  </DialogTitle>
                  <DialogDescription className="mt-2">
                    {activeWorkspace.name} · {activeWorkspace.role}
                  </DialogDescription>
                </div>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close navigation"
                  >
                    <X className="size-5" />
                  </Button>
                </DialogClose>
              </DialogHeader>
              <DialogClose asChild>
                <Button asChild className="mt-3 w-full justify-start">
                  <Link href="/app/today">
                    <Plus className="size-4" /> Quick add
                  </Link>
                </Button>
              </DialogClose>
              <nav className="mt-6 flex-1 space-y-6" aria-label="Mobile menu">
                {navGroups.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {group.label}
                    </p>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const active =
                          item.href === "/app"
                            ? pathname === "/app"
                            : pathname.startsWith(item.href);
                        return (
                          <DialogClose asChild key={item.label}>
                            <Link
                              href={item.href}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-foreground",
                                active && "bg-accent/12 text-foreground",
                              )}
                            >
                              <item.icon className="size-[18px]" />
                              {item.label}
                            </Link>
                          </DialogClose>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
              <DialogClose asChild>
                <Link
                  href="/app/settings"
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-md border-t border-border px-3 pt-4 text-sm font-medium text-muted",
                    pathname.startsWith("/app/settings") && "text-foreground",
                  )}
                >
                  <Settings2 className="size-[18px]" /> Workspace settings
                </Link>
              </DialogClose>
            </DialogContent>
          </Dialog>
          <div className="hidden text-sm text-muted sm:block">
            <span className="text-muted-foreground">
              {activeWorkspace.name}
            </span>
            <span className="mx-2">/</span>
            <span className="font-semibold text-foreground">{routeLabel}</span>
          </div>
          <button className="ml-auto hidden min-h-10 w-full max-w-xs items-center gap-2 rounded-md border border-border bg-surface-muted/70 px-3 text-sm text-muted transition hover:border-border-strong md:flex">
            <Search className="size-4" /> Search anything{" "}
            <kbd className="ml-auto flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px]">
              <Command className="size-3" />K
            </kbd>
          </button>
          <Button asChild size="sm">
            <Link href="/app/today">
              <Plus className="size-4" />{" "}
              <span className="hidden sm:inline">New task</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="size-5" />
          </Button>
          <form action={logoutAction}>
            <Button size="sm" type="submit" variant="ghost">
              Log out
            </Button>
          </form>
        </header>
        <main className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          {children}
        </main>
        <nav
          className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-xl border border-border bg-[#111522]/92 p-2 shadow-2xl backdrop-blur-xl lg:hidden"
          aria-label="Mobile navigation"
        >
          {mobileNavItems.map((item) => {
            const active =
              item.href === "/app"
                ? pathname === "/app"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-w-12 flex-col items-center gap-1 rounded-md px-1 py-1.5 text-[10px] text-muted transition",
                  active && "bg-accent/12 text-foreground",
                )}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
