import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[minmax(0,.85fr)_minmax(520px,1.15fr)]">
      <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to g-focus
          </Link>
          <span className="inline-flex size-11 items-center justify-center rounded-lg bg-linear-to-br from-accent to-accent-secondary shadow-[0_0_32px_rgba(87,157,255,.25)]">
            <Sparkles className="size-5" />
          </span>
          <h1 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
            Create your focus workspace.
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Start with a secure account and a personal workspace built around
            the next meaningful task.
          </p>
          <div className="mt-9">
            <AuthForm mode="register" />
          </div>
        </div>
      </section>
      <section className="relative hidden overflow-hidden border-l border-border bg-[#0d1019] p-12 lg:flex lg:flex-col lg:justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(87,157,255,.2),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(155,114,255,.16),transparent_38%)]" />
        <div className="relative mx-auto w-full max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            Secure by default
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight">
            Your first workspace is ready the moment you join.
          </h2>
          <div className="ambient-float mt-10 rounded-xl border border-border-strong bg-surface/90 p-6 shadow-[0_28px_100px_rgba(0,0,0,.35)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">Workspace setup</p>
                <p className="mt-2 text-2xl font-bold">
                  Account, session, and owner access in one flow.
                </p>
              </div>
              <span className="grid size-12 place-items-center rounded-full bg-cyan/12 text-cyan">
                <Target className="size-6" />
              </span>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, label: "Secure session" },
                { icon: Layers3, label: "Default workspace" },
                { icon: CheckCircle2, label: "Clear validation" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-white/4 p-4">
                  <item.icon className="size-4 text-blue-300" />
                  <p className="mt-4 text-sm font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-sm leading-6 text-muted">
            Built for a focused MVP: register, land in the app, and start with
            workspace ownership already in place.
          </p>
        </div>
      </section>
    </div>
  );
}
