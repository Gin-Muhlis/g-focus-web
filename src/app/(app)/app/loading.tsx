import { Card } from "@/components/ui/card";

const metricSkeletons = Array.from({ length: 4 });

export default function AppLoading() {
  return (
    <section
      className="space-y-5 pb-24 lg:pb-0"
      aria-label="Loading workspace"
      aria-busy="true"
    >
      <Card className="min-h-52 animate-pulse bg-linear-to-br from-accent/10 via-surface to-accent-secondary/8 motion-reduce:animate-none">
        <div className="h-5 w-32 rounded bg-white/8" />
        <div className="mt-6 h-10 w-full max-w-xl rounded bg-white/8" />
        <div className="mt-4 h-4 w-full max-w-lg rounded bg-white/5" />
        <div className="mt-8 h-10 w-44 rounded bg-white/8" />
      </Card>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metricSkeletons.map((_, index) => (
          <Card
            key={index}
            className="animate-pulse p-4 motion-reduce:animate-none"
          >
            <div className="h-3 w-24 rounded bg-white/7" />
            <div className="mt-5 h-7 w-28 rounded bg-white/8" />
          </Card>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <Card className="min-h-80 animate-pulse motion-reduce:animate-none">
          <div className="h-5 w-40 rounded bg-white/8" />
          <div className="mt-8 h-56 rounded-xl bg-white/5" />
        </Card>
        <Card className="min-h-80 animate-pulse motion-reduce:animate-none">
          <div className="h-5 w-32 rounded bg-white/8" />
          <div className="mx-auto mt-8 size-44 rounded-full bg-white/5" />
        </Card>
      </div>
    </section>
  );
}
