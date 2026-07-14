# Clem — Architecture

**Last updated:** 2026-07-14 (M1 — workspace, shared contract, and backend foundation implemented)

## Principles

1. **The frontend never knows which provider is being used.** It talks to `/api/*` and renders normalized data. Provider names, SDKs, and error formats stop at the backend.
2. **Provider-specific logic lives only inside provider implementations.** Everything above the `AIProvider` interface is provider-agnostic.
3. **Future features are additive.** New providers, streaming, and persistence plug into existing seams instead of forcing rewrites.
4. **Stateless API.** The client sends the full message history with each request. No server-side session state in v0.1 — persistence becomes an additive repository layer later.

---

## System Overview

```
┌─────────────────────────────────────────────┐
│ Frontend (React SPA)                        │
│  components → hooks (useChat) → lib/api     │  ← all transport in one module
└──────────────────┬──────────────────────────┘
                   │ POST /api/chat  (JSON, shared contract types)
┌──────────────────▼──────────────────────────┐
│ Backend (Express)                           │
│  api/ routes + zod validation + middleware  │
│        │                                    │
│  services/ ChatService                      │  ← assembly, provider selection,
│        │                                    │    error normalization
│  providers/ AIProvider interface + registry │
│        │                                    │
│  providers/anthropic/ AnthropicProvider     │  ← only place Anthropic SDK appears
└─────────────────────────────────────────────┘
```

## Workspace Layout

Items marked *(M2)* / *(M3)* are designed but not yet implemented. The root `workspaces` array currently lists only `shared` and `backend`; `frontend` is added in M3 (npm errors on a listed workspace that has no `package.json` yet).

```
Clem/
├── package.json                # workspaces: ["shared", "backend"] (+ "frontend" in M3)
├── tsconfig.base.json          # shared compiler options; packages extend it
├── shared/
│   └── src/
│       ├── chat.ts             # Message, Role, ChatRequest, ChatResponse
│       └── errors.ts           # ErrorCode, ApiErrorBody
├── backend/
│   └── src/
│       ├── index.ts            # bootstrap only (load config, listen)
│       ├── app.ts              # createApp() — wires middleware + routes; testable without listening
│       ├── config/             # env parsing + validation (fail fast at boot)
│       ├── api/
│       │   ├── routes/         # health.routes.ts, chat.routes.ts (M2)
│       │   └── middleware/     # error handler, 404 handler, request validation (M2)
│       ├── services/           # chat.service.ts (M2)
│       ├── providers/          # (M2)
│       │   ├── types.ts        # AIProvider interface, provider-level types
│       │   ├── registry.ts     # id → provider factory, selected via config
│       │   └── anthropic/      # first implementation
│       └── errors/             # AppError class (maps ErrorCode → HTTP status)
└── frontend/                   # (M3)
    └── src/
        ├── components/         # chat/, layout/, ui/ (owned by product design)
        ├── hooks/              # useChat — all chat state lives here
        ├── lib/                # api.ts — the ONLY module that touches fetch
        └── types/              # re-exports from shared
```

Build: TypeScript project references — `backend` references `shared`, so `tsc -b` in the backend builds both in order. `@clem/shared` is consumed through its built `dist/` via the workspace symlink.

---

## Key Contracts

### API contract (`shared`)

```ts
type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: string; // ISO 8601
}

interface ChatRequest  { messages: Message[]; }        // full history (stateless)
interface ChatResponse { message: Message; }

interface ApiErrorBody {
  error: { code: ErrorCode; message: string };          // safe for direct display
}
```

### Provider interface (`backend/src/providers/types.ts`)

```ts
interface AIProvider {
  readonly id: string;                                  // "anthropic", "openai", ...
  chat(request: ProviderChatRequest): Promise<ChatCompletionResult>;
  // Future, additive — NOT implemented in v0.1:
  // chatStream(request: ProviderChatRequest): AsyncIterable<ChatChunk>;
}

interface ProviderChatRequest { messages: Message[]; model: string; }
interface ChatCompletionResult { message: Message; usage?: TokenUsage; }
```

`chat()` returns a structured result (not a bare string) so streaming, token usage, and metadata can be added without changing existing call sites.

### Error model

Provider/SDK errors are caught inside the provider implementation and re-thrown as `AppError` with a normalized code. The frontend only ever sees these codes:

| Code | HTTP | Meaning |
| --- | --- | --- |
| `VALIDATION_ERROR` | 400 | Request failed zod validation, or body is malformed JSON |
| `NOT_FOUND` | 404 | Unknown route or resource |
| `PROVIDER_RATE_LIMIT` | 429 | Upstream rate limit (any provider) |
| `PROVIDER_UNAVAILABLE` | 502 | Upstream down / timeout |
| `PROVIDER_ERROR` | 502 | Other upstream failure |
| `INTERNAL_ERROR` | 500 | Anything unexpected (details logged, never leaked) |

A single Express error-handling middleware converts `AppError` → `ApiErrorBody`. Routes and services never format HTTP error responses themselves.

---

## Frontend Rules

- **State:** all chat state (messages, pending flag, error) lives in the `useChat` hook. Components are presentational. If state grows complex later, the hook migrates to a store without touching components.
- **Transport:** `lib/api.ts` is the only file using `fetch`. Swapping to SSE/streaming later is a one-module change plus a hook update.
- **Rendering:** assistant messages render through React Markdown with React Syntax Highlighter for code blocks.
- UI composition, styling, and motion are product-design decisions — engineering does not redesign them.

## Backend Rules

- Routes: parse/validate (zod) → call service → return typed response. No business logic.
- `ChatService`: selects provider from the registry (config-driven), invokes it, normalizes results. This is where history persistence and model routing will land later.
- Config is parsed and validated once at boot; the process fails fast on missing env vars rather than failing on the first request.

---

## Decision Log

| # | Decision | Rationale | Alternative rejected |
| --- | --- | --- | --- |
| 1 | npm workspaces with a `shared` types package | Single source of truth for the API contract; prevents frontend/backend drift | Duplicated types — silent drift once the contract grows |
| 2 | Stateless chat API (client sends full history) | No premature DB; persistence becomes an additive repository layer | Server-side sessions — creates state to migrate later |
| 3 | Provider registry + config selection from day one | ~20 lines now; makes provider #2 a pure addition; the core abstraction of the product | Hard-wired single provider — requires surgery for multi-provider |
| 4 | Structured `ChatCompletionResult` (not `Promise<string>`) | Streaming/usage/metadata become additive | Bare string return — streaming would ripple through every layer |
| 5 | Normalized `ErrorCode` taxonomy at the provider boundary | Frontend stays provider-agnostic even for failures | Passing provider errors through — leaks provider identity and internals |
| 6 | zod at the API boundary | Runtime validation + inferred static types from one schema | Hand-rolled validation — verbose, drifts from types |
| 7 | Anthropic Claude as first provider | Config-driven; swappable via `AI_PROVIDER` env | n/a — arbitrary starting point by design |

## Future Feature Map

| Future feature | Extension point (already designed) |
| --- | --- |
| Multiple providers | New folder under `providers/` + one registry entry |
| Model switching | `model` param in `ChatRequest`; service passes through |
| Streaming | Additive `chatStream()` on `AIProvider`; SSE route; `lib/api.ts` update |
| Chat history / database | Repository layer inside `ChatService`; API gains chat ids |
| Authentication | Express middleware in `api/middleware/`; user id flows into service |
| Settings / themes / export | Frontend-side; state already isolated in hooks |
| File uploads / images | `Message.content` evolves to a content-block union in `shared` |
