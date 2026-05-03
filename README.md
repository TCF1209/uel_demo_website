# UEL Malaysia — Brand Website

Multilingual brochure-style marketing website for **UEL (Unique Excellent Lubricant)**, the Malaysian distributor of UEL-branded engine, industrial, and gear oils.

> **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · Framer Motion
> **Owner / Agency:** DuoCode Technology
> **Brief:** see `UEL-project-brief (1).md`
> **Working notes for Claude Code:** see `CLAUDE.md`

## Quick start

```bash
cp .env.example .env.local        # fill in WhatsApp number + Resend key
pnpm install
pnpm dev                           # http://localhost:3000
```

The default locale (`en`) renders at `/`. Chinese is at `/zh`, Malay at `/ms`.

## How to add a product

1. Drop the product photo into `public/products/{category}/<slug>.webp` (convert from JPEG first).
2. Add an entry to `data/products.json` matching the `Product` type in `lib/products.ts`.
3. Localized strings (`name`, `description`, `benefits`, `suitableFor`) need all three locales — Chinese and Malay can use AI-translated placeholders with a `// TODO: client translation` note.
4. Run `pnpm build` to confirm typing and routing both still pass.

## How to add a workshop

Append to `data/workshops.json`. Required fields are documented in the brief §5.7. Coordinates need to be reasonably accurate if/when we wire up the Leaflet map.

## How to update translations

Edit `messages/{en,zh,ms}.json`. Keys are grouped by feature (`Nav`, `Common`, `Home`, etc.). Use `useTranslations("Nav")` server-side or in client components.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | yes | Format `60XXXXXXXX` (no `+`). Used by floating button + every WhatsApp CTA. |
| `RESEND_API_KEY` | yes (prod) | Inquiry form email send. Get from resend.com. |
| `INQUIRY_RECIPIENT_EMAIL` | yes (prod) | Where inquiries land. |

## Project structure

See `CLAUDE.md` for the full tour. Highlights:

- `app/[locale]/` — pages
- `data/` — products, workshops, categories (JSON, not a CMS for v1)
- `messages/` — i18n strings
- `components/` — split by domain (layout, sections, products, workshops, ui)
- `lib/` — small helpers (`cn`, `whatsapp`, `products`)

## Outstanding TODOs

- Categorize the 14 raw client product photos in `public/products/_uncategorized/` — see the README in that folder.
- Add `public/brand/logo.png` and `public/textures/grain.png`.
- Confirm UEL SSM number, founding year, HQ address.
