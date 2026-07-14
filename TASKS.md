# Clem — Tasks & Milestones

**Last updated:** 2026-07-14
**Current milestone:** M1 complete — awaiting approval to start M2

Every milestone ends with the project in a clean, working state and the docs updated.

---

## M0 — Architecture & Documentation ✅

- [x] Review proposed architecture, resolve weaknesses (streaming trap, shared types, error model, provider registry)
- [x] PROJECT.md, ARCHITECTURE.md, TASKS.md created

## M1 — Workspace & Backend Foundation ✅

- [x] Root `package.json` with npm workspaces (`shared`, `backend`; `frontend` joins in M3)
- [x] `shared` package: `Message`, `ChatRequest`, `ChatResponse`, `ErrorCode`, `ApiErrorBody`
- [x] Express app bootstrap with TypeScript, health route (`GET /api/health`)
- [x] Config module: env parsing with fail-fast validation (zod)
- [x] `AppError` + central error-handling middleware (incl. 404 + malformed-JSON handling)
- [x] Verified: 200 on `/api/health`; normalized error envelope on 404 and bad JSON

## M2 — Provider Layer & Chat Endpoint

- [ ] `AIProvider` interface + provider registry
- [ ] `AnthropicProvider` implementation (error normalization included)
- [ ] `ChatService` wiring registry → provider
- [ ] `POST /api/chat` with zod validation
- [ ] Verified end-to-end with a real API call

## M3 — Frontend Foundation

- [ ] Vite + React + TypeScript + Tailwind setup, `/api` dev proxy
- [ ] `lib/api.ts` client (single transport module)
- [ ] `useChat` hook: messages, send, pending, error states
- [ ] Minimal working chat (plain text) against the live backend

## M4 — Chat UI (product-design led)

- [ ] Chat layout & components per product owner's design direction
- [ ] Markdown rendering + syntax highlighting for assistant messages
- [ ] Loading states
- [ ] Error display (user-friendly, from normalized error codes)
- [ ] Responsive behavior (mobile → desktop)

## M5 — Polish & v0.1 Release

- [ ] Edge cases: empty input, long messages, provider outage, rate limit
- [ ] Motion/animation pass (Framer Motion, per design direction)
- [ ] README with setup instructions
- [ ] Final docs update; tag v0.1

---

## Backlog (future scope — do not start without approval)

Streaming responses · multiple providers · model switching · chat history + database · authentication · file uploads · image support · voice · themes · plugins · export · settings

---

## Changelog

- **2026-07-14** — M1 completed: workspace root, shared contract package, Express foundation with config validation and centralized error handling. Verified running.
- **2026-07-14** — M0 completed: architecture reviewed and documented.
