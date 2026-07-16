import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Plus, Settings } from "lucide-react";
import { useChat } from "../../hooks/useChat.js";
import { cn } from "../../lib/cn.js";
import { motionMessageIn } from "../../lib/motion.js";
import { Button } from "../ui/Button.js";
import { Composer } from "../ui/Composer.js";
import { Container } from "../ui/Container.js";
import { IconButton } from "../ui/IconButton.js";
import { NavRail } from "../ui/NavRail.js";
import { Surface } from "../ui/Surface.js";
import { WorkspaceShell } from "../ui/WorkspaceShell.js";
import { Greeting } from "./Greeting.js";
import { Markdown } from "./Markdown.js";
import { ThinkingIndicator } from "./ThinkingIndicator.js";

/**
 * M4B.2 — composer wired to useChat (send, receive, loading, clear).
 * The conversation rendering below is INTERIM: plain token-styled text
 * following the approved message-layout direction, replaced by the real
 * message components (markdown, code blocks) in M4B.3.
 *
 * Tablet (md) uses wider symmetric padding so the content column clears
 * the floating rail; mobile pattern is pending product-owner approval.
 */
const railClearance = "px-4 md:px-10 lg:px-6";

export function ChatPage() {
  const [draft, setDraft] = useState("");
  const { messages, isSending, error, send } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  const hasConversation = messages.length > 0;

  const handleSend = useCallback(() => {
    const text = draft.trim();
    if (!text || isSending) return;
    setDraft(""); // clear immediately — the message now lives in the conversation
    void send(text);
  }, [draft, isSending, send]);

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    if (!hasConversation) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "auto"
      : "smooth";
    endRef.current?.scrollIntoView({ behavior, block: "end" });
  }, [messages.length, isSending, hasConversation]);

  return (
    <WorkspaceShell
      rail={
        <NavRail
          logo={
            <span aria-hidden className="type-display text-text-primary">
              C
            </span>
          }
          footer={
            <IconButton aria-label="Settings" disabled>
              <Settings size={20} />
            </IconButton>
          }
        >
          <IconButton aria-label="New chat" isActive>
            <Plus size={20} />
          </IconButton>
        </NavRail>
      }
      composer={
        <Container width="composer" className={railClearance}>
          <Composer
            value={draft}
            onChange={setDraft}
            onSubmit={handleSend}
            label="Write to Clem"
            action={
              <Button
                variant="primary"
                aria-label="Send"
                disabled={draft.trim().length === 0 || isSending}
                onClick={handleSend}
                className="size-(--size-touch) rounded-full px-0"
              >
                <ArrowUp size={20} />
              </Button>
            }
          />
        </Container>
      }
    >
      {hasConversation ? (
        <Container
          width="reading"
          className={cn(railClearance, "flex flex-col gap-6 py-10")}
        >
          {messages.map((message) =>
            message.role === "user" ? (
              <motion.div
                key={message.id}
                initial={motionMessageIn.initial}
                animate={motionMessageIn.animate}
                transition={motionMessageIn.transition}
                className="flex justify-end"
              >
                <Surface level="base" className="max-w-4/5 px-4 py-3">
                  <p className="type-compact whitespace-pre-wrap text-text-primary">
                    {message.content}
                  </p>
                </Surface>
              </motion.div>
            ) : (
              // Assistant messages remain bubble-less editorial prose; markdown
              // is mapped to Clem's type scale inside <Markdown>. The keyed motion
              // wrapper is unchanged, so only the newest message animates in and
              // history never re-animates on scroll (motion-message-in).
              <motion.div
                key={message.id}
                initial={motionMessageIn.initial}
                animate={motionMessageIn.animate}
                transition={motionMessageIn.transition}
              >
                <Markdown>{message.content}</Markdown>
              </motion.div>
            ),
          )}
          {isSending && <ThinkingIndicator />}
          {error != null && (
            <p role="alert" className="type-small text-error">
              {error}
            </p>
          )}
          {/* Scroll target + clearance above the fixed composer. */}
          <div ref={endRef} aria-hidden className="h-10 shrink-0 pb-10" />
        </Container>
      ) : (
        <div className="flex min-h-dvh flex-col items-center">
          <div aria-hidden className="min-h-9 flex-2" />
          <Container width="composer" className={railClearance}>
            <Greeting />
          </Container>
          <div aria-hidden className="min-h-10 flex-3" />
        </div>
      )}
    </WorkspaceShell>
  );
}
