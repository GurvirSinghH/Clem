import { randomUUID } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import type { Message } from "@clem/shared";
import { AppError } from "../../errors/app-error.js";
import type {
  AIProvider,
  ChatCompletionResult,
  ProviderChatRequest,
} from "../types.js";

interface AnthropicProviderOptions {
  apiKey: string;
  maxTokens: number;
}

/**
 * The ONLY module in the codebase that touches the Anthropic SDK.
 * All SDK errors are converted to AppError before leaving this file —
 * nothing above the provider layer ever sees an Anthropic type.
 */
export class AnthropicProvider implements AIProvider {
  readonly id = "anthropic";
  private readonly client: Anthropic;
  private readonly maxTokens: number;

  constructor(options: AnthropicProviderOptions) {
    this.client = new Anthropic({ apiKey: options.apiKey });
    this.maxTokens = options.maxTokens;
  }

  async chat(request: ProviderChatRequest): Promise<ChatCompletionResult> {
    let response: Anthropic.Message;
    try {
      response = await this.client.messages.create({
        model: request.model,
        max_tokens: this.maxTokens,
        thinking: { type: "adaptive" },
        messages: request.messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      });
    } catch (error) {
      throw normalizeAnthropicError(error);
    }

    if (response.stop_reason === "refusal") {
      throw new AppError(
        "PROVIDER_ERROR",
        "The AI declined to respond to this request.",
      );
    }

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    if (!text) {
      throw new AppError(
        "PROVIDER_ERROR",
        "The AI returned an empty response. Please try again.",
      );
    }

    const message: Message = {
      id: randomUUID(),
      role: "assistant",
      content: text,
      createdAt: new Date().toISOString(),
    };

    return {
      message,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    };
  }
}

/** Maps SDK error classes to the normalized taxonomy. Messages are user-safe. */
function normalizeAnthropicError(error: unknown): AppError {
  if (error instanceof Anthropic.RateLimitError) {
    return new AppError(
      "PROVIDER_RATE_LIMIT",
      "The AI service is receiving too many requests. Please try again in a moment.",
      { cause: error },
    );
  }
  if (
    error instanceof Anthropic.AuthenticationError ||
    error instanceof Anthropic.PermissionDeniedError
  ) {
    return new AppError(
      "PROVIDER_ERROR",
      "The AI provider is not configured correctly on the server.",
      { cause: error },
    );
  }
  if (error instanceof Anthropic.InternalServerError) {
    return new AppError(
      "PROVIDER_UNAVAILABLE",
      "The AI service is temporarily unavailable. Please try again shortly.",
      { cause: error },
    );
  }
  // Subclass of APIError in this SDK — must be checked before it.
  if (error instanceof Anthropic.APIConnectionError) {
    return new AppError(
      "PROVIDER_UNAVAILABLE",
      "Could not reach the AI service. Please try again shortly.",
      { cause: error },
    );
  }
  if (error instanceof Anthropic.APIError) {
    return new AppError(
      "PROVIDER_ERROR",
      "The AI service could not process this request.",
      { cause: error },
    );
  }
  return new AppError("INTERNAL_ERROR", "An unexpected error occurred.", {
    cause: error,
  });
}
