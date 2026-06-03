import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/app", label: "Dashboard" },
  { href: "/app", label: "Today" },
  { href: "/app", label: "Calendar" },
  { href: "/app", label: "Roadmap" },
  { href: "/app", label: "Focus" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/app" className="text-sm font-semibold text-foreground">
            g-focus
          </Link>
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Badge variant="violet">MVP</Badge>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {children}
      </main>
    </div>
  );
}
