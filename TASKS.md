# Clem — Tasks & Milestones

**Last updated:** 2026-07-15
**Current milestone:** M4B.3 complete (editorial conversation rendering — markdown mapped to Clem's type scale, desaturated code blocks) — awaiting review, then M5 (polish). Still open: `ANTHROPIC_API_KEY` for the Anthropic live happy path; rail mobile pattern approval

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

## M2.5 — Second Provider: Google Gemini (architecture validation)

- [x] `GeminiProvider` implements `AIProvider` via `@google/genai` (role mapping, usage metadata, all SDK errors normalized — nothing Gemini-typed escapes the folder)
- [x] Registry: one factory entry; config: `GEMINI_API_KEY` required only when `AI_PROVIDER=gemini`; `AI_MODEL` always explicit (never inferred)
- [x] Verified: fail-fast boot naming `GEMINI_API_KEY`; invalid key → normalized 502 `PROVIDER_ERROR`; frontend bundle hash byte-identical (zero frontend changes)
- [x] Valid-key happy path — **verified 2026-07-15**. Root cause of the prior 502: `AI_MODEL=gemini-2.5-flash` is retired for new API users (Gemini returned 404 `NOT_FOUND` — "no longer available to new users"), which normalized correctly to `PROVIDER_ERROR`/502. Fix was config-only: `AI_MODEL=gemini-3.5-flash` (current stable GA model, same `generateContent` call — provider code untouched). Verified live through the Vite `/api` proxy (real browser transport): 200 + normalized `ChatResponse`; frontend and shared contract byte-identical (zero changes); usage captured at the provider boundary (`ChatCompletionResult.usage`) but intentionally not surfaced by the v0.1 `ChatResponse` (Decision #4)

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

**M4B.3 — Editorial Conversation Rendering ✅ (awaiting review)**

- [x] Assistant messages render markdown via `react-markdown` + `remark-gfm`, mapped to Clem's editorial type scale (`Markdown` component; document heading levels → `type-h1/h2/h3`, h4–h6 clamp to `type-h3`; paragraph rhythm at `space-5`)
- [x] Full element coverage: headings, paragraphs, ordered/unordered lists, blockquotes, inline code, fenced code, GFM tables, task lists, strikethrough, autolinks
- [x] Code blocks (`CodeBlock` + `react-syntax-highlighter` `PrismAsync`): desaturated token-only theme (`codeTheme.ts`, near-monochrome ink, no accent, no rainbow), `Surface` container at `radius-md`, no height cap / no internal vertical scroll — full height, page scrolls; long lines scroll horizontally only (`overflow-x-auto`)
- [x] Prism languages code-split into an async chunk (kept out of the initial bundle)
- [x] Message philosophy preserved: user = compact right-aligned `Surface`; assistant = bubble-less editorial prose. Entrance animation (`motion-message-in`) unchanged — keyed wrappers, so only the newest message animates and history never re-animates on scroll. Auto-scroll and error rendering untouched. No avatars / timestamps / usernames / metadata
- [x] One token addition: `type-code-inline` utility encoding TOKENS.md's documented "inline code at 0.9em"
- [x] Verified: typecheck + production build pass; real Gemini response (HTTP 200) exercised every element incl. a 278-char single code line; the real `<Markdown>` component server-rendered maps all 20 element checks to the correct token-classed DOM; dev server serves and Vite transforms the new modules
- [ ] Responsive mobile behavior — still gated on rail mobile pattern approval (unchanged from M4B.2; desktop + tablet verified)

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

- **2026-07-15** — M4B.3 completed: editorial conversation rendering. Assistant messages now render markdown (`react-markdown` + `remark-gfm`) mapped to Clem's type scale via a new `Markdown` component; fenced code renders through `CodeBlock` (`react-syntax-highlighter` `PrismAsync`) with a token-only desaturated theme (`codeTheme.ts`) — near-monochrome, no accent, no rainbow, no height cap, horizontal-only overflow scroll. Change surface: three new frontend files + one `type-code-inline` token utility + the assistant renderer swap in `ChatPage`; backend, provider abstraction, API contract, `useChat`, motion choreography, and scroll behavior all untouched. Verified via real Gemini output (all elements incl. a 278-char code line), a server-render structural pass on the real component (20/20), typecheck, and production build.
- **2026-07-15** — M2.5 verification closed: Gemini live happy path confirmed end-to-end through the browser transport (Vite `/api` proxy → Express → provider → normalized `ChatResponse`, 200). Root cause of the earlier 502 was a retired model id (`gemini-2.5-flash`, 404 `NOT_FOUND` for new API users), diagnosed via temporary provider-only instrumentation and fixed config-only (`AI_MODEL=gemini-3.5-flash`, current stable GA). Provider/service/contract/frontend all unchanged; temporary instrumentation removed after diagnosis.
- **2026-07-15** — M2.5 completed: Google Gemini added as second provider. Change surface: one provider folder, one registry entry, one env-validation branch, one dependency — frontend/contract/service untouched, validating the provider abstraction.
- **2026-07-14** — M1 completed: workspace root, shared contract package, Express foundation with config validation and centralized error handling. Verified running.
- **2026-07-14** — M0 completed: architecture reviewed and documented.
