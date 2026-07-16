# Clem — Project Overview

Clem is a production-quality AI chat platform. It starts as a focused single-provider chatbot and evolves into a multi-model AI workspace without major rewrites.

**Status:** M4B.3 complete — editorial conversation rendering: assistant messages render markdown (headings, lists, blockquotes, inline/fenced code, GFM tables/task lists/strikethrough/autolinks) mapped to Clem's type scale, with a desaturated token-only code theme. Awaiting review before M5 (polish). Open items: `ANTHROPIC_API_KEY` for the Anthropic live happy path; rail mobile pattern approval.
**Last updated:** 2026-07-15

---

## Current Scope (v0.1)

- Chat interface (single conversation, in-memory on the client)
- One AI provider (Anthropic Claude, behind an abstraction)
- Responsive frontend
- Loading states
- Error handling (normalized, user-friendly)
- Markdown rendering with syntax highlighting

Nothing beyond this list is implemented in v0.1.

## Future Scope (designed for, not built)

Multiple providers · model switching · streaming · chat history · auth · database · file uploads · images · voice · themes · plugins · export · settings.

See [ARCHITECTURE.md](./ARCHITECTURE.md#future-feature-map) for how each maps onto an existing extension point.

---

## Tech Stack

| Area | Choices |
| --- | --- |
| Frontend | React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Markdown, React Syntax Highlighter, Lucide React |
| Backend | Node.js, Express, TypeScript, zod (runtime validation) |
| Shared | TypeScript types package (npm workspaces) |
| AI Providers | Anthropic Claude, Google Gemini (config-driven via `AI_PROVIDER` + `AI_MODEL`) |

## Repository Layout

```
Clem/
├── package.json      # npm workspaces root (frontend, backend, shared)
├── frontend/         # React SPA — knows nothing about AI providers
├── backend/          # Express API — owns keys, providers, business logic
├── shared/           # API contract types used by both sides
├── PROJECT.md        # This file — what and why
├── ARCHITECTURE.md   # How — layers, contracts, decisions
└── TASKS.md          # Milestones and progress
```

## Environment & Secrets

- All AI provider API keys live **backend-only**, loaded from `backend/.env` (gitignored). The frontend never sees a key.
- Key variables: `AI_PROVIDER` (default `anthropic`), `AI_MODEL` (explicit, must match the provider), `ANTHROPIC_API_KEY` / `GEMINI_API_KEY` (each required only for its provider), `AI_MAX_TOKENS` (default 16000), `PORT` (default 4000).

## Running Locally

```bash
npm install            # once, at the repo root
npm run build          # builds shared + backend + frontend
npm run dev:backend    # backend on http://localhost:4000 with hot reload (tsx watch)
npm run dev:frontend   # frontend on http://localhost:5173; /api proxied to :4000
npm run typecheck      # typecheck all workspaces
```

Backend config: copy `backend/.env.example` to `backend/.env` (defaults work for M1).

## Working Conventions

- Every commit leaves the project in a clean, working state.
- Frontend and backend run separately in dev; Vite proxies `/api` to Express (no CORS setup needed).
- Documentation (this file, ARCHITECTURE.md, TASKS.md) is updated at every milestone.

## Roles

- **Product owner / UI-UX designer:** features, layout, branding, animations, product direction.
- **Engineering (Claude):** architecture, implementation, technical decisions, documentation.
