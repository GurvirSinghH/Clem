import express from "express";
import { chatRouter } from "./api/routes/chat.routes.js";
import { healthRouter } from "./api/routes/health.routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./api/middleware/error-handler.js";

export function createApp(): express.Express {
  const app = express();

  app.use(express.json({ limit: "1mb" }));

  app.use("/api/health", healthRouter);
  app.use("/api/chat", chatRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
