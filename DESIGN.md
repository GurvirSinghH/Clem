# Clem Design System

Version: 1.0

This document defines the visual identity of Clem.

Claude must follow this document exactly.

Never invent a new design language.

If implementation conflicts with this document, ask before changing it.

---

# Design Philosophy

Clem is not another chatbot.

It is an intelligent workspace.

Every screen should feel calm, elegant and intentional.

The design should evoke curiosity rather than distraction.

Users should remember how Clem feels—not just how it looks.

The UI should feel premium enough that someone immediately recognizes it as its own product.

---

# Core Principles

Every element must have a reason.

Whitespace is a feature.

Motion communicates hierarchy.

Typography carries personality.

Less UI.
More content.

---

# Inspiration

Primary

- The Story of Tiresias
- Blendmode (Wix Studio)
- PostHog

Secondary

- Apple
- Arc Browser
- Linear
- Raycast
- Vercel

Never copy these products.

Extract principles.

Build something original.

---

# Brand Personality

Elegant

Curious

Editorial

Minimal

Confident

Human

Technical

Calm

---

# Visual Language

Think of the interface as an editorial magazine combined with a modern operating system.

Avoid looking like:

- ChatGPT
- Claude
- Gemini
- Discord
- Slack

---

# Layout

Large breathing room.

Generous spacing.

Strong visual hierarchy.

No crowded dashboards.

Every page should have one obvious focal point.

---

# Typography

Typography is the primary design element.

Use size before color.

Large headings.

Readable body text.

High contrast.

Comfortable line height.

Avoid decorative fonts.

Typography should feel timeless.

---

# Colors

Dark-first.

Mostly monochrome.

One accent color.

Accent should be used intentionally.

The background should never be completely flat.

Use subtle gradients.

Avoid loud neon colors.

---

# Background

Dark charcoal.

Very subtle animated gradients.

Very subtle texture.

Never distract from content.

Background movement should feel alive without being noticeable.

---

# Motion

Motion should feel physical.

Everything has weight.

Everything eases naturally.

Animations are smooth, slow and confident.

No flashy effects.

Avoid excessive bounce.

Prefer fades, transforms and opacity.

Motion should communicate state changes.

---

# Scroll

Scrolling should feel premium.

Sections transition naturally.

Use parallax only where it improves storytelling.

Never use motion for decoration alone.

---

# Buttons

Large click targets.

Minimal styling.

Elegant hover transitions.

Subtle elevation.

No glowing buttons.

No oversized gradients.

---

# Cards

Rounded.

Clean.

Soft shadows.

Never stack unnecessary cards.

Cards should organize information—not decorate it.

---

# Sidebar — Floating Navigation Rail (Approved)

A minimal floating navigation rail.

Its purpose is navigation without competing with the conversation.

Closer to Arc Browser than ChatGPT.

## Design

Floating vertical rail.

Detached from the window edges.

Rounded corners.

Premium spacing.

Lightweight appearance.

Collapsible.

Feels like part of the environment rather than a panel.

## v0.1 Contents

- Clem logo
- New Chat
- Settings

Nothing else.

Do not include conversation history.

Do not include folders.

Do not include model selection.

Those are future features — the rail must accommodate them later without redesign, but never show them now.

The conversation remains the visual focus at all times.

---

# Chat

The conversation is always the hero.

Messages have generous spacing.

Readable width.

Code blocks feel like a developer tool.

Markdown should look beautiful.

---

# Message Layout (Approved)

The assistant writes an article. The user sends input.

The asymmetry between the two is intentional — it is the core of Clem's visual identity.

## User Messages

Small, elegant rounded containers.

Right aligned.

Compact.

Minimal styling.

They should feel like user input rather than content.

## Assistant Messages

No chat bubbles.

Editorial layout.

Typography is the primary design element.

Comfortable reading width — approximately 65–75 characters.

Large whitespace between paragraphs.

Normal text remains container-free.

Code blocks, tables, blockquotes and other special content may use containers.

## Intent

The assistant should feel like it is writing an article, not sending chat bubbles.

This is the primary differentiator from ChatGPT, Claude, Gemini and other chat products.

---

# Composer (Approved)

The composer is the centerpiece of the application.

It should not resemble a traditional chat input.

It is a lightweight writing surface — closer to a notebook or writing canvas than a messaging application.

It should become one of Clem's defining visual elements.

## Design Principles

Floating card.

Detached from the bottom edge of the viewport.

Large comfortable writing area.

Multi-line by default.

Generous internal padding.

Rounded corners.

Minimal borders.

Premium whitespace.

Primary action always obvious.

## Structure

Top section:

- Writing area.

Bottom utility bar:

- Send button.
- Future actions (attachments, model selection, voice, etc.) — reserved space, not shown in v0.1.
- Actions aligned cleanly without visual clutter.

## Behavior

Expands naturally with longer input.

Never feels cramped.

Remains visually lightweight.

Prioritize writing comfort over compactness.

---

# Icons

Lucide React only.

Consistent sizing.

Minimal.

Never decorative.

---

# Micro Interactions

Every hover should communicate something.

Buttons

Sidebar

Cards

Messages

Everything should respond subtly.

Nothing should feel static.

---

# Empty State (Approved)

The first screen is the primary identity of Clem.

It should feel calm, editorial and intentional.

It communicates confidence through restraint.

## Contents

Before the first message, the interface contains only:

- The floating navigation rail
- Clem wordmark
- A contextual greeting (see below)
- The floating composer

The composer remains the visual anchor.

The rail is present from the very beginning.

The rail is part of Clem's identity — it never appears or disappears based on conversation state.

## Greeting

Instead of a fixed tagline, Clem greets the user based on their local time.

Examples:

Morning —
Good morning.
What are we creating today?

Afternoon —
Good afternoon.
What's worth exploring?

Evening —
Good evening.
Let's end the day with a good idea.

Rules:

- Keep greetings short.
- Never mention AI.
- Never mention chat.
- Never sound like a marketing slogan.
- The second line should encourage thinking or creating.
- Typography carries the emotion — no decorative graphics.

The greeting should feel calm, editorial and human.

It is part of Clem's identity.

## Never Display

- Suggested prompts
- Feature cards
- Quick actions
- Example conversations
- Empty chat illustrations
- Marketing content

## Approach

Rely on typography, whitespace and composition instead of additional UI.

Users should feel invited to write rather than overwhelmed with options.

---

# Loading States

Prefer skeletons.

Subtle shimmer.

Meaningful progress.

Never spinning loaders unless unavoidable.

---

# Responsiveness

Mobile first.

Tablet second.

Desktop third.

Nothing should feel like a scaled desktop application.

---

# Accessibility

High contrast.

Keyboard navigation.

Visible focus.

Readable typography.

Semantic HTML.

Animations respect prefers-reduced-motion.

---

# Engineering Rules

Animations use Framer Motion.

Design tokens are centralized.

No hardcoded colors.

No duplicated spacing values.

No duplicated animation timings.

Create reusable UI primitives.

---

# Design Goal

When someone opens Clem for the first time, they should think:

"This doesn't look like another AI chatbot."

It should feel like a beautifully crafted product that could stand beside the best modern software.

Motion Philosophy

Nothing should move without purpose.

Every animation must answer one question:

"What information is this communicating?"

Motion should:

guide attention

confirm interaction

show hierarchy

reduce cognitive load

Never animate merely because animation looks impressive.