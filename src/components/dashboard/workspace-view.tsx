import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type WorkspaceViewProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: { title: string; detail: string; meta: string }[];
};

export function WorkspaceView({
  eyebrow,
  title,
  description,
  items,
}: WorkspaceViewProps) {
  return (
    <section className="space-y-5 pb-24 lg:pb-0">
      <Card className="relative overflow-hidden border-border-strong bg-linear-to-br from-accent/14 via-surface to-accent-secondary/10 p-6 lg:p-8">
        <div className="absolute -right-20 -top-28 size-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <Badge variant="blue">
            <Sparkles className="size-3" /> {eyebrow}
          </Badge>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
          <Button className="mt-6">
            Add to your plan <ArrowRight className="size-4" />
          </Button>
        </div>
      </Card>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,.7fr)]">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-muted-foreground">
                Current view
              </p>
              <h2 className="mt-2 text-xl font-bold">Your working set</h2>
            </div>
            <CalendarDays className="size-5 text-accent" />
          </div>
          <div className="mt-5 divide-y divide-border">
            {items.map((item, index) => (
              <div key={item.title} className="flex items-center gap-3 py-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/5 text-cyan">
                  {index === 0 ? (
                    <CheckCircle2 className="size-4" />
                  ) : (
                    <Clock3 className="size-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-muted">{item.detail}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {item.meta}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="bg-linear-to-br from-cyan/10 via-surface to-accent/8">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-muted-foreground">
            Stay intentional
          </p>
          <p className="mt-4 text-2xl font-bold">
            Make space for the work that changes the week.
          </p>
          <p className="mt-4 text-sm leading-6 text-muted">
            Keep this view useful by choosing fewer priorities and giving each
            one a clear next action.
          </p>
          <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/7">
            <div className="h-full w-[68%] rounded-full bg-linear-to-r from-accent to-cyan" />
          </div>
          <p className="mt-3 text-xs text-muted">
            68% of this view is on track
          </p>
        </Card>
      </div>
    </section>
  );
}
