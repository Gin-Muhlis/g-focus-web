import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-950">Sign in</h1>
        <p className="text-sm leading-6 text-slate-600">
          Authentication is reserved for FEAT-004. This route is ready for the
          upcoming session flow.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
      >
        Back home
      </Link>
    </section>
  );
}
