import "dotenv/config";
import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.coerce.number().int().positive().default(4000),
    AI_PROVIDER: z.string().min(1).default("anthropic"),
    AI_MODEL: z.string().min(1).default("claude-opus-4-8"),
    AI_MAX_TOKENS: z.coerce.number().int().positive().default(16000),
    ANTHROPIC_API_KEY: z.string().min(1).optional(),
    GEMINI_API_KEY: z.string().min(1).optional(),
  })
  .superRefine((config, ctx) => {
    if (config.AI_PROVIDER === "anthropic" && !config.ANTHROPIC_API_KEY) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ANTHROPIC_API_KEY"],
        message: "ANTHROPIC_API_KEY is required when AI_PROVIDER is 'anthropic'",
      });
    }
    if (config.AI_PROVIDER === "gemini" && !config.GEMINI_API_KEY) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["GEMINI_API_KEY"],
        message: "GEMINI_API_KEY is required when AI_PROVIDER is 'gemini'",
      });
    }
  });

export type Env = z.infer<typeof envSchema>;

/** Parses and validates process.env once at boot. Throws (and kills the process) on bad config. */
function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  return result.data;
}

export const env = loadEnv();
