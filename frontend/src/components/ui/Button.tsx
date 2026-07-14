import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "subtle" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  // Accent allowlist: primary action. The only accent-filled control.
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-pressed",
  subtle:
    "bg-surface-elevated text-text-primary border border-border hover:border-border-strong",
  ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-elevated",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "subtle",
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-(--size-touch) items-center justify-center gap-2 rounded-sm px-4",
        "type-compact font-medium motion-interactive",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
