import Link from "next/link";

export default function PublicHomePage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center gap-10 px-6 py-16">
      <section className="max-w-2xl space-y-5">
        <p className="text-sm font-medium uppercase tracking-normal text-slate-500">
          Daily todo focus
        </p>
        <h1 className="text-4xl font-semibold text-slate-950 sm:text-5xl">
          g-focus
        </h1>
        <p className="text-lg leading-8 text-slate-600">
          A focused workspace for planning the day, tracking todos, and keeping
          progress visible.
        </p>
      </section>

      <nav aria-label="Primary routes" className="flex flex-wrap gap-3">
        <Link
          href="/sign-in"
          className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Sign in
        </Link>
        <Link
          href="/app"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
        >
          Open app
        </Link>
      </nav>
    </main>
  );
}
