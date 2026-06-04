import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Check,
  Circle,
  Clock3,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  ProductivityChart,
  PriorityChart,
} from "@/components/dashboard/dashboard-charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { roadmapItems, todayTasks } from "@/lib/dashboard-data";

export const metadata: Metadata = { title: "Dashboard" };

const metrics = [
  {
    label: "Tasks completed",
    value: "18",
    context: "+12% this week",
    icon: Check,
    color: "text-cyan",
  },
  {
    label: "Focus time",
    value: "6h 20m",
    context: "1h 10m today",
    icon: Clock3,
    color: "text-blue-300",
  },
  {
    label: "Daily momentum",
    value: "86%",
    context: "Best in 3 weeks",
    icon: TrendingUp,
    color: "text-violet-300",
  },
  {
    label: "Active streak",
    value: "12 days",
    context: "Personal best: 18",
    icon: Flame,
    color: "text-amber-300",
  },
];

export default function AppHomePage() {
  return (
    <section className="space-y-5 pb-24 lg:pb-0">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,.75fr)]">
        <Card className="relative overflow-hidden border-border-strong bg-linear-to-br from-accent/14 via-surface to-accent-secondary/10 p-6 lg:p-8">
          <div className="absolute -right-16 -top-24 size-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative max-w-2xl">
            <Badge variant="blue">
              <Sparkles className="size-3" /> Thursday, June 4
            </Badge>
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Good morning, Gin. Your day is moving.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              You have four tasks left and one important review before lunch. A
              50-minute focus block will keep the launch plan on track.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/app/pomodoro">
                  Start next focus block <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/app/today">Review today</Link>
              </Button>
            </div>
          </div>
        </Card>
        <Card className="flex flex-col justify-between bg-linear-to-br from-[#181d32] to-[#10131e]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Today&apos;s progress
              </p>
              <p className="mt-2 text-3xl font-bold">8 of 12</p>
            </div>
            <Target className="size-7 text-cyan" />
          </div>
          <div>
            <div className="mt-8 flex items-end justify-between text-sm">
              <span className="text-muted">Daily target</span>
              <span className="font-mono text-cyan">72%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/7">
              <div className="h-full w-[72%] rounded-full bg-linear-to-r from-accent via-accent-secondary to-cyan" />
            </div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              You&apos;re 14% ahead of your usual Thursday pace.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="group p-4 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted">{metric.label}</p>
              <metric.icon className={`size-4 ${metric.color}`} />
            </div>
            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-2xl font-bold tracking-tight">
                {metric.value}
              </p>
              <span className="text-[11px] text-muted-foreground">
                {metric.context}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <Card className="min-w-0 overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Productivity pulse
              </p>
              <h2 className="mt-2 text-xl font-bold">
                Completion is trending upward
              </h2>
            </div>
            <Badge variant="success">+18% vs last week</Badge>
          </div>
          <ProductivityChart />
        </Card>
        <Card className="relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Priority mix
              </p>
              <h2 className="mt-2 text-xl font-bold">12 open tasks</h2>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/app/today">View all</Link>
            </Button>
          </div>
          <PriorityChart />
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <span className="rounded-md bg-warning/8 p-2 text-amber-200">
              3 high
            </span>
            <span className="rounded-md bg-accent/8 p-2 text-blue-200">
              6 medium
            </span>
            <span className="rounded-md bg-accent-secondary/8 p-2 text-violet-200">
              3 low
            </span>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,1fr)]">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Today
              </p>
              <h2 className="mt-2 text-xl font-bold">What matters next</h2>
            </div>
            <Button asChild variant="secondary" size="sm">
              <Link href="/app/today">Plan day</Link>
            </Button>
          </div>
          <div className="mt-5 divide-y divide-border">
            {todayTasks.map((task) => (
              <div
                key={task.title}
                className="group flex items-center gap-3 py-3.5"
              >
                <Link
                  href="/app/today"
                  aria-label={`Open ${task.title} in Today`}
                  className="grid size-6 shrink-0 place-items-center rounded-full border border-border-strong text-cyan transition hover:bg-cyan/10"
                >
                  {task.done ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Circle className="size-3" />
                  )}
                </Link>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-semibold ${task.done ? "text-muted line-through" : ""}`}
                  >
                    {task.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {task.meta}
                  </p>
                </div>
                <Badge
                  variant={
                    task.priority === "High"
                      ? "warning"
                      : task.priority === "Low"
                        ? "violet"
                        : "blue"
                  }
                >
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid gap-5">
          <Card className="bg-linear-to-br from-cyan/10 via-surface to-accent/8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Focus rhythm
                </p>
                <h2 className="mt-2 text-xl font-bold">3 strong sessions</h2>
              </div>
              <span className="grid size-11 place-items-center rounded-full bg-cyan/12 text-cyan">
                <Flame className="size-5" />
              </span>
            </div>
            <div className="mt-5 flex items-end gap-2">
              <span className="text-3xl font-bold">1h 40m</span>
              <span className="pb-1 text-xs text-muted">deep work today</span>
            </div>
            <Button asChild variant="secondary" className="mt-5 w-full">
              <Link href="/app/pomodoro">Open focus room</Link>
            </Button>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Roadmap
                </p>
                <h2 className="mt-2 text-xl font-bold">Coming up</h2>
              </div>
              <CalendarClock className="size-5 text-accent" />
            </div>
            <div className="mt-5 space-y-4">
              {roadmapItems.map((item) => (
                <div key={item.title}>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold">{item.title}</span>
                    <span className="font-mono text-muted">{item.date}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/7">
                    <div
                      className={`h-full rounded-full ${item.tone}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
