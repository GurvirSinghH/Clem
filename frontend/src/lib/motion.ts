/**
 * Framer Motion expression of TOKENS.md → Motion.
 * TOKENS.md is the source of truth; styles/tokens.css mirrors these values
 * as CSS variables. Change values in TOKENS.md first, then both files.
 */

/** Durations in seconds (Framer convention). */
export const durations = {
  instant: 0.1,
  fast: 0.18,
  base: 0.24,
  slow: 0.4,
  ambient: 40,
} as const;

export const easings = {
  standard: [0.2, 0, 0, 1],
  exit: [0.4, 0, 1, 1],
} as const;

/** Level 3 — motion-message-in: new content settles like type onto a page. */
export const motionMessageIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: durations.base, ease: easings.standard },
} as const;

/** Level 4 — motion-scene: screen-level entrances (greeting, view changes). */
export const motionScene = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: durations.slow, ease: easings.standard },
} as const;

/**
 * motion-thinking (TOKENS.md → Named choreography): the waiting-for-assistant
 * state — calm breathing, never spinning. Ambient-family pacing; symmetric
 * ease because the loop mirrors.
 */
export const motionThinking = {
  // No `as const`: Framer's keyframe types require mutable arrays.
  animate: { opacity: [0.35, 1, 0.35] },
  transition: { duration: 2.4, ease: "easeInOut" as const, repeat: Infinity },
};
