import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { clemCodeTheme } from "../../lib/codeTheme.js";
import { Surface } from "../ui/Surface.js";

interface CodeBlockProps {
  /** Language from the fence (```ts). Undefined for un-hinted blocks. */
  language?: string;
  /** Raw code, trailing newline already stripped. */
  value: string;
}

/**
 * A fenced code block, rendered as editorial special content (Surface, radius-md).
 *
 * Scroll rules (approved, M4B.3):
 *   - No height cap and no internal VERTICAL scroll — the block grows to fit and
 *     the page scrolls. `overflow-x-auto` with no max-height means the only
 *     scroll that can ever appear is horizontal, and only when a line overflows.
 *
 * `type-code` on the wrapper supplies the mono family/size/line-height; the
 * theme inherits them, so no typographic numbers live here.
 */
export function CodeBlock({ language, value }: CodeBlockProps) {
  return (
    <Surface level="base" className="type-code mt-5 overflow-hidden first:mt-0">
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={clemCodeTheme}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "var(--spacing-4)",
            background: "transparent",
          }}
          codeTagProps={{
            style: {
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
            },
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </Surface>
  );
}
