import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type SurfaceLevel = "base" | "raised" | "overlay";

/**
 * The elevation primitive. Pairs surface color + radius + shadow per
 * TOKENS.md so elevation can never be mis-assembled. Elevation on dark UI
 * is carried by lighter surfaces; shadows are secondary.
 */
const levelClasses: Record<SurfaceLevel, string> = {
  base: "bg-surface rounded-md",
  raised: "bg-surface-elevated rounded-lg shadow-float",
  overlay: "bg-surface-overlay rounded-lg shadow-overlay",
};

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  level?: SurfaceLevel;
}

export function Surface({
  level = "base",
  className,
  children,
  ...rest
}: SurfaceProps) {
  return (
    <div className={cn(levelClasses[level], className)} {...rest}>
      {children}
    </div>
  );
}
