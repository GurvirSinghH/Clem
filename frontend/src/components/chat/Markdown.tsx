import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "../../lib/cn.js";
import { CodeBlock } from "./CodeBlock.js";

/**
 * Maps markdown onto Clem's editorial typography (DESIGN.md → Chat / Message
 * Layout; TOKENS.md → Typography, Spacing). Assistant content is bubble-less
 * prose: document heading levels map to the *editorial* type scale (not raw
 * browser sizes), paragraphs breathe at `space-5`, and special content
 * (code, blockquotes, tables) uses restrained containers.
 *
 * Every value is a token utility — no hardcoded color/spacing/type. GFM adds
 * tables, task lists, strikethrough, and autolinks.
 *
 * Vertical rhythm: each top-level block carries its own top margin with
 * `first:mt-0`, so the flow reads as an article regardless of block order.
 */
const components: Components = {
  p: ({ children }) => <p className="mt-5 first:mt-0">{children}</p>,

  // Document heading levels → Clem's editorial scale. h4–h6 clamp to the
  // smallest prose heading; the scale is restrained by design (TOKENS.md).
  h1: ({ children }) => (
    <h1 className="type-h1 mt-7 text-text-primary first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="type-h2 mt-7 text-text-primary first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="type-h3 mt-6 text-text-primary first:mt-0">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="type-h3 mt-6 text-text-primary first:mt-0">{children}</h4>
  ),
  h5: ({ children }) => (
    <h5 className="type-h3 mt-6 text-text-primary first:mt-0">{children}</h5>
  ),
  h6: ({ children }) => (
    <h6 className="type-h3 mt-6 text-text-primary first:mt-0">{children}</h6>
  ),

  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 ps-5 first:mt-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 ps-5 first:mt-0">{children}</ol>
  ),
  li: ({ className, children }) => (
    <li className={cn("ps-1", className?.includes("task-list-item") && "list-none ps-0")}>
      {children}
    </li>
  ),
  // GFM task-list checkbox — inert, quiet, monochrome (no accent in prose body).
  input: ({ type, checked }) =>
    type === "checkbox" ? (
      <input
        type="checkbox"
        checked={checked}
        disabled
        aria-hidden
        className="me-2 align-middle"
      />
    ) : null,

  blockquote: ({ children }) => (
    <blockquote className="mt-5 border-s-2 border-border ps-5 text-text-secondary first:mt-0">
      {children}
    </blockquote>
  ),

  a: ({ href, children }) => (
    // Editorial link — the one accent sanctioned inside prose (accent allowlist).
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="text-accent underline decoration-border underline-offset-2 motion-hover hover:text-accent-hover"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-text-primary">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => (
    <del className="text-text-muted line-through">{children}</del>
  ),
  hr: () => <hr className="mt-7 border-0 border-t border-border first:mt-0" />,

  // Tables are wide special content: contained and horizontally scrollable so
  // they never force the reading column open (same scroll rule as code).
  table: ({ children }) => (
    <div className="mt-5 overflow-x-auto first:mt-0">
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="type-small border-b border-border px-3 py-2 font-medium text-text-secondary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="type-compact border-b border-border px-3 py-2 align-top text-text-primary">
      {children}
    </td>
  ),

  // Inline code (chip) vs fenced block. `inline` was removed from react-markdown
  // in v9+, so detect a block by a language hint or an embedded newline.
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children }) => {
    const raw = String(children ?? "");
    const isBlock = /language-/.test(className ?? "") || raw.includes("\n");
    if (!isBlock) {
      return (
        <code className="type-code-inline rounded-sm bg-surface px-1 text-text-primary">
          {children}
        </code>
      );
    }
    const match = /language-(\w+)/.exec(className ?? "");
    return <CodeBlock language={match?.[1]} value={raw.replace(/\n$/, "")} />;
  },
};

export function Markdown({ children }: { children: string }) {
  return (
    <div className="type-body text-text-primary">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
