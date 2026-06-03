import * as React from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function EmptyState({
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-border-strong bg-surface-muted/70 p-6 text-center",
        className,
      )}
      {...props}
    >
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
