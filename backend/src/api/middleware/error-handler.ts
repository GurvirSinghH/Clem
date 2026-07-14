import type { NextFunction, Request, Response } from "express";
import type { ApiErrorBody } from "@clem/shared";
import { AppError } from "../../errors/app-error.js";

function toAppError(err: unknown): AppError {
  if (err instanceof AppError) {
    return err;
  }
  // express.json() throws SyntaxError (with a `body` property) on malformed JSON.
  if (err instanceof SyntaxError && "body" in err) {
    return new AppError("VALIDATION_ERROR", "Request body is not valid JSON.", {
      cause: err,
    });
  }
  return new AppError("INTERNAL_ERROR", "An unexpected error occurred.", {
    cause: err,
  });
}

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(new AppError("NOT_FOUND", `Route not found: ${req.method} ${req.path}`));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const appError = toAppError(err);

  if (appError.code === "INTERNAL_ERROR") {
    console.error("[clem:error]", appError.cause ?? appError);
  }

  const body: ApiErrorBody = {
    error: { code: appError.code, message: appError.message },
  };
  res.status(appError.status).json(body);
}
