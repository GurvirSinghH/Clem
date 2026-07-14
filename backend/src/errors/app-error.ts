import type { ErrorCode } from "@clem/shared";

const STATUS_BY_CODE: Record<ErrorCode, number> = {
  VALIDATION_ERROR: 400,
  NOT_FOUND: 404,
  PROVIDER_RATE_LIMIT: 429,
  PROVIDER_UNAVAILABLE: 502,
  PROVIDER_ERROR: 502,
  INTERNAL_ERROR: 500,
};

/**
 * The only error type the API layer converts into an HTTP response.
 * `message` must be safe to show to the user; internals belong in `cause`.
 */
export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: number;

  constructor(code: ErrorCode, message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "AppError";
    this.code = code;
    this.status = STATUS_BY_CODE[code];
  }
}
