import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Clock3,
  Focus,
  Layers3,
  Play,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Target,
    title: "See the day clearly",
    copy: "Turn priorities, deadlines, and progress into one calm view that makes the next move obvious.",
  },
  {
    icon: Focus,
    title: "Protect focused time",
    copy: "Move from planning into deliberate focus blocks while keeping momentum visible.",
  },
  {
    icon: BarChart3,
    title: "Build a repeatable rhythm",
    copy: "Use useful trends and weekly signals to improve how you plan, execute, and review.",
  },
];

export default function PublicHomePage() {
  return (
    <main className="overflow-hidden">
      <nav className="mx-auto flex min-h-18 w-full max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <span className="grid size-8 place-items-center rounded-md bg-linear-to-br from-accent to-accent-secondary">
            <Sparkles className="size-4" />
          </span>
          g-focus
        </Link>
        <div className="ml-auto hidden items-center gap-7 text-sm text-muted md:flex">
          <a href="#platform" className="hover:text-foreground">
            Platform
          </a>
          <a href="#workflow" className="hover:text-foreground">
            Workflow
          </a>
          <a href="#results" className="hover:text-foreground">
            Results
          </a>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link href="/app">Open workspace</Link>
        </Button>
      </nav>

      <section className="relative mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:py-24">
        <div className="absolute left-1/3 top-1/4 -z-10 size-[34rem] rounded-full bg-accent/10 blur-[120px]" />
        <div className="max-w-2xl">
          <Badge variant="blue">
            <Zap className="size-3" /> Make focus your default
          </Badge>
          <h1 className="mt-7 text-5xl font-bold leading-[1.02] tracking-[-0.055em] sm:text-6xl xl:text-7xl">
            Your day, organized around{" "}
            <span className="bg-linear-to-r from-blue-300 via-violet-300 to-cyan bg-clip-text text-transparent">
              meaningful progress.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
            g-focus brings planning, tasks, deep work, and progress into one
            intelligent command center, so every day starts with clarity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/app">
                Start focusing <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#platform">
                <Play className="size-4" /> Explore the system
              </a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 text-xs text-muted">
            <span className="flex items-center gap-2">
              <Check className="size-3.5 text-cyan" /> Plan in minutes
            </span>
            <span className="flex items-center gap-2">
              <Check className="size-3.5 text-cyan" /> Stay in control
            </span>
            <span className="flex items-center gap-2">
              <Check className="size-3.5 text-cyan" /> Review real progress
            </span>
          </div>
        </div>

        <div className="ambient-float relative min-w-0">
          <div className="absolute -inset-8 -z-10 rounded-full bg-accent-secondary/12 blur-3xl" />
          <Card className="overflow-hidden border-border-strong bg-[#10131e]/92 p-3 shadow-[0_34px_120px_rgba(0,0,0,.5)] sm:p-5">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <span className="size-2 rounded-full bg-destructive" />
              <span className="size-2 rounded-full bg-warning" />
              <span className="size-2 rounded-full bg-success" />
              <span className="ml-auto rounded bg-white/4 px-3 py-1 text-[10px] text-muted">
                Thursday command center
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1.3fr_.7fr]">
              <div className="rounded-lg border border-border bg-linear-to-br from-accent/14 to-accent-secondary/8 p-5">
                <p className="text-[10px] uppercase tracking-[.18em] text-muted">
                  Today&apos;s momentum
                </p>
                <h2 className="mt-3 text-2xl font-bold">
                  8 tasks done.
                  <br />
                  One strong block next.
                </h2>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/7">
                  <div className="h-full w-[72%] rounded-full bg-linear-to-r from-accent to-cyan" />
                </div>
              </div>
              <div className="rounded-lg border border-border bg-white/3 p-5">
                <Clock3 className="size-5 text-cyan" />
                <p className="mt-5 text-3xl font-bold">1:40</p>
                <p className="text-xs text-muted">focused today</p>
              </div>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <MiniMetric label="Completed" value="18" tone="text-cyan" />
              <MiniMetric label="Momentum" value="86%" tone="text-blue-300" />
              <MiniMetric label="Streak" value="12d" tone="text-violet-300" />
            </div>
            <div className="mt-3 rounded-lg border border-border bg-white/3 p-4">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="font-semibold">What matters next</span>
                <span className="text-muted">4 remaining</span>
              </div>
              {[
                "Finalize launch narrative",
                "Review onboarding prototype",
                "Plan tomorrow's focus blocks",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-t border-border py-2.5 text-xs"
                >
                  <span
                    className={`size-3.5 rounded-full border ${index === 0 ? "border-cyan bg-cyan/20" : "border-border-strong"}`}
                  />
                  <span className="flex-1">{item}</span>
                  <span className="text-muted">
                    {index === 0 ? "09:30" : index === 1 ? "11:00" : "16:45"}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section id="results" className="border-y border-border bg-white/[.018]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 text-center sm:grid-cols-3 sm:px-6">
          <Stat value="32%" label="more weekly priorities completed" />
          <Stat value="6.4h" label="focused time reclaimed each week" />
          <Stat value="4.8/5" label="clarity rating from focused teams" />
        </div>
      </section>

      <section
        id="platform"
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32"
      >
        <div className="max-w-2xl">
          <Badge variant="violet">One connected system</Badge>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Less switching. More intentional momentum.
          </h2>
          <p className="mt-5 text-muted">
            Each part of g-focus reinforces the next, from a clear plan to
            protected execution and an honest review.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={
                index === 1
                  ? "md:-translate-y-5 border-border-strong bg-linear-to-br from-accent/10 to-surface"
                  : ""
              }
            >
              <span className="grid size-11 place-items-center rounded-lg bg-white/5 text-blue-200">
                <feature.icon className="size-5" />
              </span>
              <p className="mt-8 text-xl font-bold">{feature.title}</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                {feature.copy}
              </p>
              <button className="mt-7 flex items-center gap-2 text-xs font-semibold text-blue-200">
                Learn how it works <ArrowRight className="size-3.5" />
              </button>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="workflow"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:py-32"
      >
        <div>
          <Badge variant="success">A daily operating rhythm</Badge>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Move through the day with less friction.
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted">
            A simple loop keeps priorities current and attention protected
            without over-managing every hour.
          </p>
          <Button asChild variant="secondary" className="mt-7">
            <Link href="/app">
              See your dashboard <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-3">
          {[
            [
              "01",
              "Plan",
              "Choose what matters and shape a realistic day.",
              Layers3,
            ],
            [
              "02",
              "Focus",
              "Enter a deliberate work block with one clear target.",
              Focus,
            ],
            [
              "03",
              "Review",
              "See progress, learn from the week, and adjust.",
              CheckCircle2,
            ],
          ].map(([number, title, copy, Icon]) => {
            const StepIcon = Icon as typeof Layers3;
            return (
              <Card
                key={String(number)}
                className="flex items-center gap-5 p-5 sm:p-6"
              >
                <span className="font-mono text-sm text-muted-foreground">
                  {String(number)}
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent/10 text-blue-200">
                  <StepIcon className="size-5" />
                </span>
                <div>
                  <p className="font-bold">{String(title)}</p>
                  <p className="mt-1 text-sm text-muted">{String(copy)}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:pb-32">
        <div className="relative overflow-hidden rounded-xl border border-border-strong bg-linear-to-br from-accent/16 via-surface to-accent-secondary/14 px-6 py-16 text-center sm:px-12">
          <div className="absolute left-1/2 top-0 -z-10 size-96 -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl" />
          <Badge variant="blue">Ready when you are</Badge>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            Give your attention a better place to work.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted">
            Start with today&apos;s priorities and build a clearer, calmer
            rhythm from there.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/app">
              Open your command center <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function MiniMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-white/3 p-4">
      <p className="text-[10px] text-muted">{label}</p>
      <p className={`mt-2 text-xl font-bold ${tone}`}>{value}</p>
    </div>
  );
}
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-foreground sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}
