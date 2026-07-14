import { motion, useReducedMotion } from "framer-motion";
import { motionThinking } from "../../lib/motion.js";

/**
 * The assistant-is-working state: calm breathing text, never a spinner
 * (DESIGN.md → Loading States). Announced politely to screen readers;
 * static presence under reduced motion (TOKENS.md → Motion Hierarchy).
 */
export function ThinkingIndicator() {
  const reduceMotion = useReducedMotion();

  return (
    <div role="status" className="type-compact text-text-muted">
      {reduceMotion ? (
        <span>Thinking…</span>
      ) : (
        <motion.span
          className="inline-block"
          animate={motionThinking.animate}
          transition={motionThinking.transition}
        >
          Thinking…
        </motion.span>
      )}
    </div>
  );
}
