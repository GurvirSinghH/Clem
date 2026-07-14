import type { ChatRequest, ChatResponse } from "@clem/shared";
import { env } from "../config/env.js";
import { getProvider } from "../providers/registry.js";

/**
 * Provider-agnostic orchestration: selects the provider from config,
 * invokes it, and shapes the API response. Chat history persistence
 * and model routing land here in future milestones.
 */
export class ChatService {
  async send(request: ChatRequest): Promise<ChatResponse> {
    const provider = getProvider(env.AI_PROVIDER);
    const result = await provider.chat({
      messages: request.messages,
      model: env.AI_MODEL,
    });
    return { message: result.message };
  }
}

export const chatService = new ChatService();
