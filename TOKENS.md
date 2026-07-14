# Clem Design Tokens

Version: 1.1 (approved)

This document defines every design value used in Clem.

It exists to serve [DESIGN.md](./DESIGN.md). Where DESIGN.md defines the *feeling*, this document defines the *numbers* that produce it. If a value here ever fights the feeling, DESIGN.md wins and this file gets corrected.

Rules that govern this entire document:

- Tokens are the only source of visual values. Components never contain raw colors, sizes, or timings.
- Every token is semantic. Tokens describe **role**, never appearance (see Naming Rules).
- Every token has a reason. A value with no explanation gets deleted.

---

# Color System

## Philosophy

Clem is dark-first and mostly monochrome. Hierarchy comes from typography and light, not from color. The palette is therefore small on purpose: a charcoal environment, a warm off-white for reading, and exactly one accent used sparingly enough that it always means something.

The neutrals are **warm** (slightly toward yellow, never blue). Blue-grays read as "software"; warm grays read as paper and ink — the editorial identity. This warmth is subtle but is what makes Clem feel human rather than like a terminal.

## Environment

| Token | Value | Why it exists |
| --- | --- | --- |
| `background` | `#0F0F10` | The charcoal stage everything sits on. Near-black but not black — pure `#000` is harsh and makes elevation impossible. |
| `background-lift` | `#17171A` | The lighter pole of the background's subtle gradient. The background is never flat (DESIGN.md); this token bounds how light it may get, which is also the surface all text contrast is measured against. |
| `surface` | `#17171A` | Resting containers: user message containers, code blocks, rail body. One step of light above the stage. |
| `surface-elevated` | `#1E1E22` | Raised containers: the composer, dropdowns, anything floating. On dark UI, elevation is communicated by lighter surfaces, not bigger shadows. |
| `surface-overlay` | `#26262B` | The highest surface tier: modals, menus. Three light steps is the maximum — more tiers than that and elevation stops being legible. |

## Text

| Token | Value | Contrast vs `background-lift` | Why it exists |
| --- | --- | --- | --- |
| `text-primary` | `#F2F1EE` | ≥ 14:1 | All reading content — assistant prose, headings, input text. Warm off-white, not pure white: gentler over long reading sessions, and the warmth is the brand. |
| `text-secondary` | `#A9A7A0` | ≥ 7:1 | Supporting content: user message text, labels, the greeting's second line. One clear step down in the hierarchy while remaining comfortably readable. |
| `text-muted` | `#7C7A72` | ≥ 4.5:1 | Tertiary information: timestamps, placeholders, captions. This is the floor — nothing readable is ever dimmer than this token. |

## Structure

| Token | Value | Why it exists |
| --- | --- | --- |
| `border` | `rgba(255, 255, 255, 0.08)` | Hairline definition where a surface step alone isn't enough. Alpha-based so it works on every surface tier. DESIGN.md says minimal borders — this is deliberately near-invisible. |
| `border-strong` | `rgba(255, 255, 255, 0.14)` | Interactive boundaries (composer at rest, hovered cards). Still quiet; borders never carry hierarchy in Clem. |

## Accent

| Token | Value | Why it exists |
| --- | --- | --- |
| `accent` | `#D9C29A` | The one accent: a soft champagne gold. Luxurious, understated, timeless — deliberately desaturated so it never reads as orange, neon, or saturated gold. Editorial ink-and-gold, calm on charcoal, and unclaimed by competitors (ChatGPT teal, Claude terracotta-on-cream, Gemini blue, Linear indigo, Arc pink). Passes ≥ 4.5:1 as text on all surface tiers with generous margin. |
| `accent-hover` | `#E6D4B2` | Hover state of accent elements. Brightening (not darkening) reads as illumination on dark UI. |
| `accent-pressed` | `#C1A97E` | Pressed state — the interaction has weight (DESIGN.md motion philosophy applied to color). |
| `on-accent` | `#141414` | Text/icons sitting on an accent fill. Dark-on-champagne passes ≥ 9:1; white-on-champagne would fail. |

**Accent usage allowlist** — the accent appears only as: the primary action (send), focus indication, active navigation state, and links inside assistant prose. Anything else must be argued for in this file first. This is what "used intentionally" means in practice.

## Feedback

Desaturated so system feedback never shouts over content. Each passes ≥ 4.5:1 as text on `background`.

| Token | Value | Why it exists |
| --- | --- | --- |
| `success` | `#8FBF95` | Sage green — confirmations. |
| `warning` | `#D9B36A` | Muted gold — cautions. Deliberately adjacent to the accent family so the palette stays coherent. |
| `error` | `#E08573` | Soft terracotta-red — error messages from the normalized error envelope. Calm even when things fail; a chat error is an inconvenience, not an emergency. |
| `focus` | `accent` (alias) | Focus indication is accent-colored. An alias, not a copy — if the accent ever changes, focus follows automatically. |

---

# Typography

## Philosophy

Typography is Clem's primary design element. The system is built on a deliberate asymmetry: **the serif is reserved exclusively for identity moments; everything else — including the entire conversation — is sans.** The serif's emotional impact comes precisely from its scarcity; conversations stay highly readable because they never carry it.

## Families

| Token | Family | Fallbacks | Role |
| --- | --- | --- | --- |
| `font-editorial` | Newsreader | Georgia, serif | Identity moments ONLY: the landing greeting, hero headings, brand moments (wordmark). Never conversation text. A text serif designed for on-screen editorial reading — timeless without being decorative. |
| `font-ui` | Instrument Sans | system-ui, sans-serif | Everything else: all assistant conversation text (body *and* headings), user messages, buttons, labels, the composer. A quiet grotesque with enough character to not feel generic. |
| `font-mono` | JetBrains Mono | ui-monospace, monospace | Code blocks and inline code. Chosen because DESIGN.md wants code to "feel like a developer tool" — this is the type developers already trust. |

The entire conversation — body text *and* headings — is set in the sans: Clem's articles are frequently technical, and a grotesque holds up better around code, tables, and dense reasoning. The serif appears only at the moments that define the product's identity — the landing greeting, hero headings, brand moments — which keeps conversations highly readable while preserving the serif's emotional impact. All three families are open-source (no licensing risk) and self-hosted (no FOUT from third-party CDNs).

## Scale

A restrained scale — few sizes, large jumps, because DESIGN.md says "use size before color."

| Token | Size / Line height | Family | Used for |
| --- | --- | --- | --- |
| `text-display` | 40px / 1.15 | editorial | The greeting, hero headings, brand moments. The largest voice in the product — and the serif's only home. |
| `text-h1` | 30px / 1.2 | ui (semibold) | Top-level headings in assistant prose. |
| `text-h2` | 24px / 1.25 | ui (semibold) | Second-level prose headings. |
| `text-h3` | 19px / 1.35 | ui (semibold) | Minor headings. |
| `text-body` | 16px / 1.7 | ui | Assistant prose. The 1.7 line height is the "comfortable line height" of DESIGN.md made concrete — article leading, not chat-app leading. |
| `text-compact` | 15px / 1.5 | ui | User messages and UI copy. Slightly smaller and tighter than prose — user messages are input, not content. |
| `text-small` | 13px / 1.45 | ui | Labels, utility bar items. |
| `text-caption` | 12px / 1.4 | ui | Timestamps, metadata. Never used for content. |
| `text-code` | 13.5px / 1.6 | mono | Code blocks; inline code matches surrounding text at `0.9em`. |

## Weights

| Token | Value | Why |
| --- | --- | --- |
| `weight-regular` | 400 | Default for all reading text. |
| `weight-medium` | 500 | Emphasis within UI, user messages, button labels. |
| `weight-semibold` | 600 | Headings. The heaviest weight in the product — 700+ shouts, and Clem is confident, not loud. |

## Letter Spacing

| Token | Value | Applied to |
| --- | --- | --- |
| `tracking-display` | −0.015em | Serif display sizes; large serifs need slight tightening to feel set rather than typed. |
| `tracking-normal` | 0 | All body and UI text. |
| `tracking-wide` | +0.06em | Caption-size uppercase labels only; small caps need air to stay legible. |

---

# Spacing Scale

One geometric-ish scale; no in-between values, ever. Generosity lives at the top of the scale — DESIGN.md's "whitespace is a feature" means the big steps get used often, not that new sizes get invented.

| Token | Value | Used for |
| --- | --- | --- |
| `space-1` | 4px | Icon-to-label gaps, the tightest internal pairings. |
| `space-2` | 8px | Gaps within a control (button padding vertical, rail icon padding). |
| `space-3` | 12px | Internal padding of compact containers (user message containers). |
| `space-4` | 16px | Default component padding; container padding on mobile. |
| `space-5` | 24px | Paragraph spacing in assistant prose; composer internal padding. Reading rhythm starts here. |
| `space-6` | 32px | Gap between consecutive messages — the "generous spacing" of the conversation. |
| `space-7` | 40px | Gap between conversation turns (user → assistant); larger than intra-message spacing so turns read as sections. |
| `space-8` | 48px | Major layout insets on desktop; rail detachment zones. |
| `space-9` | 64px | Section-level breathing room; space around the empty-state composition. |
| `space-10` | 96px | The grandest gestures: empty-state vertical rhythm on desktop. Rare by design. |

Rule of thumb: within a component use 1–4, between content use 5–7, between regions use 8–10.

---

# Density

Density is the semantic layer above the spacing scale: it names *how generous a region is allowed to be*, so spacing decisions are made once per region instead of once per element. Every part of the interface belongs to exactly one density level.

| Token | Spacing band | Applies to | Why |
| --- | --- | --- | --- |
| `density-relaxed` | `space-8` – `space-10` dominant | Landing page, hero sections, empty states | Identity moments earn the grandest whitespace. This is where "whitespace is a feature" is most visible — restraint communicates confidence before a single word is read. |
| `density-comfortable` | `space-5` – `space-7` dominant | Conversation, reading, forms | The working surface. Generous enough to feel editorial, dense enough that a long conversation or form remains efficient to scan. This is Clem's default density. |
| `density-compact` | `space-1` – `space-4` dominant | Navigation rail, utility controls, future settings panels | Chrome and controls. Tight spacing keeps supporting UI visually small so it never competes with content — "less UI, more content" made spatial. |

Usage rules:

- A region's density sets which end of the spacing scale its elements draw from; it never invents new values.
- Density decreases with distance from content: what the user reads is comfortable, where the user arrives is relaxed, what merely supports is compact.
- Touch-target minimums (see Accessibility) override density — a compact control may look small but never *hits* small.

---

# Border Radius

| Token | Value | Used for |
| --- | --- | --- |
| `radius-sm` | 8px | Small controls: buttons, inline code, badges. |
| `radius-md` | 12px | User message containers, code blocks, contained prose content. Round enough to be soft, square enough to stay editorial. |
| `radius-lg` | 16px | The composer and the navigation rail — the two floating identity elements share one radius so they read as siblings. |
| `radius-full` | 9999px | Pills and circular icon buttons only. |

Four steps only. Radius is texture, not hierarchy — if two radii appear side by side and look accidental, the smaller element inherits the larger element's radius.

---

# Shadows

On charcoal, heavy shadows are invisible and large glows look cheap. Elevation in Clem is carried **primarily by surface lightening** (see Color → Environment) and shadows exist only to separate floating elements from the content that scrolls beneath them.

| Token | Value | Paired surface | Used for |
| --- | --- | --- | --- |
| `shadow-none` | none | `surface` | Resting containers. In-flow content (user messages, code blocks) never casts shadows. |
| `shadow-float` | `0 4px 24px rgba(0, 0, 0, 0.35)` | `surface-elevated` | The composer and the rail — soft, wide, low-opacity; felt more than seen. |
| `shadow-overlay` | `0 12px 48px rgba(0, 0, 0, 0.5)` | `surface-overlay` | Modals and menus — the only emphatic depth in the product, because these genuinely sit above everything. |

Shadows are never animated (paint-heavy, janks the message list). A hover that needs "lift" animates transform and swaps surface tier instead.

---

# Motion

## Philosophy made concrete

DESIGN.md demands motion that is "smooth, slow and confident" yet never distracting. Those reconcile as **two speed tiers**:

- **Functional motion is fast.** Anything in the high-frequency loop (hover, press, message appearance) completes quickly — confidence at frequency means economy, and the backend already has real latency we must not add to.
- **Scene motion may be slow.** Infrequent, screen-level events (empty state entrance, view transitions) can take their time — this is where "slow and confident" lives.

**Ambient exception:** the animated background is the *one* sanctioned decorative motion — its purpose is atmosphere (DESIGN.md → Background). It must stay below conscious notice, pause when the tab is hidden, and disappear entirely under reduced motion.

## Durations

| Token | Value | Tier | Used for |
| --- | --- | --- | --- |
| `duration-instant` | 100ms | functional | Press feedback, toggles — must feel simultaneous with the click. |
| `duration-fast` | 180ms | functional | Hover transitions, focus rings, icon changes. |
| `duration-base` | 240ms | functional | Message appearance, composer expansion, small reveals. |
| `duration-slow` | 400ms | scene | Empty-state entrance, rail collapse/expand, view-level transitions. |
| `duration-ambient` | 30s+ | ambient | Background gradient drift. Deliberately geological. |

## Easing

| Token | Value | Used for |
| --- | --- | --- |
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default for everything — fast start, long confident settle. This curve *is* the "weight" DESIGN.md asks for. |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving; departures accelerate away and never linger. |
| `ease-ambient` | `linear` (long-period alternation) | Background drift only; anything curved becomes noticeable at 30s. |

No bounce or spring presets in v0.1 — DESIGN.md says avoid excessive bounce, and the cleanest enforcement is owning none.

## Named choreography

| Token | Definition | Why |
| --- | --- | --- |
| `motion-hover` | `duration-fast` + `ease-standard`, color/opacity only | Every interactive element responds identically — coherence is what makes motion feel designed. |
| `motion-press` | `duration-instant`, scale 0.98 | Weight: things compress slightly under the pointer. |
| `motion-message-in` | `duration-base` + `ease-standard`, opacity 0→1 with 8px rise | New messages settle into place like type onto a page. Applies only to the newly arrived message — never replays on the existing list. |
| `motion-scene` | `duration-slow` + `ease-standard`, opacity + ≤16px translate | Screen-level entrances (greeting, view changes). |
| `motion-thinking` | `duration-ambient`-family gentle opacity pulse | The waiting-for-assistant indicator: calm breathing, not spinning. |

All motion animates **transform and opacity only.** Blur, shadow, and layout properties never animate.

---

# Motion Hierarchy

Durations say how long motion takes; hierarchy says how much attention it may claim. The levels are ordered by **proximity to user intent** — Level 1 is a direct answer to the user's hand, Level 5 is pure atmosphere.

| Level | Motion | Purpose |
| --- | --- | --- |
| 1 | Hover | Immediate feedback: "this responds to you." The most intimate motion in the product — it must feel instantaneous and personal. |
| 2 | Click / Focus | Confirmation: "your action registered." Slightly more visible than hover because it acknowledges a commitment, not an exploration. |
| 3 | Message appearance | Content arrival: "something new is here to read." Guides the eye to the newest content without disturbing what's already being read. |
| 4 | Page transitions | Context change: "you are somewhere else now." The largest legitimate motion — it may briefly own the screen because the whole screen is changing. |
| 5 | Ambient background | Atmosphere: "this place is alive." Communicates nothing and demands nothing; it exists below conscious attention. |

**The governing rule: a higher level must never visually overpower a lower one.** The ambient background (5) must never draw the eye from an arriving message (3); a page transition (4) must never delay or mask hover feedback (1). When two motions coincide, the lower level wins the user's attention — because the lower the level, the closer it sits to what the user is actually doing.

Practical consequences:

- Levels 1–2 are never queued or delayed behind levels 3–5.
- Level 5 runs at intensities that fail the "did you notice it?" test — if a user can describe the background's movement, it is too strong.
- Under reduced motion, levels collapse from the top: 5 disappears first, then 4 and 3 simplify to opacity, while 1–2 remain (as near-instant state changes) because they carry functional feedback.

---

# Blur

| Token | Value | Used for |
| --- | --- | --- |
| `blur-glass` | 20px (backdrop) | The floating rail and composer over scrolling content — the "part of the environment" quality from DESIGN.md. Applied to at most two elements per screen; backdrop blur is expensive. |
| `blur-ambient` | 90px | The background gradient shapes — blurred past recognition into pure atmosphere, which also prevents banding on dark gradients. |

Two values only. If a third blur is ever needed, the design is probably overbuilt.

---

# Layering

| Token | Value | Layer |
| --- | --- | --- |
| `z-base` | 0 | Conversation and page content. |
| `z-ambient` | −1 | The background gradient layer — beneath everything, always. |
| `z-rail` | 10 | The floating navigation rail. |
| `z-composer` | 20 | The composer — above the rail because it is the centerpiece and content scrolls beneath it. |
| `z-overlay` | 30 | Dropdowns, popovers. |
| `z-modal` | 40 | Modal dialogs. |
| `z-toast` | 50 | Transient notifications — above everything, including modals. |

Steps of 10, six layers. An element that doesn't fit one of these layers doesn't get a new z-index; it gets a design conversation.

---

# Layout

| Token | Value | Why |
| --- | --- | --- |
| `width-reading` | 680px | Assistant prose column ≈ 68ch at `text-body` — the 65–75 character measure DESIGN.md specifies, made pixel-concrete. |
| `width-content` | 768px | Maximum width of the conversation region (user messages align to its right edge; special content like wide tables may use it fully). |
| `width-composer` | 680px | The composer matches the reading column — you write where you read. |
| `width-rail` | 64px | Collapsed icon rail (expanded width is a v-next decision; nothing in v0.1 needs expansion). |
| `height-composer-max` | 40vh | The composer grows with input up to 40% of the viewport, then scrolls internally — writing comfort without ever pushing the conversation off-screen. *(Added v1.1.1 via the Approved Baseline process, pre-flagged in the M4A plan.)* |
| `inset-rail` | `space-4` / `space-6` | The rail's detachment from window edges (mobile / desktop) — the gap **is** the floating identity. |
| `inset-composer` | `space-4` / `space-6` | The composer's detachment from the bottom edge (mobile / desktop). |
| `padding-container` | `space-4` / `space-5` / `space-6` | Horizontal page padding at mobile / tablet / desktop. |

## Responsive behavior

Breakpoints: `sm` 640px · `md` 768px · `lg` 1024px.

- **Mobile (< 640):** single column; the rail condenses to a floating compact form (final mobile pattern to be approved before build); composer spans full width minus insets; all reading widths yield to viewport.
- **Tablet (640–1024):** reading column becomes fixed-width and centered; rail floats at full identity.
- **Desktop (> 1024):** the composition breathes — content column centered, generous side whitespace is intentional and makes the ambient background load-bearing (see Accessibility → contrast).

Nothing is a scaled-down desktop layout: at each breakpoint the floating elements re-anchor rather than shrink.

---

# Accessibility

These are requirements, not aspirations. They override aesthetic preferences wherever the two collide.

## Contrast goals

- `text-primary` ≥ 7:1 (AAA) — long-form reading earns the strictest target.
- `text-secondary` ≥ 4.5:1 (AA), achieved at ≥ 7:1 by current values.
- `text-muted` ≥ 4.5:1 (AA) — the absolute floor for anything readable.
- Interactive boundaries and icons ≥ 3:1 against their surface.
- **All contrast is measured against `background-lift`** — the lightest point the animated gradient can reach — never against the base background. The gradient may not exceed this token precisely so that contrast guarantees survive the animation.

## Focus behavior

- Every interactive element shows a visible focus indicator: 2px `focus` ring, 2px offset.
- The focus ring is exempt from "minimal borders" — visibility beats minimalism, always.
- Focus is never removed, only styled. `:focus-visible` distinguishes keyboard from pointer.
- Anything communicated on hover must also be available on keyboard focus and on touch.

## Reduced motion

Under `prefers-reduced-motion`:

- The ambient background becomes a static gradient (`duration-ambient` → 0).
- Skeleton shimmer becomes a static placeholder tone.
- All functional/scene motion collapses to opacity-only at `duration-instant`.
- The thinking indicator communicates by text/static presence, not pulse.

## Touch targets

- Minimum interactive size 44×44px — rail icons, send button, all message utilities.
- Visual size may be smaller; the hit area may not.

## Chat semantics

- New assistant messages are announced via a polite live region.
- The conversation is a semantic log; the composer is a labelled form. Structure is part of the design system because "semantic HTML" (DESIGN.md) is a design decision, not an implementation detail.

---

# Naming Rules

All tokens are semantic: they name the **role**, never the appearance.

| Good | Bad | Why |
| --- | --- | --- |
| `surface-elevated` | `gray-800` | The value can change (light theme is future scope); the role cannot. |
| `text-primary` | `white` | Dark-first today, theme-ready tomorrow — appearance names would all become lies. |
| `accent` | `amber-400` | If the brand accent changes, one token changes and zero component code. |
| `duration-fast` | `duration-180` | Encoding the value in the name defeats centralization. |

Additional rules:

- Tokens live in exactly one place (the Tailwind theme definition, when implemented). No component defines or overrides a token locally.
- No component-specific tokens (`button-background` is forbidden — buttons use `surface-elevated` like everything else at their tier).
- A new token requires a new *role*, documented here with its reason, before it may be used.

---

# Approved Baseline

These values are the approved baseline for Clem.

Future revisions are allowed only when they improve consistency, accessibility, or the overall design language.

Never change a token to satisfy an individual component. If a component seems to need its own value, either the component is misusing the system or the system is missing a role — and a missing role is added here, deliberately, not patched locally.

Design evolution happens at the system level, not the component level: a change to this document propagates everywhere at once, which is the entire point of having it.
