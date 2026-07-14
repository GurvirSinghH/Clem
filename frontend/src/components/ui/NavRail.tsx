import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface NavRailProps extends HTMLAttributes<HTMLElement> {
  /** Brand moment at the top of the rail (wordmark / logo). */
  logo?: ReactNode;
  /** Pinned to the bottom of the rail (e.g. Settings). */
  footer?: ReactNode;
}

/**
 * The floating navigation rail (DESIGN.md → Sidebar). Compact density,
 * glass over scrolling content, detached from edges — positioning is the
 * WorkspaceShell's job so the rail itself stays placement-agnostic.
 * Slot-based so future items (history, model selection) are additive.
 */
export function NavRail({
  logo,
  footer,
  className,
  children,
  ...rest
}: NavRailProps) {
  return (
    <nav
      aria-label="Primary"
      className={cn(
        "flex w-(--width-rail) flex-col items-center gap-2 p-2",
        "rounded-lg border border-border bg-surface-elevated/85 shadow-float backdrop-blur-glass",
        className,
      )}
      {...rest}
    >
      {logo != null && (
        <div className="flex size-(--size-touch) items-center justify-center">
          {logo}
        </div>
      )}
      <div className="flex flex-col items-center gap-2">{children}</div>
      {footer != null && (
        <div className="flex flex-col items-center gap-2 border-t border-border pt-2">
          {footer}
        </div>
      )}
    </nav>
  );
}
