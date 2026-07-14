import { z } from "zod";

const messageSchema = z.object({
  id: z.string().min(1),
  role: z.enum(["user", "assistant"]),
  content: z
    .string()
    .min(1, "Message content cannot be empty")
    .max(50_000, "Message content is too long"),
  createdAt: z.string(),
});

export const chatRequestSchema = z
  .object({
    messages: z
      .array(messageSchema)
      .min(1, "At least one message is required"),
  })
  .refine((request) => request.messages[0]?.role === "user", {
    message: "The first message must be from the user",
    path: ["messages"],
  })
  .refine(
    (request) => request.messages[request.messages.length - 1]?.role === "user",
    {
      message: "The last message must be from the user",
      path: ["messages"],
    },
  );
