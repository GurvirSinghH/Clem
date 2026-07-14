# Clem — Project Overview

Clem is a production-quality AI chat platform. It starts as a focused single-provider chatbot and evolves into a multi-model AI workspace without major rewrites.

**Status:** M1 complete — workspace, shared contract package, and backend foundation running. Next: M2 (provider layer + chat endpoint), pending approval.
**Last updated:** 2026-07-14

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
| AI Provider | Anthropic Claude (first implementation; config-driven) |

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
- Key variables: `ANTHROPIC_API_KEY`, `AI_PROVIDER` (e.g. `anthropic`), `AI_MODEL`, `PORT`.

## Running Locally

```bash
npm install            # once, at the repo root
npm run build          # builds shared + backend (tsc project references)
npm run dev:backend    # backend on http://localhost:4000 with hot reload (tsx watch)
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
