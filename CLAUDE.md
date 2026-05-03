# CLAUDE.md — UEL Malaysia website

> Last updated: 2026-05-03
> Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · next-intl · Framer Motion · Shadcn-style UI primitives
> Source of truth: `UEL-project-brief (1).md` — read it before substantial work.

This file is essential context for Claude Code. The project brief is authoritative for *what* to build; this file covers *how* to work in the repo.

## Stack notes (read once)

The brief specifies "Next.js 14 + Tailwind v3", but `create-next-app` scaffolded **Next.js 16 + Tailwind v4** because they are now the latest stable. The differences that matter:

- **Tailwind v4 has no `tailwind.config.ts`.** Brand tokens live in CSS via `@theme {}` blocks in `app/globals.css`. Reference them as `bg-bg-base`, `text-accent-gold`, `font-mono`, etc. — Tailwind generates utilities from each `--color-*` / `--font-*` declared.
- **next-intl uses async params + `setRequestLocale`** in App Router. See `app/[locale]/layout.tsx` for the pattern.
- **React 19** Server Components by default. Mark `"use client"` only where motion or interaction requires it (the brief's perf budget demands this).

## Project structure

```
app/[locale]/          App Router pages (en, zh, ms via next-intl)
  layout.tsx           Root layout — fonts, NextIntlClientProvider
  page.tsx             Homepage
api/inquiry/route.ts   POST handler — Resend email send
components/
  layout/              Header, Footer, LocaleSwitcher, FloatingWhatsApp
  sections/            Hero, ThreeSeries, FeaturedProduct, WhyUEL, WorkshopTeaser, CTABand
  products/            ProductCard, ProductGrid, SpecTable, CategoryHeader
  workshops/           WorkshopCard, WorkshopFilter, WorkshopMap
  ui/                  Shadcn-style primitives — only what's used
data/
  products.json        Seed products (8 entries, schema in lib/products.ts)
  workshops.json       Seed workshops (10 placeholders across KL, Selangor, Penang, Johor)
  categories.json      Engine / Industrial / Gear with droplet accent colors
messages/{en,zh,ms}.json   UI strings
i18n/{routing,request}.ts  next-intl wiring
lib/
  cn.ts                clsx + tailwind-merge
  whatsapp.ts          URL builder for context-aware WhatsApp deep links
  products.ts          Typed accessors over data/products.json
public/
  brand/logo.png       UEL logo (TODO: drop in)
  products/{category}/ Per-category product photos
  products/_uncategorized/  14 raw WhatsApp images — see README in folder
  textures/grain.png   TODO: add for grain overlay utility
middleware.ts          next-intl locale routing
next.config.ts         Wires the next-intl plugin
```

## Working agreements

### Brand discipline (from brief §0 and §2)

These are non-negotiable and override generic Tailwind reflexes:

- **No raw Tailwind palette colors** (`slate-900`, `gray-800`, `blue-500`, etc). Always use the brand tokens defined in `globals.css`.
- **Gold (`accent-gold`) is precious.** It is the only warm color and reserved for primary CTAs, key headlines, active nav, spec callouts. Don't pepper it everywhere.
- **The blue/red/green triad is the category color system, not decoration.** Engine = blue, Industrial = red, Gear = green. Do not mix them otherwise.
- **WhatsApp green (`whatsapp`)** is the one allowed exception to the dark/gold palette and only for WhatsApp CTAs.
- **Typography:** Archivo Black for display, Manrope for body, JetBrains Mono for spec / viscosity / product codes. Never Inter / Roboto / system-ui.
- **Banned look-and-feel** (will trigger a redesign): purple-blue gradients, generic glassmorphism cards, centered-hero-with-3D-blob, 3-column Lucide-icon grids, default Shadcn styling without restyle. Stock-photo "person at laptop" hero imagery. Emoji in UI copy. The words "innovative", "empowering", "seamless", "cutting-edge".

### Mobile-first is a real constraint, not lip service

- Test at `375px / 414px / 768px / 1280px / 1920px` for every page touched.
- Tap targets ≥ 44×44px on mobile.
- Never put critical info behind `:hover` only.
- Forms: inputs `font-size: 16px` minimum (prevents iOS auto-zoom).
- Tables → reflow to label/value cards under `md`.

### Motion (from brief §3)

- Use Framer Motion for purposeful motion only.
- **Never animate layout properties** (`width`, `height`, `top`, `left`) — only `transform` and `opacity`.
- Respect `prefers-reduced-motion` — wrap animations behind `useReducedMotion`.
- Easings: `[0.16, 1, 0.3, 1]` (smooth-out). No bounce, no spring overshoots.

### Code quality

- TypeScript strict — no `any`. Type holes are bugs.
- React Server Components by default; `"use client"` only when needed (motion, hover, form state).
- Every `next/image` declares `sizes` correctly. `priority` only on hero.
- Use `cn()` from `lib/cn.ts` for conditional classnames.
- Prefer extending existing components over creating parallel ones. No `Hero2`, `ProductCardNew`. If a component needs to behave differently, refactor it to take props.

### Workflow

- **Search before creating.** Grep / Glob before writing a new file. If similar exists, extend it.
- **Single source of truth** for any concept — one product schema, one category list, one whatsapp helper.
- **Commit per logical unit of work** — not per file, not all-at-once at the end.
- **i18n every user-facing string.** New copy goes in `messages/en.json` first; Chinese and Malay can lag with `// TODO: translation` markers but never `t("key")` against missing keys.
- **Surface assumptions to the user.** If the brief is silent on something or the client supplied placeholder content, leave a clear `// TODO: client confirm` comment rather than inventing an answer.

## Open questions to surface in `QUESTIONS.md` at ~80% complete

(Per brief §15. Reproduced so we don't forget.)

- Final WhatsApp number (`NEXT_PUBLIC_WHATSAPP_NUMBER`)
- Confirmed Malaysia HQ address + UEL SSM number
- Brand founding year (for hero eyebrow)
- Final translated copy (currently AI-translated placeholders)
- Confirmed category mapping for the 14 product photos
- Inquiry form recipient email
- Whether `/news` becomes a real route in v2

## Commands

```bash
npm run dev       # start dev server
npm run build     # production build (run before claiming a page is "done")
npm run lint      # ESLint
```

> **Why npm not pnpm:** scaffold initially used pnpm. We switched to npm because pnpm's symlink-heavy `node_modules` layout breaks VS Code's TypeScript Server when running on Windows against a WSL-installed project (symlinks created by WSL aren't always followable from the Windows side). npm uses copies, so the same `node_modules` works from either side. If the user later wants to switch back to pnpm, run development through the WSL VS Code extension instead.
