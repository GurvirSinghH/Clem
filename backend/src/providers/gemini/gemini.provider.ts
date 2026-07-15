import { randomUUID } from "node:crypto";
import { ApiError, GoogleGenAI, type Content } from "@google/genai";
import type { Message } from "@clem/shared";
import { AppError } from "../../errors/app-error.js";
import type {
  AIProvider,
  ChatCompletionResult,
  ProviderChatRequest,
} from "../types.js";

interface GeminiProviderOptions {
  apiKey: string;
}

/**
 * The ONLY module in the codebase that touches the Google Gen AI SDK.
 * All SDK errors are converted to AppError before leaving this file —
 * nothing above the provider layer ever sees a Gemini type.
 */
export class GeminiProvider implements AIProvider {
  readonly id = "gemini";
  private readonly client: GoogleGenAI;

  constructor(options: GeminiProviderOptions) {
    this.client = new GoogleGenAI({ apiKey: options.apiKey });
  }

  async chat(request: ProviderChatRequest): Promise<ChatCompletionResult> {
    let text: string | undefined;
    let promptTokens: number | undefined;
    let responseTokens: number | undefined;

    try {
      const response = await this.client.models.generateContent({
        model: request.model,
        contents: toGeminiContents(request.messages),
      });
      text = response.text;
      promptTokens = response.usageMetadata?.promptTokenCount;
      responseTokens = response.usageMetadata?.candidatesTokenCount;
    } catch (error) {
      throw normalizeGeminiError(error);
    }

    if (!text) {
      // Covers empty candidates and safety-blocked responses alike.
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
      usage:
        promptTokens !== undefined && responseTokens !== undefined
          ? { inputTokens: promptTokens, outputTokens: responseTokens }
          : undefined,
    };
  }
}

/** Clem roles map 1:1 except "assistant", which Gemini calls "model". */
function toGeminiContents(messages: Message[]): Content[] {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

/** Maps SDK errors to the normalized taxonomy. Messages are user-safe. */
function normalizeGeminiError(error: unknown): AppError {
  if (error instanceof ApiError) {
    if (error.status === 429) {
      return new AppError(
        "PROVIDER_RATE_LIMIT",
        "The AI service is receiving too many requests. Please try again in a moment.",
        { cause: error },
      );
    }
    if (error.status === 401 || error.status === 403) {
      return new AppError(
        "PROVIDER_ERROR",
        "The AI provider is not configured correctly on the server.",
        { cause: error },
      );
    }
    if (error.status >= 500) {
      return new AppError(
        "PROVIDER_UNAVAILABLE",
        "The AI service is temporarily unavailable. Please try again shortly.",
        { cause: error },
      );
    }
    // Remaining 4xx (bad model id, malformed request, …) — our fault or config, not the user's.
    return new AppError(
      "PROVIDER_ERROR",
      "The AI service could not process this request.",
      { cause: error },
    );
  }
  // Non-ApiError failures from the SDK are transport-level (DNS, socket, timeout).
  if (error instanceof Error && error.name !== "TypeError") {
    return new AppError(
      "PROVIDER_UNAVAILABLE",
      "Could not reach the AI service. Please try again shortly.",
      { cause: error },
    );
  }
  return new AppError("INTERNAL_ERROR", "An unexpected error occurred.", {
    cause: error,
  });
}
