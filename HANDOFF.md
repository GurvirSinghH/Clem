# Clem — Project Handoff

## Project Overview

Clem is an editorial-first AI workspace.

The goal is not to recreate ChatGPT, Claude, or Gemini. Clem prioritizes calm reading, thoughtful writing, restrained motion, and timeless editorial design.

The architecture is provider-agnostic. The UI must never know which LLM generated a response.

---

# Current Status

Current milestone

✅ M2.5 Complete
✅ M4B.2 Complete

Next milestone

M4B.3 — Editorial Conversation Rendering

# Backend Status

Completed

- Provider abstraction (AIProvider)
- AnthropicProvider
- GeminiProvider
- Provider registry
- ChatService
- Shared API contract
- Error normalization
- Fail-fast environment validation
- Express 5 backend
- Zod validation
- Standard error middleware

Verified

- Anthropic boot validation
- Gemini boot validation
- Invalid provider keys normalize correctly
- Frontend unchanged after adding Gemini
- Provider switching is configuration-driven

Outstanding

- End-to-end Gemini happy-path verification using a real GEMINI_API_KEY
- End-to-end Anthropic verification using a real ANTHROPIC_API_KEY

---

# Frontend Status

Completed

- Design system
- Token system
- WorkspaceShell
- Navigation Rail
- Greeting
- Composer
- useChat integration
- Thinking indicator
- Error rendering
- Auto-scroll
- Message entrance animation
- Landing experience

Current Conversation Rendering

Temporary implementation exists only to verify request flow.

Real editorial conversation UI has not been built yet.

---

# Design Documents

Always treat these as the source of truth.

1. CLAUDE.md
2. PROJECT.md
3. ARCHITECTURE.md
4. DESIGN.md
5. TOKENS.md
6. TASKS.md

Never invent UI decisions that contradict these documents.

---

# Non-Negotiable Rules

## Architecture

- Preserve AIProvider abstraction.
- Preserve provider neutrality.
- Do not leak provider-specific behavior.
- Frontend must never depend on provider implementation.
- Shared API contract is stable.

## Design

- Follow DESIGN.md exactly.
- Follow TOKENS.md exactly.
- Never hardcode colors.
- Never hardcode spacing.
- Never hardcode typography.
- Never hardcode animation timings.
- Never bypass primitives.

## Motion

Motion communicates.

Motion never decorates.

Reduced motion must always be respected.

---

# Mobile

Approved pattern

Desktop
- Floating navigation rail

Tablet
- Floating navigation rail

Mobile
- Floating floating "C" button
- Slide-over panel
- Contains:
  - New Chat
  - Settings

Nothing else.

---

# Current UI Philosophy

Assistant messages

- Bubble-less
- Editorial
- Comfortable reading width
- Typography-first

User messages

- Small
- Right aligned
- Quiet containers

Composer

- Primary writing surface
- Visual anchor
- Floating
- Glass
- Borderless until focused

Greeting

- Empty-state only
- Disappears after first message

Rail

- Never changes with conversation state

---

# Next Milestone

M2.5 Verification

No implementation.

Verification only.

Tasks

- Configure GEMINI_API_KEY
- Verify complete happy path
- Verify Thinking indicator
- Verify normalized response
- Verify token usage
- Verify frontend unchanged
- Record results

After successful verification

Proceed to

M4B.3

Editorial Conversation Rendering

Focus

- Reading rhythm
- Typography
- Markdown
- Code blocks
- Lists
- Blockquotes
- Long conversation readability

Not new features.

---

# Known Decisions

- AI_MODEL is always explicit.
- Provider never infers model names.
- Markdown headings map onto Clem's editorial typography.
- Code blocks use a desaturated syntax theme.
- Conversation width remains fixed.
- Long code blocks scroll with the page.
- Reader owns scroll position.
- History never re-animates.
- No avatars.
- No repeated metadata.
- Champagne accent remains scarce.

---

# Development Philosophy

Prefer small milestones.

Prefer architectural consistency over speed.

Prefer reusable primitives over shortcuts.

Every change should make Clem feel more like a calm editorial workspace, never more like a conventional chatbot.

When uncertain, preserve consistency instead of introducing a new pattern.