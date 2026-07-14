import { useCallback, useState } from "react";
import type { Message } from "@clem/shared";
import { ApiError, sendChat } from "../lib/api.js";

const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

/**
 * All chat state lives here — components stay presentational.
 * If state grows complex later, this hook migrates to a store
 * without touching any component.
 */
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isSending) {
        return;
      }

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
      };

      // The API is stateless: send the full history including the new message.
      const history = [...messages, userMessage];
      setMessages(history);
      setIsSending(true);
      setError(null);

      try {
        const response = await sendChat({ messages: history });
        setMessages((current) => [...current, response.message]);
      } catch (caught) {
        setError(
          caught instanceof ApiError ? caught.message : FALLBACK_MESSAGE,
        );
      } finally {
        setIsSending(false);
      }
    },
    [messages, isSending],
  );

  const clearError = useCallback(() => setError(null), []);

  return { messages, isSending, error, send, clearError };
}
