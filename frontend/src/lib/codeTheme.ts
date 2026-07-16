import type { CSSProperties } from "react";

/**
 * Clem's syntax theme for react-syntax-highlighter (Prism).
 *
 * Two rules make this token-faithful and DESIGN-compliant:
 *   1. Colors are ONLY `var(--color-*)` tokens — never hex. Token discipline
 *      survives even inside the highlighter's inline styles.
 *   2. It is deliberately near-monochrome ink: comments muted, keywords/idents
 *      primary, literals secondary. Desaturated by construction — there is no
 *      rainbow palette to fall into, and the champagne accent is intentionally
 *      absent (the accent allowlist does not include code — TOKENS.md).
 *
 * Typography (family/size/line-height) is `inherit`: it flows from the
 * `type-code` utility on CodeBlock's wrapper, so those numbers live in tokens.css.
 */

const primary = "var(--color-text-primary)";
const secondary = "var(--color-text-secondary)";
const muted = "var(--color-text-muted)";

/** Base text + container: transparent (the Surface wrapper paints the bg). */
const base: CSSProperties = {
  color: primary,
  background: "none",
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
};

export const clemCodeTheme: Record<string, CSSProperties> = {
  'code[class*="language-"]': base,
  'pre[class*="language-"]': base,

  // Muted — commentary and structural punctuation recede.
  comment: { color: muted, fontStyle: "italic" },
  prolog: { color: muted },
  doctype: { color: muted },
  cdata: { color: muted },
  punctuation: { color: muted },

  // Primary — the load-bearing identifiers.
  tag: { color: primary },
  property: { color: primary },
  function: { color: primary },
  "class-name": { color: primary },
  keyword: { color: primary, fontWeight: 500 },
  builtin: { color: primary },
  variable: { color: primary },
  selector: { color: primary },

  // Secondary — literals and values sit one step quieter than idents.
  boolean: { color: secondary },
  number: { color: secondary },
  constant: { color: secondary },
  symbol: { color: secondary },
  string: { color: secondary },
  char: { color: secondary },
  regex: { color: secondary },
  operator: { color: secondary },
  entity: { color: secondary },
  url: { color: secondary },
  "attr-name": { color: secondary },
  "attr-value": { color: secondary },
};
