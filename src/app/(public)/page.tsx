import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function PublicHomePage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center gap-10 px-4 py-12 sm:px-6 lg:py-16">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl space-y-5">
          <Badge variant="blue">Daily todo focus</Badge>
          <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            g-focus
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            A focused workspace for planning the day, tracking todos, and
            keeping progress visible.
          </p>

          <nav aria-label="Primary routes" className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/app">Open app</Link>
            </Button>
          </nav>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Card>
            <CardDescription>Today</CardDescription>
            <CardTitle className="mt-3 text-3xl">
              Plan. Execute. Review.
            </CardTitle>
          </Card>
          <Card>
            <CardDescription>Design language</CardDescription>
            <CardTitle className="mt-3 text-3xl">
              Dark editorial tech.
            </CardTitle>
          </Card>
        </div>
      </section>
    </main>
  );
}
