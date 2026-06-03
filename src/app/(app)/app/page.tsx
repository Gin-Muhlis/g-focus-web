import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App",
};

export default function AppHomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold text-slate-950">Today</h1>
      <p className="max-w-2xl text-sm leading-6 text-slate-600">
        The authenticated app shell is ready for todo, planning, dashboard,
        roadmap, and focus features in the next tasks.
      </p>
    </section>
  );
}
