import { env } from "../config/env.js";
import { AppError } from "../errors/app-error.js";
import { AnthropicProvider } from "./anthropic/anthropic.provider.js";
import { GeminiProvider } from "./gemini/gemini.provider.js";
import type { AIProvider } from "./types.js";

/**
 * Adding a provider is one entry here plus one folder under providers/.
 * Nothing above this file changes.
 */
const factories: Record<string, () => AIProvider> = {
  anthropic: () => {
    if (!env.ANTHROPIC_API_KEY) {
      throw new AppError(
        "PROVIDER_ERROR",
        "The AI provider is not configured on the server.",
      );
    }
    return new AnthropicProvider({
      apiKey: env.ANTHROPIC_API_KEY,
      maxTokens: env.AI_MAX_TOKENS,
    });
  },
  gemini: () => {
    if (!env.GEMINI_API_KEY) {
      throw new AppError(
        "PROVIDER_ERROR",
        "The AI provider is not configured on the server.",
      );
    }
    return new GeminiProvider({ apiKey: env.GEMINI_API_KEY });
  },
};

const instances = new Map<string, AIProvider>();

export function getProvider(id: string): AIProvider {
  const cached = instances.get(id);
  if (cached) {
    return cached;
  }
  const factory = factories[id];
  if (!factory) {
    throw new AppError(
      "PROVIDER_ERROR",
      "The configured AI provider is not available.",
    );
  }
  const provider = factory();
  instances.set(id, provider);
  return provider;
}
