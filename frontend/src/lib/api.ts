import type {
  ApiErrorBody,
  ChatRequest,
  ChatResponse,
  ErrorCode,
} from "@clem/shared";

/**
 * The ONLY module in the frontend that performs network requests.
 * Swapping fetch for SSE/streaming later is a change to this file
 * (plus the consuming hook) — nothing else.
 */

const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

export class ApiError extends Error {
  readonly code: ErrorCode;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

export async function sendChat(request: ChatRequest): Promise<ChatResponse> {
  let response: Response;
  try {
    response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
  } catch (error) {
    // Network failure — the request never reached the server.
    throw new ApiError(
      "INTERNAL_ERROR",
      "Could not reach the server. Check your connection and try again.",
    );
  }

  if (!response.ok) {
    let body: ApiErrorBody | undefined;
    try {
      body = (await response.json()) as ApiErrorBody;
    } catch {
      // Non-JSON error body (e.g. proxy failure) — fall through to defaults.
    }
    throw new ApiError(
      body?.error.code ?? "INTERNAL_ERROR",
      body?.error.message ?? FALLBACK_MESSAGE,
    );
  }

  return (await response.json()) as ChatResponse;
}
