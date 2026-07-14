import {
  useCallback,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { Surface } from "./Surface.js";

export interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  /** Called on Enter (Shift+Enter inserts a newline). The page decides what submitting means. */
  onSubmit?: () => void;
  placeholder?: string;
  disabled?: boolean;
  /** Accessible name for the writing area. */
  label?: string;
  /** Primary action slot (send button) — right end of the utility bar. */
  action?: ReactNode;
  /** Future actions slot (attachments, model, voice) — left end. Reserved, empty in v0.1. */
  utilities?: ReactNode;
  className?: string;
}

/**
 * The composer — structure only (M4A). A lightweight writing surface,
 * not a chat input: floating card, multi-line by default, grows with input
 * until height-composer-max then scrolls internally. Chat wiring (send
 * behavior, key handling) belongs to the page layer, not this primitive.
 */
export function Composer({
  value,
  onChange,
  onSubmit,
  placeholder = "Write…",
  disabled = false,
  label = "Write your message",
  action,
  utilities,
  className,
}: ComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow: height tracks content; the max-h token caps it, after which
  // the textarea scrolls internally ("expands naturally, never cramped").
  const resize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value);
      resize();
    },
    [onChange, resize],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== "Enter" || event.shiftKey || !onSubmit) return;
      // Never submit mid-IME-composition (CJK input confirms with Enter).
      if (event.nativeEvent.isComposing) return;
      event.preventDefault();
      onSubmit();
    },
    [onSubmit],
  );

  return (
    <Surface
      level="raised"
      className={cn(
        // Borderless at rest — elevation + shadow define the edge. Focus uses
        // the system-standard 2px indicator (TOKENS.md → Accessibility), no
        // component-specific exception.
        "flex flex-col gap-2 bg-surface-elevated/85 p-5 backdrop-blur-glass",
        "motion-hover focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus",
        className,
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={label}
        rows={3}
        className={cn(
          "w-full resize-none bg-transparent type-body text-text-primary",
          "placeholder:text-text-muted",
          "max-h-(--height-composer-max) overflow-y-auto",
          // The card's focus-within border is the visible indicator; the
          // textarea's own outline would double it.
          "focus:outline-none",
          "disabled:opacity-50",
        )}
      />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">{utilities}</div>
        <div className="flex items-center gap-2">{action}</div>
      </div>
    </Surface>
  );
}
