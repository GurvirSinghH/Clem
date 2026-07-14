import { Router } from "express";
import type { ChatResponse } from "@clem/shared";
import { AppError } from "../../errors/app-error.js";
import { chatService } from "../../services/chat.service.js";
import { chatRequestSchema } from "../schemas/chat.schema.js";

export const chatRouter = Router();

// Express 5 forwards rejected promises to the error middleware — no wrapper needed.
chatRouter.post("/", async (req, res) => {
  const parsed = chatRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    throw new AppError(
      "VALIDATION_ERROR",
      issue
        ? `${issue.path.join(".")}: ${issue.message}`
        : "Invalid request body.",
    );
  }

  const response: ChatResponse = await chatService.send(parsed.data);
  res.json(response);
});
