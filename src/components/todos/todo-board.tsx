"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  CalendarDays,
  Check,
  Circle,
  ListChecks,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  createTodoAction,
  deleteTodoAction,
  toggleTodoCompletionAction,
  updateTodoAction,
  type TodoActionState,
} from "@/lib/todo-actions";
import {
  todoPriorities,
  todoStatuses,
  type TodoPriorityValue,
  type TodoStatusValue,
  type TodoSummary,
} from "@/lib/todo-options";
import { cn } from "@/lib/utils";

const initialState: TodoActionState = {};

const statusLabels: Record<TodoStatusValue, string> = {
  todo: "Todo",
  in_progress: "In progress",
  blocked: "Blocked",
  done: "Done",
};

const priorityLabels: Record<TodoPriorityValue, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

const priorityVariants: Record<TodoPriorityValue, BadgeProps["variant"]> = {
  low: "neutral",
  medium: "blue",
  high: "warning",
  urgent: "violet",
};

type TodoBoardProps = {
  activeWorkspace: {
    id: string;
    name: string;
  };
  todos: TodoSummary[];
};

export function TodoBoard({ activeWorkspace, todos }: TodoBoardProps) {
  const openTodos = todos.filter((todo) => todo.status !== "done");
  const completedTodos = todos.filter((todo) => todo.status === "done");
  const urgentCount = todos.filter((todo) => todo.priority === "urgent").length;

  return (
    <section className="space-y-5 pb-24 lg:pb-0">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,.85fr)]">
        <Card className="border-border-strong">
          <CardHeader>
            <Badge variant="blue">
              <ListChecks className="size-3" /> {activeWorkspace.name}
            </Badge>
            <CardTitle>Today&apos;s working set</CardTitle>
            <CardDescription>
              {openTodos.length} open · {completedTodos.length} complete ·{" "}
              {urgentCount} urgent
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todos.length > 0 ? (
              <div className="space-y-3">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    workspaceId={activeWorkspace.id}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-border-strong bg-surface-muted/40 p-8 text-center">
                <ListChecks className="mx-auto size-9 text-cyan" />
                <h2 className="mt-4 text-lg font-semibold">
                  Nothing planned yet
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
                  Create the first todo for this workspace. It will stay scoped
                  to members of {activeWorkspace.name}.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <CreateTodoCard workspaceId={activeWorkspace.id} />
      </div>
    </section>
  );
}

function CreateTodoCard({ workspaceId }: { workspaceId: string }) {
  const [state, action] = useActionState(createTodoAction, initialState);

  return (
    <Card>
      <CardHeader>
        <Badge variant="violet">
          <Plus className="size-3" /> Quick entry
        </Badge>
        <CardTitle>Add a todo</CardTitle>
        <CardDescription>
          Capture the next action with priority, due date, and labels.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <Field
            id="title"
            label="Title"
            placeholder="Draft the launch update"
            error={state.errors?.title?.[0]}
          />
          <TextAreaField
            id="description"
            label="Notes"
            placeholder="Add context, constraints, or the next step."
            error={state.errors?.description?.[0]}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectField
              id="priority"
              label="Priority"
              defaultValue="medium"
              options={todoPriorities.map((priority) => ({
                value: priority,
                label: priorityLabels[priority],
              }))}
              error={state.errors?.priority?.[0]}
            />
            <Field
              id="dueDate"
              label="Due date"
              type="date"
              error={state.errors?.dueDate?.[0]}
            />
          </div>
          <Field
            id="labels"
            label="Labels"
            placeholder="writing, launch"
            error={state.errors?.labels?.[0]}
          />
          <ActionMessage state={state} />
          <SubmitButton label="Create todo" pendingLabel="Creating..." />
        </form>
      </CardContent>
    </Card>
  );
}

function TodoItem({
  todo,
  workspaceId,
}: {
  todo: TodoSummary;
  workspaceId: string;
}) {
  const [state, action] = useActionState(updateTodoAction, initialState);
  const done = todo.status === "done";

  return (
    <article className="rounded-md border border-border bg-surface-muted/50 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <form action={toggleTodoCompletionAction}>
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <input type="hidden" name="todoId" value={todo.id} />
          <IconSubmitButton
            label={done ? "Mark todo incomplete" : "Mark todo complete"}
            icon={done ? Check : Circle}
            className={done ? "text-success" : "text-cyan"}
          />
        </form>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              className={cn(
                "min-w-0 text-base font-semibold",
                done && "text-muted line-through",
              )}
            >
              {todo.title}
            </h2>
            <Badge variant={priorityVariants[todo.priority]}>
              {priorityLabels[todo.priority]}
            </Badge>
            <Badge variant={done ? "success" : "blue"}>
              {statusLabels[todo.status]}
            </Badge>
          </div>
          {todo.description ? (
            <p className="mt-2 text-sm leading-6 text-muted">
              {todo.description}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>Created by {todo.creatorName}</span>
            {todo.dueDate ? (
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-3.5" />
                Due {formatDate(todo.dueDate)}
              </span>
            ) : null}
            {todo.labels.map((label) => (
              <span
                key={label.id}
                className="rounded-sm border px-2 py-1 text-[0.7rem] font-medium"
                style={{
                  borderColor: `${label.color}66`,
                  backgroundColor: `${label.color}1f`,
                  color: label.color,
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <form action={deleteTodoAction}>
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <input type="hidden" name="todoId" value={todo.id} />
          <IconSubmitButton
            label={`Delete ${todo.title}`}
            icon={Trash2}
            className="text-red-300"
          />
        </form>
      </div>

      <details className="mt-4 rounded-md border border-border bg-background/35 p-3">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-muted transition hover:text-foreground">
          <Pencil className="size-4" /> Edit todo
        </summary>
        <form action={action} className="mt-4 space-y-4">
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <input type="hidden" name="todoId" value={todo.id} />
          <Field
            id={`title-${todo.id}`}
            name="title"
            label="Title"
            defaultValue={todo.title}
            error={state.errors?.title?.[0]}
          />
          <TextAreaField
            id={`description-${todo.id}`}
            name="description"
            label="Notes"
            defaultValue={todo.description ?? ""}
            error={state.errors?.description?.[0]}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <SelectField
              id={`status-${todo.id}`}
              name="status"
              label="Status"
              defaultValue={todo.status}
              options={todoStatuses.map((status) => ({
                value: status,
                label: statusLabels[status],
              }))}
              error={state.errors?.status?.[0]}
            />
            <SelectField
              id={`priority-${todo.id}`}
              name="priority"
              label="Priority"
              defaultValue={todo.priority}
              options={todoPriorities.map((priority) => ({
                value: priority,
                label: priorityLabels[priority],
              }))}
              error={state.errors?.priority?.[0]}
            />
            <Field
              id={`dueDate-${todo.id}`}
              name="dueDate"
              label="Due date"
              type="date"
              defaultValue={formatDateInput(todo.dueDate)}
              error={state.errors?.dueDate?.[0]}
            />
          </div>
          <Field
            id={`labels-${todo.id}`}
            name="labels"
            label="Labels"
            defaultValue={todo.labels.map((label) => label.name).join(", ")}
            error={state.errors?.labels?.[0]}
          />
          <ActionMessage state={state} />
          <SubmitButton label="Save changes" pendingLabel="Saving..." />
        </form>
      </details>
    </article>
  );
}

function Field({
  id,
  label,
  error,
  name,
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
        name={name ?? id}
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

function TextAreaField({
  id,
  label,
  error,
  name,
  ...textareaProps
}: {
  id: string;
  label: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const errorId = `${id}-error`;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        name={name ?? id}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="flex min-h-24 w-full rounded-md border border-border bg-surface-muted/80 px-3 py-2 text-sm text-foreground transition placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
        {...textareaProps}
      />
      {error ? (
        <p id={errorId} className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  error,
  options,
  name,
  ...selectProps
}: {
  id: string;
  label: string;
  error?: string;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const errorId = `${id}-error`;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={name ?? id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="flex min-h-11 w-full rounded-md border border-border bg-surface-muted/80 px-3 py-2 text-sm text-foreground transition focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ActionMessage({ state }: { state: TodoActionState }) {
  if (!state.message) {
    return null;
  }

  return (
    <p
      className={
        state.status === "success"
          ? "rounded-md border border-success/30 bg-success/10 px-3 py-2 text-sm text-emerald-200"
          : "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-200"
      }
      role="status"
    >
      {state.message}
    </p>
  );
}

function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}

function IconSubmitButton({
  label,
  icon: Icon,
  className,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label={label}
      disabled={pending}
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full border border-border-strong bg-surface transition hover:bg-surface-raised disabled:pointer-events-none disabled:opacity-45",
        className,
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatDateInput(date: Date | null) {
  if (!date) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}
