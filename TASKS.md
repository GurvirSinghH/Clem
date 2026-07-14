# Clem — Tasks & Milestones

**Last updated:** 2026-07-14
**Current milestone:** M4B.2 complete (composer wired to backend) — awaiting review, then M4B.3 (conversation UI). Still open: `ANTHROPIC_API_KEY` for the live happy path; rail mobile pattern approval

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

- [x] `AIProvider` interface + provider registry (lazy singleton, config-selected)
- [x] `AnthropicProvider` implementation (SDK errors normalized to `AppError`; refusal + empty-response handled)
- [x] `ChatService` wiring registry → provider
- [x] `POST /api/chat` with zod validation (role-order rules enforced)
- [x] Verified: fail-fast boot without key; 400 `VALIDATION_ERROR` envelopes; invalid key → 502 `PROVIDER_ERROR` (normalized, no SDK leak)
- [ ] Verified end-to-end with a real API call — **blocked on `ANTHROPIC_API_KEY` in `backend/.env`**

## M3 — Frontend Foundation (initialization complete; no UI by product-owner direction)

- [x] Vite + React + TypeScript + Tailwind setup, `/api` dev proxy, added to npm workspaces
- [x] `lib/api.ts` client (single transport module; error envelope → typed `ApiError`)
- [x] `useChat` hook: messages, send, isSending, error states
- [x] Verified: typecheck + production build pass; dev server serves the app shell
- [ ] Minimal working chat against the live backend — deferred; `App.tsx` is a deliberate unstyled placeholder until the product owner provides UI direction

## M4 — Chat UI (product-design led)

### M4A — Design System Foundation ✅

- [x] Design token integration: TOKENS.md → `styles/tokens.css` (Tailwind `@theme`; defaults wiped so only semantic tokens exist)
- [x] Theme variables: colors, typography utilities (`type-*`), spacing (10-step scale only), radius, shadows, motion, blur, layering, layout widths
- [x] Typography via semantic HTML + token classes (Text component rejected — justified vs DESIGN.md's semantic-HTML rule and M4B markdown rendering)
- [x] Primitives: `Surface`, `Button`, `IconButton`, `Container`, `NavRail`, `Composer` (structure only), `WorkspaceShell` (renamed from AppShell) + ambient background
- [x] Motion presets in `lib/motion.ts` (Framer) + `motion-hover`/`motion-interactive` CSS utilities; reduced-motion honored globally
- [x] Self-hosted fonts (Newsreader, Instrument Sans, JetBrains Mono via Fontsource)
- [x] Verified: typecheck + build pass; token utilities confirmed in compiled CSS; dev server serves the temporary primitive gallery
- [x] Remove primitive gallery (replaced by the landing experience in M4B.1)

### M4B — Chat Page

**M4B.1 — Landing Experience ✅ (awaiting product-owner review)**

- [x] `ChatPage` composition on `WorkspaceShell` (existing primitives only, no new patterns)
- [x] Floating navigation rail: serif "C" wordmark (type-display brand moment), New Chat (active), Settings (inert — future scope)
- [x] Editorial greeting: time-contextual copy per DESIGN.md (cutoffs 5/12/18), serif display + quiet second line, scene-level entrance
- [x] Empty-state composition: greeting as single focal point, composer as visual anchor, density-relaxed
- [x] Composer connected visually (draft state, auto-grow, send disabled when empty; no chat logic)
- [x] Responsive desktop + tablet (tablet uses symmetric `space-10` padding to clear the rail); mobile deferred pending rail pattern approval
- [x] Verified: typecheck + build pass; dev server serves the landing

**M4B.2 — Composer Wiring ✅ (awaiting review)**

- [x] Composer standard 2px focus indicator restored (system rule, no component exception)
- [x] Composer wired to `useChat`: send on click or Enter (Shift+Enter = newline, IME-safe), cleared immediately on send
- [x] Responses render in an INTERIM conversation view (token-styled plain text per approved layout: user right-compact containers, assistant container-free prose) — replaced by real message components in M4B.3
- [x] Loading state: `ThinkingIndicator` (breathing text per motion-thinking; `role="status"`; static under reduced motion)
- [x] Errors from the normalized envelope render in-flow (`role="alert"`, error token)
- [x] Auto-scroll to newest message (respects reduced motion)
- [x] Verified: build passes; full path proven live (vite proxy → Express → provider → normalized error envelope rendered by the UI path). Happy path still blocked on `ANTHROPIC_API_KEY`

**M4B.3 — Conversation UI (pending)**

- [ ] Real message components per approved message-layout direction (rail mobile pattern needs approval)
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
