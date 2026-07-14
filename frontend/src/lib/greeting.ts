export interface Greeting {
  salutation: string;
  invitation: string;
}

/**
 * Contextual greeting copy — canonical lines from DESIGN.md → Empty State.
 * Cutoffs: morning 05:00–11:59, afternoon 12:00–17:59, evening 18:00–04:59
 * (late night reads as evening by design).
 */
export function getGreeting(date: Date): Greeting {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return {
      salutation: "Good morning.",
      invitation: "What are we creating today?",
    };
  }
  if (hour >= 12 && hour < 18) {
    return {
      salutation: "Good afternoon.",
      invitation: "What's worth exploring?",
    };
  }
  return {
    salutation: "Good evening.",
    invitation: "Let's end the day with a good idea.",
  };
}
