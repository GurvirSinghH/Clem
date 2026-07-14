import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required — icon-only controls are invisible to screen readers without it. */
  "aria-label": string;
  /** Active navigation state — the accent allowlist's "active navigation" slot. */
  isActive?: boolean;
}

/**
 * Square icon control. The hit area is always the 44px touch minimum
 * (TOKENS.md → Accessibility) regardless of icon size. Lucide icons only.
 */
export function IconButton({
  isActive = false,
  type = "button",
  className,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-pressed={isActive || undefined}
      className={cn(
        "inline-flex size-(--size-touch) items-center justify-center rounded-sm",
        "motion-interactive disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "text-accent"
          : "text-text-secondary hover:bg-surface-elevated hover:text-text-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
