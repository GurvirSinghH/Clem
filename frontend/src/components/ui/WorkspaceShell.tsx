import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { durations } from "../../lib/motion.js";

export interface WorkspaceShellProps {
  /** The floating navigation rail — positioned by the shell, styled by NavRail. */
  rail?: ReactNode;
  /** The floating composer region — pinned above the bottom edge. */
  composer?: ReactNode;
  children?: ReactNode;
}

/**
 * Global layout foundation. Named for where Clem is going: today one
 * conversation, eventually a multi-model AI workspace — this shell is the
 * thing that will host those surfaces.
 *
 * Owns the ambient background (motion hierarchy level 5) and the placement
 * of the two floating identity elements (rail, composer).
 *
 * Rail placement below `md` is provisional — the mobile rail pattern is
 * pending product-owner approval (see TOKENS.md → Layout → Responsive).
 */
export function WorkspaceShell({ rail, composer, children }: WorkspaceShellProps) {
  return (
    <div className="relative min-h-dvh">
      <AmbientBackground />
      {rail != null && (
        <div className="fixed left-4 top-1/2 z-(--z-rail) -translate-y-1/2 lg:left-6">
          {rail}
        </div>
      )}
      <main className="relative z-(--z-base)">{children}</main>
      {composer != null && (
        <div className="fixed inset-x-0 bottom-4 z-(--z-composer) lg:bottom-6">
          {composer}
        </div>
      )}
    </div>
  );
}

/**
 * Motion hierarchy level 5 — atmosphere only. Blurred past recognition
 * (blur-ambient also prevents banding on dark gradients), bounded by
 * background-lift so text contrast guarantees hold, drifting on the
 * ambient duration. Framer animates via rAF, so browsers pause it when
 * the tab is hidden. Static under reduced motion.
 */
function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  const drift = (offsets: number[]) =>
    reduceMotion
      ? undefined
      : {
          x: offsets.map((o) => `${o}%`),
          y: offsets.map((o) => `${-o}%`),
        };

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-(--z-ambient) overflow-hidden"
    >
      <motion.div
        className="absolute -top-1/4 left-1/4 size-2/3 rounded-full bg-background-lift blur-ambient"
        animate={drift([0, 4, 0])}
        transition={{
          duration: durations.ambient,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 right-1/4 size-1/2 rounded-full bg-background-lift blur-ambient"
        animate={drift([0, -3, 0])}
        transition={{
          duration: durations.ambient * 1.4,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
