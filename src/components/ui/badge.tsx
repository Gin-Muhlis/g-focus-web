import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm border px-2 py-1 text-[0.7rem] font-medium leading-none",
  {
    variants: {
      variant: {
        blue: "border-accent/30 bg-accent/12 text-blue-200",
        violet:
          "border-accent-secondary/30 bg-accent-secondary/12 text-violet-200",
        success: "border-success/30 bg-success/12 text-emerald-200",
        warning: "border-warning/30 bg-warning/12 text-amber-200",
        neutral: "border-border-strong bg-surface-raised text-muted",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}
