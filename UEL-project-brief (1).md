# UEL (Unique Excellent Lubricant) — Brand Website

> **Build target:** A multilingual brochure-style marketing website for a Malaysian engine oil distributor.
> **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Shadcn/UI · Framer Motion
> **Owner / Agency:** DuoCode Technology
> **Reference sites:** [fuelube.net](https://fuelube.net) · [absolube.net](https://absolube.net) — *use as INFORMATION ARCHITECTURE reference only, NOT as a visual reference. Our design must look distinctly more premium and modern than these.*

---

## 0. Non-Negotiable Requirements (Read First)

These three rules override any other guidance in this document. If a design choice conflicts with these, these win.

### 0.1 Modern, Not AI-Generated

The output must feel like it was **designed by a human design studio**, not auto-generated. Concretely, the following are **banned** because they instantly read as "AI slop":

- ❌ Purple-to-blue or pink-to-purple gradients anywhere.
- ❌ Generic "glassmorphism" cards with frosted blur and white border on dark background.
- ❌ Centered hero with one big headline + one CTA + abstract 3D blob behind it.
- ❌ Lucide icon + heading + paragraph in a 3-column grid with no styling effort.
- ❌ Inter, Roboto, or system-ui as the primary font.
- ❌ "Stock photo of person looking at laptop" hero imagery.
- ❌ Tailwind default color palette (no `slate-900`, `gray-800`, `blue-500` showing up as-is — every color must come from the brand CSS variables defined in section 2).
- ❌ Default Shadcn component styling without customization. If you use Shadcn, **restyle each component** to match the brand (e.g. Button gets the gold accent + uppercase + tighter letter-spacing, not the default look).
- ❌ Emoji in UI copy.
- ❌ "Innovative", "Empowering", "Seamless", "Cutting-edge" — these words are banned in user-facing copy.

What "modern" means here, positively:
- **Editorial-grade typography**: large display headings with deliberate kerning, mixed sizes within one line for emphasis, generous leading on body text.
- **Asymmetric, deliberate layouts** — not 3-column grids stacked vertically.
- **Real content density**: spec tables, mono-font data, technical labels — these make a site feel grown-up.
- **Subtle, considered motion** — not bouncing, not parallax-everything.
- **Texture and depth**: grain overlays, layered shadows, real product photography, blueprint-style dividers.

If a section is starting to look like a default template, **stop and redesign it** with the industrial-automotive aesthetic from section 3 in mind.

### 0.2 Responsive — Phone AND Laptop Both First-Class

Both surfaces are equally important. **Mobile is not "the small version of desktop", it's a separately designed experience** sharing the same content.

Required behaviors:

- **Breakpoints** (Tailwind defaults are fine to use): `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`. Build mobile-first; layer up.
- **Test at these specific widths during development**: `375px` (iPhone SE), `414px` (iPhone Plus), `768px` (iPad portrait), `1280px` (laptop), `1920px` (desktop). Every page must look intentional at all five.
- **Navigation:**
  - Desktop: horizontal nav bar with links + language switcher + WhatsApp CTA, sticky on scroll with a subtle background blur once scrolled past hero.
  - Mobile: hamburger trigger → full-screen overlay drawer that slides in from the right (Framer Motion). Drawer contains nav links (large, tappable, min 44px height), language switcher at bottom, and a big WhatsApp CTA at the very bottom.
- **Typography scale:** must shrink sensibly. The hero H1 might be `text-7xl` on desktop but `text-4xl` on mobile — use Tailwind's responsive prefixes (`text-4xl md:text-6xl lg:text-7xl`). Never let display text overflow on small screens.
- **Tap targets:** every interactive element must be **at least 44×44px** on mobile. Buttons, nav items, language switchers, social icons — all of them.
- **Hover states have mobile fallbacks:** any effect using `:hover` must also trigger on tap or have a non-hover equivalent (e.g. product card hover-tilt → on mobile, the card just shows the same info statically). Never put critical info behind hover-only.
- **Tables → cards on mobile:** the product spec tables should reflow into stacked label/value pairs on screens narrower than `md`.
- **Workshop directory specifically:** desktop is two-pane (list + map). Mobile collapses to a tab switcher: "List" tab and "Map" tab, default = List. The filter bar becomes a sticky bar at the top.
- **Floating WhatsApp button:** sized 56×56px on mobile, 64×64px on desktop, with `bottom: 24px; right: 24px` plus safe-area-inset for iPhone notch.
- **Forms:** on mobile, inputs are full-width with `font-size: 16px` minimum (prevents iOS auto-zoom on focus). All form fields stack single-column on mobile.
- **Product detail page:** desktop is two-column (image left, info right). Mobile stacks: image first, then info, then specs. The big bottle image on mobile takes ~60vh and centers the bottle.
- **Image performance:** every `next/image` declares `sizes` correctly (e.g. `sizes="(max-width: 768px) 100vw, 50vw"`) — this is non-negotiable for mobile data usage.

### 0.3 Animation — Required Throughout, But Disciplined

Animation is not optional. The site must feel **alive on scroll, hover, and load**. Full motion spec is in section 3 ("Motion & Interaction"); the rule here is:

- **Every page** has at least: a hero entrance animation, scroll-triggered reveals on at least 2 sections, and at least one micro-interaction on hover.
- **Respect `prefers-reduced-motion`**: wrap motion components so users with reduced-motion preference get static content (use Framer's `useReducedMotion` hook). This is also an accessibility requirement.
- **Never animate layout properties** (`width`, `height`, `top`, `left`) — only `transform` and `opacity`. Performance matters.
- **One signature moment per page** that's worth screenshotting. On homepage it's the hero oil-droplet SVG. On product detail it's the slow rotate-on-scroll of the bottle. Pick one for every page and execute it well.

---

## 1. Project Context

**Client:** UEL — short for **Unique Excellent Lubricant**. The client is the official distributor for the UEL brand of lubricants in Malaysia. Their flagship product line is branded **ULTRA**.

**Business model:** B2C and B2B2C. End customers are car owners, but actual purchase happens through partner workshops / mechanics. The website's job is therefore *not* e-commerce — it's:

1. Help car owners **discover the brand** via Google search (SEO is critical).
2. Help them **understand which UEL product** matches their car / motorbike / use case.
3. Direct them to a **partner workshop near them** to actually buy the product.
4. Provide a fast path to **WhatsApp inquiry** for distributors / workshop owners who want to stock UEL.

**Primary user goals:**
- "I drive a Myvi, which UEL oil should I use?"
- "Is there a workshop near me that sells UEL?"
- "I run a workshop — how do I become a UEL stockist?"

The site must work on mobile-first because most Malaysian car owners search on their phones, often while *at* the workshop.

---

## 2. Brand Identity

**Logo:** A grey rounded-rectangle plate containing three water-drop icons in **blue, red, and green** outlined circles, with the wordmark "UEL" below in heavy industrial sans-serif, and the tagline "UNIQUE EXCELLENT LUBRICANT" beneath that. The logo file is provided in `/public/brand/logo.png`.

**Brand colors derived from logo + product packaging:**

The UEL bottles use a **deep oxblood / wine red plastic** with **dark labels** carrying metallic gold/copper shimmer text (the ULTRA wordmark). The logo itself is monochrome industrial. This gives us the following palette:

```css
/* Core dark industrial base */
--bg-base:        #0A0A0B;   /* near-black, matte */
--bg-elevated:    #131316;   /* card / section bg */
--bg-overlay:     #1C1C20;   /* hover / nested layer */
--border-subtle:  #26262B;
--border-strong:  #3A3A42;

/* Metallic / industrial accents */
--text-primary:   #F5F2ED;   /* off-white, slightly warm */
--text-secondary: #A8A39B;   /* warm grey */
--text-muted:     #6B665E;

/* UEL signature accents (from the logo droplets) */
--accent-blue:    #2B6FB8;   /* deep cobalt */
--accent-red:     #C53030;   /* brake-light red */
--accent-green:   #2F8F4E;   /* oil-treated green */

/* Hero accent — metallic copper/gold (from ULTRA label) */
--accent-gold:    #C9A052;   /* warm copper */
--accent-gold-hi: #E5C07B;   /* highlight */

/* Functional */
--success: var(--accent-green);
--danger:  var(--accent-red);
--info:    var(--accent-blue);
```

**Color usage discipline:**
- Default backgrounds: `--bg-base` and `--bg-elevated` only.
- Gold (`--accent-gold`) is the *primary CTA color* and the only "warm" color on most pages — use it sparingly so it stays special. Apply it to: primary buttons, key headlines, the active state of nav, product spec highlights.
- The blue/red/green triad mirrors the logo droplets and is used **only as a category color system** (see Information Architecture). Don't mix them as decoration.

---

## 3. Design Direction

**Aesthetic vector:** *industrial precision × premium automotive*. Think: the cockpit of a high-end performance car. Dark, deliberate, with metallic textures and sharp typography. **Not** the generic "tech SaaS dark mode."

Concrete reference cues to channel:
- The hero video / parallax feel of **Mobil 1** product pages (without copying).
- The mechanical-engineering-spec-sheet feel of **Liqui Moly** product detail pages.
- The cinematic dark-mode product photography aesthetic of high-end watch brands like **Hodinkee** or **Bremont** — *applied to oil bottles*.

### Typography

Use two distinctive fonts, not Inter or Roboto:

- **Display / headings:** `"Anton"` or `"Bebas Neue"` (compressed industrial sans, all-caps friendly) OR `"Archivo Black"` for a chunkier modern industrial feel. Pick **Archivo Black** for headings.
- **Body / UI:** `"Manrope"` (geometric, technical, very readable at small sizes) for body text and UI.
- **Monospace accents:** `"JetBrains Mono"` for product codes, viscosity grades (e.g. `5W-30`, `API SL/CF`), spec tables. This makes spec data feel authoritative and engineering-grade.

Both Manrope and Archivo Black are on Google Fonts — load via `next/font/google` for performance.

### Motion & Interaction

Use Framer Motion for **purposeful** animation, not decoration:

- **Hero entrance:** staggered reveal of headline → subhead → CTA → product bottle silhouette, ~600ms total.
- **Scroll-triggered:** product cards lift slightly and reveal a thin gold underline on `whileInView`. Use `viewport={{ once: true, amount: 0.3 }}`.
- **Hover on product cards:** the bottle image subtly tilts (`rotateY: 4deg`) and the spec data slides up from below the image.
- **Page transitions:** crossfade with a 200ms blur, no flashy sliding.
- **Hero background:** a slow, looping radial gradient that mimics oil flowing — implement with CSS `@keyframes` + `background-position` shift, *not* a video file (performance).
- **One signature moment:** on the homepage hero, render a large 3D-feeling oil droplet using SVG with layered radial gradients + Framer Motion for a slow rotation. This is the "thing people remember."

Avoid: bounce easings, spring overshoots, anything that feels playful. Easings should be `[0.16, 1, 0.3, 1]` (smooth-out) or linear for ambient loops.

### Spatial Composition

- Generous vertical rhythm: section padding `py-24 md:py-32`.
- Hero uses asymmetric grid: copy on left 5/12, large product bottle hero shot on right 7/12, with the bottle bleeding slightly off the right edge.
- Section headers use a small all-caps eyebrow label in `--accent-gold` ("SERIES 01 // ENGINE OIL") above the main heading — this is a recurring motif throughout the site.
- Use horizontal rule lines made of repeated dashes or dots in `--border-subtle` to separate sections (industrial blueprint feel).

### Backgrounds & Atmosphere

- Subtle **grain overlay** on all dark sections (`background-image: url('/textures/grain.png'); opacity: 0.03;`).
- Optional: a **carbon-fiber-pattern SVG** as a barely-visible texture on hero only.
- Product detail pages: a **vertical gradient** from `--bg-base` at top to a slightly warmer `#15110D` at bottom — this gives the page a "sitting in a garage at golden hour" warmth.

---

## 4. Information Architecture

```
/                          → Homepage
/about                     → About UEL (brand story, values, manufacturing)
/products                  → Product hub (3 categories visible)
/products/engine-oil       → Engine Oil (Black Oil) category landing
/products/engine-oil/[slug]→ Individual product detail (e.g. ULTRA HD40, ULTRA 10W30)
/products/industrial-oil   → Industrial Oil category landing
/products/industrial-oil/[slug]
/products/gear-oil         → Gear Oil ("牙油") category landing
/products/gear-oil/[slug]
/why-uel                   → Why Choose UEL (advantages page)
/where-to-buy              → Workshop / partner stockist directory
/contact                   → Contact + inquiry form

/api/inquiry               → POST endpoint that emails the inquiry form to client
```

### The 3 Product Categories — Color Mapping

This is the system that ties the logo's three droplets to the product taxonomy:

| Category | Malay term | Chinese term | Accent color | Use case |
|---|---|---|---|---|
| **Engine Oil** | Minyak Enjin | 黑油 / 引擎机油 | `--accent-blue` (cobalt) | Cars + motorbikes |
| **Industrial Oil** | Minyak Industri | 工业油 | `--accent-red` (brake-red) | Hydraulic, heavy-duty, compressor |
| **Gear Oil** | Minyak Gear | 齿轮油 / 牙油 | `--accent-green` (oil-green) | Gearbox, transmission, ATF, CVTF |

> **Implementation note for Claude Code:** the customer originally described these as "黑油、工业油、牙油" (Black Oil, Industrial Oil, Gear Oil). Use **"Engine Oil / Industrial Oil / Gear Oil"** as the canonical English labels site-wide. The reference sites (fuelube, absolube) further sub-divide these (e.g. Engine Oil → Fully Synthetic / Semi Synthetic / Premium Mineral). Build the data model to support that sub-categorisation even if v1 launches with fewer products.

---

## 5. Page-by-Page Specification

### 5.1 Homepage `/`

**Sections (in order):**

1. **Hero** (full viewport height)
   - Eyebrow: `ENGINE PROTECTION // SINCE [YEAR]` in gold mono.
   - H1 headline: short, punchy, e.g. *"Engineered for Malaysian roads."* (placeholder — leave a `// TODO: confirm headline with client` comment).
   - Sub-copy: 1–2 sentences explaining what UEL does.
   - Primary CTA (gold): "Explore Products" → `/products`
   - Secondary CTA (ghost): "Find a Workshop" → `/where-to-buy`
   - Right side: hero composition of 3 ULTRA bottles arranged in depth, slight rotation, with a soft radial gold glow behind them. Use the product images provided.

2. **The Three Series strip** — three large clickable cards side-by-side, each tinted with its category accent color (used as a thin top border + glow only, not a full color wash). Hovering reveals product count + a "View Range" link.

3. **Featured Product** — pick one hero product (likely ULTRA HD40 based on photos) and dedicate a full section to it: large bottle render on one side, spec callouts on the other (viscosity, API rating, suitable engines). Mono font for specs.

4. **Why UEL** — 4-tile grid summarising the value props (technical formulation, Malaysian climate-tested, OEM-grade additives, certified). Each tile has a custom mini-icon (use Lucide icons but recolor to gold). Detailed page is `/why-uel`.

5. **Workshop locator teaser** — a small Malaysia map silhouette (SVG) with dotted markers + headline "Find UEL at 80+ workshops nationwide" (dynamic count from data file). CTA to `/where-to-buy`.

6. **CTA band** — full-width dark band with a single line: "Stock UEL at your workshop." + WhatsApp CTA button.

7. **Footer** — three columns: nav links / contact / language switcher. SSM number must be displayed (DuoCode SSM 202603062356 — actually this is OUR SSM, leave a `// TODO: get UEL SSM` placeholder).

### 5.2 About `/about`

- Brand origin story (placeholder Lorem until client provides copy — make it long enough to look real, ~3 paragraphs).
- A "Manufacturing & Quality" section with 3–4 image+text rows (alternating left/right).
- Certifications strip (logos like API, ACEA, JASO — placeholder logos OK).

### 5.3 Products hub `/products`

A clean 3-category split. Each category card is large, clickable, shows category icon + 1-line description + "X products" count. This page is also where the URL filter / search lives if we want to add it later — leave the layout flexible.

### 5.4 Category pages `/products/[category]`

- Sub-category tabs at top (Fully Synthetic / Semi Synthetic / Premium Mineral, etc. — pull from data).
- Grid of product cards: bottle image, product name, viscosity grade in mono font, key specs (2 lines), "View Details" link.
- Each card uses the category accent color as a subtle hover state.

### 5.5 Product detail `/products/[category]/[slug]`

This is the page that does the SEO heavy lifting. Structure:

```
[Breadcrumb]  Home / Products / Engine Oil / ULTRA HD40

[Left column: large bottle image with slow Framer rotate-on-scroll]
[Right column:
  - Product name (display font)
  - Viscosity grade (huge mono, gold, e.g. "SAE 40")
  - 1-paragraph description
  - Specs table (mono font): API rating, ACEA, OEM approvals
  - "Suitable for" pill list of vehicle types / engine types
  - WhatsApp inquiry button + "Find a workshop" button
]

[Below fold:
  - Technical spec sheet (full table)
  - Performance benefits (icon list)
  - Available pack sizes (1L, 4L, 5L badges)
  - Related products (3 cards from same category)
]
```

### 5.6 Why UEL `/why-uel`

- Long-form value-prop page. 5–6 sections, each making one argument:
  - Climate-tested for Malaysian heat & humidity
  - OEM-grade additive package
  - Trusted by N+ workshops
  - Range covers all engine types
  - Etc.
- Each section uses the gold eyebrow + heading + body + accompanying visual (use real product photos or generic mechanic-shop photos as placeholders).

### 5.7 Where to Buy `/where-to-buy`

This is the **partner workshop directory** the client specifically asked for.

**v1 implementation:**

- Data lives in `/data/workshops.json` (Claude Code should create this file with 8–12 placeholder entries spread across Klang Valley, Penang, JB).
- Each entry: `{ id, name, address, state, city, phone, whatsapp, services[], coords: {lat, lng} }`.
- Page layout:
  - **Filter bar at top:** state dropdown + service-type checkboxes (Engine Oil / Industrial / Gear Oil) + search-by-name input.
  - **Two-pane layout on desktop:** left = scrollable list of workshop cards. Right = static map placeholder (`<div>` with a "Map view coming soon" hint — or, if Claude Code wants to be ambitious, integrate Leaflet with OpenStreetMap, no API key needed).
  - **Mobile:** stack list above map.
- Each workshop card: name, address, "Call" button, "WhatsApp" button (both deep-linked).

> If implementing the Leaflet map: use it in dark mode (Stadia Maps' Alidade Smooth Dark or similar free dark tile provider). Markers should use the gold accent color.

### 5.8 Contact `/contact`

- Two-column: form on left, contact info on right (HQ address placeholder, phone, email, WhatsApp QR).
- Form fields: Name, Phone, Email, Inquiry Type (dropdown: General / Become a Distributor / Workshop Stockist / Product Question), Message.
- POST to `/api/inquiry` which sends an email via Resend or Nodemailer (use Resend, simpler — leave `RESEND_API_KEY` placeholder in `.env.example`).
- After submit: success state, no page navigation.
- Above the form, a giant **WhatsApp CTA** with QR code for mobile-to-mobile flow.

---

## 6. Internationalization (i18n)

- Use **`next-intl`** (App Router compatible).
- Locales: `en` (default), `zh` (Simplified Chinese), `ms` (Bahasa Melayu).
- URL strategy: locale prefix, e.g. `/zh/products/engine-oil`. Default `en` shown without prefix.
- All UI strings live in `/messages/{en,zh,ms}.json`.
- Product data: structure the JSON so each product has `name`, `description`, `benefits[]` keyed by locale:
  ```json
  {
    "id": "ultra-hd40",
    "category": "engine-oil",
    "viscosity": "SAE 40",
    "name": { "en": "ULTRA HD40", "zh": "ULTRA HD40", "ms": "ULTRA HD40" },
    "description": {
      "en": "Premium mineral engine oil...",
      "zh": "优质矿物发动机油...",
      "ms": "Minyak enjin mineral premium..."
    }
  }
  ```
- Language switcher in header: simple `EN / 中 / BM` text toggle, current locale in gold.
- For v1, generate plausible Chinese and Malay translations for all UI chrome and placeholder content. Mark client-supplied content (like the brand story) with `// TODO: client translation` so we know what to swap later.

---

## 7. WhatsApp Integration

This is the primary conversion mechanism — make it frictionless.

- A **floating WhatsApp button** is fixed bottom-right on every page (above the footer on mobile so it doesn't cover content). Use the official WhatsApp green (`#25D366`) — this is the *one* place we break the dark/gold palette, and that's intentional: the brand recognition matters more than design purity.
- All "WhatsApp" CTAs across the site use the URL pattern:
  ```
  https://wa.me/60XXXXXXXX?text={encoded prefilled message}
  ```
- Prefilled messages should be context-aware:
  - Generic CTA → "Hi, I'm interested in UEL products."
  - Product detail page → "Hi, I'd like more info about ULTRA HD40 (4L)."
  - Where-to-buy → "Hi, I'd like to know about UEL stockists near me."
- Phone number is a placeholder env var: `NEXT_PUBLIC_WHATSAPP_NUMBER`.

---

## 8. Product Data Model

Create `/data/products.json` (or split per category if it gets long). Schema:

```ts
type Product = {
  id: string;                    // slug, e.g. "ultra-hd40"
  category: 'engine-oil' | 'industrial-oil' | 'gear-oil';
  subCategory?: string;          // 'fully-synthetic' | 'semi-synthetic' | etc.
  series: string;                // 'ULTRA'
  name: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  viscosity: string;             // e.g. '5W-30', 'SAE 40'
  apiRating?: string;            // e.g. 'API SL/CF'
  aceaRating?: string;
  jasoRating?: string;           // for motorcycle oils
  oemApprovals?: string[];
  packSizes: ('1L' | '4L' | '5L' | '18L' | '208L')[];
  suitableFor: LocalizedString[];// e.g. ['Petrol cars', 'Diesel cars']
  benefits: LocalizedString[];   // bullet list
  imageUrl: string;              // /products/ultra-hd40.png
  featured?: boolean;
};

type LocalizedString = { en: string; zh: string; ms: string };
```

**For initial seed data, create at minimum:**
- 4 Engine Oil products: ULTRA HD40, ULTRA 10W30, ULTRA 20W50, ULTRA 5W40 (this matches the WhatsApp photos we have).
- 2 Industrial Oil products (placeholder names like "ULTRA HYD 46", "ULTRA HYD 68").
- 2 Gear Oil products (placeholder: "ULTRA GL-5 80W90", "ULTRA ATF DX-III").

Image assets: the client provided product photos via WhatsApp. **These should go in `/public/products/`**. Claude Code should reference them by filename even if the actual image files need to be added later — use placeholder.png if missing and log which files are needed.

---

## 9. Image / Asset Handling

The client provided the following assets (to be placed in `/public/`):
- `brand/logo.png` — UEL logo with three droplets
- `products/ultra-hd40.png`
- `products/ultra-10w30.png`
- `products/ultra-20w50.png`
- (more to follow, ~11 product photos total)

**Claude Code: please auto-categorise the product images into the 3 category folders (`/public/products/engine-oil/`, `/public/products/industrial-oil/`, `/public/products/gear-oil/`)** based on filename hints (HD40, 10W30, 20W50, 5W40 → engine-oil; HYD or hydraulic in name → industrial-oil; GL- or ATF or gear in name → gear-oil). If a file's category is ambiguous, default to engine-oil and add a `// TODO: confirm category` comment in the data file.

Use `next/image` everywhere with `priority` only on hero images.

---

## 10. SEO

- `next/metadata` API on every page.
- Each product detail page must have:
  - Title: `{Product Name} — {Viscosity} {Category} | UEL Malaysia`
  - Description: derive from product short description.
  - OpenGraph image: the product bottle on dark background.
  - Structured data (`Product` JSON-LD with `Brand: "UEL"`).
- Generate `sitemap.xml` and `robots.txt`.
- Alt text for all images, especially product bottles.
- **Local SEO bonus:** add `LocalBusiness` JSON-LD to the Where-to-Buy page listing each workshop as a `LocalBusiness` entry.

---

## 11. Performance & Quality Bar

- Lighthouse target: **95+ Performance, 100 Accessibility, 100 SEO** on a fresh build.
- All product images converted to WebP. Use `next/image` with proper `sizes`.
- Lazy-load Framer Motion for non-critical sections.
- Total JS budget for the homepage: < 200KB gzipped.
- Use React Server Components by default; mark client components explicitly only where motion/interaction requires it.
- Ensure WCAG AA contrast on all text — gold on dark base must be tested.

---

## 12. Project Structure

```
/app
  /[locale]
    /layout.tsx
    /page.tsx                     ← homepage
    /about/page.tsx
    /products
      /page.tsx                   ← hub
      /[category]/page.tsx        ← category landing
      /[category]/[slug]/page.tsx ← product detail
    /why-uel/page.tsx
    /where-to-buy/page.tsx
    /contact/page.tsx
  /api/inquiry/route.ts
/components
  /layout (Header, Footer, LocaleSwitcher, FloatingWhatsApp)
  /sections (Hero, ThreeSeries, FeaturedProduct, WhyUEL, WorkshopTeaser, CTABand)
  /products (ProductCard, ProductGrid, SpecTable, CategoryHeader)
  /workshops (WorkshopCard, WorkshopFilter, WorkshopMap)
  /ui (shadcn components — only what we use)
/data
  /products.json
  /workshops.json
  /categories.json
/messages
  en.json
  zh.json
  ms.json
/lib
  /i18n.ts
  /whatsapp.ts (URL builder helper)
  /products.ts (data accessors)
/public
  /brand/logo.png
  /products/[category]/...
  /textures/grain.png
```

---

## 13. Definition of Done (v1 Launch Checklist)

- [ ] All 7 page templates render in all 3 locales.
- [ ] Product detail pages dynamically generate from `products.json`.
- [ ] Workshop directory filterable by state + category.
- [ ] WhatsApp floating button + context-aware deep links work.
- [ ] Inquiry form sends an email (test with a placeholder Resend key).
- [ ] Hero animation plays smoothly at 60fps on a mid-range Android.
- [ ] Lighthouse 95+ on `/` and one product detail page.
- [ ] All images have alt text; full keyboard nav works.
- [ ] No `any` in TypeScript; strict mode on.
- [ ] README covers: how to run, env vars, how to add a product, how to add a workshop, how to update translations.

---

## 14. Out of Scope (for v1, document for v2)

- E-commerce / cart / checkout
- Customer accounts / login
- Live distributor portal
- Blog / news section (the reference sites have it; the client didn't ask, so skip — but leave a `/news` route stub).
- Real-time stock / inventory
- A real CMS (use JSON files for now; if client later wants edits-without-code, recommend Sanity for v2).

---

## 15. Open Questions for Claude Code to Surface

When the build is ~80% done, output a `QUESTIONS.md` file flagging any of these that still need client input:
- Final WhatsApp number (`NEXT_PUBLIC_WHATSAPP_NUMBER`)
- Confirmed Malaysia HQ address + SSM number
- Confirmed brand founding year (for hero eyebrow)
- Final translated copy (currently AI-translated placeholders)
- Final list of all 11+ product photos with confirmed category mapping
- Preferred email for inquiry form recipient
- Whether they want a `/news` blog later (leave structure ready)

---

**End of brief.** Build with intentionality — every dark surface, every gold accent, every motion easing should feel like it belongs in a high-end automotive context. When in doubt, lean toward *restraint and precision* over decoration.
