"use client";

import Link from "next/link";
import {
  useActionState,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  loginAction,
  registerAction,
  type AuthActionState,
} from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthActionState = {};
type AuthFormValues = {
  name: string;
  email: string;
  password: string;
};

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [values, setValues] = useState<AuthFormValues>({
    name: "",
    email: "",
    password: "",
  });
  const [stateVersion, setStateVersion] = useState(0);

  return (
    <AuthFormFields
      key={`${mode}-${stateVersion}`}
      mode={mode}
      values={values}
      setValues={setValues}
      resetActionState={() => setStateVersion((version) => version + 1)}
    />
  );
}

function AuthFormFields({
  mode,
  values,
  setValues,
  resetActionState,
}: {
  mode: "login" | "register";
  values: AuthFormValues;
  setValues: Dispatch<SetStateAction<AuthFormValues>>;
  resetActionState: () => void;
}) {
  const action = mode === "login" ? loginAction : registerAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  const isRegister = mode === "register";
  const hasActionFeedback = Boolean(state.message || state.errors);

  function updateField(field: keyof AuthFormValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValues((currentValues) => ({
        ...currentValues,
        [field]: event.target.value,
      }));

      if (hasActionFeedback) {
        resetActionState();
      }
    };
  }

  return (
    <form action={formAction} className="space-y-5">
      {isRegister ? (
        <Field
          id="name"
          label="Name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={updateField("name")}
          error={state.errors?.name?.[0]}
        />
      ) : null}

      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={updateField("email")}
        error={state.errors?.email?.[0]}
      />
      <Field
        id="password"
        label="Password"
        type="password"
        autoComplete={isRegister ? "new-password" : "current-password"}
        value={values.password}
        onChange={updateField("password")}
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
