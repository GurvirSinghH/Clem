export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
  /** ISO 8601 timestamp. */
  createdAt: string;
}

/** The client sends the full conversation each request — the API is stateless. */
export interface ChatRequest {
  messages: Message[];
}

export interface ChatResponse {
  message: Message;
}
