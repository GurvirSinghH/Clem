export const ERROR_CODES = [
  "VALIDATION_ERROR",
  "NOT_FOUND",
  "PROVIDER_RATE_LIMIT",
  "PROVIDER_UNAVAILABLE",
  "PROVIDER_ERROR",
  "INTERNAL_ERROR",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

/** Error envelope returned by every failed API request. `message` is safe to display. */
export interface ApiErrorBody {
  error: {
    code: ErrorCode;
    message: string;
  };
}
