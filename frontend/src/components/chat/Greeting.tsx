import { motion } from "framer-motion";
import { getGreeting } from "../../lib/greeting.js";
import { motionScene } from "../../lib/motion.js";

/**
 * The editorial greeting — the empty state's single focal point.
 * Typography carries the emotion: serif display line, quiet second line.
 * Scene-level entrance (motion hierarchy level 4).
 */
export function Greeting() {
  const { salutation, invitation } = getGreeting(new Date());

  return (
    <motion.div
      initial={motionScene.initial}
      animate={motionScene.animate}
      transition={motionScene.transition}
      className="flex flex-col items-center gap-3 text-center"
    >
      <h1 className="type-display text-text-primary">{salutation}</h1>
      <p className="type-body text-text-secondary">{invitation}</p>
    </motion.div>
  );
}
