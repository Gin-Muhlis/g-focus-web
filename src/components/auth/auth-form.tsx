"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  loginAction,
  registerAction,
  type AuthActionState,
} from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthActionState = {};

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const action = mode === "login" ? loginAction : registerAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  const isRegister = mode === "register";

  return (
    <form action={formAction} className="space-y-5">
      {isRegister ? (
        <Field
          id="name"
          label="Name"
          type="text"
          autoComplete="name"
          error={state.errors?.name?.[0]}
        />
      ) : null}

      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={state.errors?.email?.[0]}
      />
      <Field
        id="password"
        label="Password"
        type="password"
        autoComplete={isRegister ? "new-password" : "current-password"}
        error={state.errors?.password?.[0]}
      />

      {state.message ? (
        <p
          className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-200"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending
            ? isRegister
              ? "Creating account..."
              : "Signing in..."
            : isRegister
              ? "Create account"
              : "Sign in"}
        </Button>
        <Button asChild variant="secondary">
          <Link href={isRegister ? "/sign-in" : "/register"}>
            {isRegister ? "Sign in instead" : "Create account"}
          </Link>
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  ...inputProps
}: {
  id: string;
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${id}-error`;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        name={id}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error ? (
        <p id={errorId} className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
