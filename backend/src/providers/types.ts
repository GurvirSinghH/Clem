import type { Message } from "@clem/shared";

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
}

export interface ProviderChatRequest {
  messages: Message[];
  model: string;
}

/**
 * Structured result (not a bare string) so streaming, usage, and metadata
 * can be added later without changing existing call sites.
 */
export interface ChatCompletionResult {
  message: Message;
  usage?: TokenUsage;
}

/**
 * The seam between Clem and any AI vendor. Everything above this interface
 * is provider-agnostic; everything below lives in one provider folder.
 */
export interface AIProvider {
  readonly id: string;
  chat(request: ProviderChatRequest): Promise<ChatCompletionResult>;
  // Future (additive, NOT implemented in v0.1):
  // chatStream(request: ProviderChatRequest): AsyncIterable<ChatChunk>;
}
