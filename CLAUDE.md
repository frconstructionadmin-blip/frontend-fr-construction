# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dev commands

```bash
npm run dev     # localhost:3000
npm run build
npm run lint
```

## Environment variables (frontend — `.env.local`, gitignored)

```
NEXT_PUBLIC_BACKEND_URL=https://api.frconstructionlondon.com   # FastAPI backend
ADMIN_JWT_SECRET=<same secret as backend>                      # used in proxy.ts to verify JWT
```

## App structure

The frontend has two parts:

1. **Public landing page** — `/` — static marketing site (no auth)
2. **Admin dashboard** — `/whatsapp` — protected by JWT auth (see below)

### Admin dashboard (`/whatsapp`)

A WhatsApp-style conversation viewer for Franco to monitor and respond to customers.

**Auth:** `/login` — username/password, issues JWT cookie via `POST /auth/login` on the backend. `proxy.ts` (Next.js 16 proxy) guards all `/whatsapp/*` routes and redirects to `/login` if the cookie is missing or invalid.

**Dashboard features:**
- Left sidebar: all conversations (phone/name, last message, bot status indicator)
- Right panel: chat bubbles (user messages left, bot replies right)
- Per-conversation toggle panel:
  - **Bot on/off** — green toggle, stops bot auto-replies for this number
  - **EN→ES** — translates incoming client messages to Spanish for Franco to read
  - **ES→EN** — translates Franco's outgoing Spanish replies to English before sending

**Key files:**
- `proxy.ts` — JWT guard (Next.js 16 proxy convention)
- `app/login/page.tsx` — login form (client component, calls backend)
- `app/whatsapp/page.tsx` — server component, fetches initial conversation list
- `app/whatsapp/components/DashboardShell.tsx` — client shell, manages selected conversation state
- `app/whatsapp/components/ConversationList.tsx` — sidebar with 4-second polling
- `app/whatsapp/components/ChatWindow.tsx` — messages + input + 4-second polling
- `app/whatsapp/components/SettingsToggles.tsx` — bot/translation toggle buttons
- `app/lib/dashboard-api.ts` — typed API client (all calls include `credentials: "include"`)

---

## Purpose

Conversion-focused landing page for **FR Construction** — a construction, carpentry, and handyman service based in London, run by **Franco Reyes**. The primary goal is to get visitors to open a WhatsApp conversation with Franco.

**WhatsApp number:** +44 7944 623838  
**WhatsApp deep-link:** `https://wa.me/447944623838?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote`

## Language & tone

- **English only** (British English: colour, labour, etc.)
- Warm, personal, professional — not corporate
- Franco is the face of the business; copy should feel like it comes from him or his team

## Page structure — 4 sections in order

### 1. Hero
Full-viewport section. Company name + short tagline. Two buttons side by side:
- **"Contact us"** → opens WhatsApp deep-link
- **"What we do"** → smooth-scrolls to the Services section

### 2. Work photos (banner)
Three photos displayed side by side (or responsive grid). These are real job photos showing construction, carpentry, and handyman work. Use placeholder images (`/public/work-1.jpg`, `/work-2.jpg`, `/work-3.jpg`) until real photos are provided. No text overlay needed — the images speak for themselves.

### 3. About the company
Short description of FR Construction: who Franco is, what makes the business trustworthy, coverage area (all of London), and the range of services (construction, carpentry, handyman). Keep it concise — 2–3 short paragraphs max. End with a CTA button that opens WhatsApp.

### 4. Testimonials
Customer reviews displayed as cards. Each card has: quote, customer first name, and type of job done (e.g. "Loft conversion", "Fitted wardrobes"). Use 3–4 placeholder testimonials until real ones are provided.

## Stack

- Next.js 15 (App Router) — all pages in `app/`
- Tailwind CSS v4
- TypeScript
- No extra UI libraries — build components from scratch with Tailwind

## WhatsApp floating button

A fixed floating button in the **bottom-right corner**, always visible on every scroll position. Uses the WhatsApp green (`#25D366`) with the WhatsApp icon (SVG). Clicking it opens the same deep-link as the hero CTA. This is separate from the hero and about-section buttons.

## Design system

**Before writing any UI, read `DESIGN.md`** — it contains the full Apple-inspired design tokens: colours, typography, spacing, shadows, border radius, and component patterns. All UI must follow those tokens.

## Design direction — inspired by 30x.com

Reference site: https://30x.com/

- **Palette**: Dark background (near-black), white/light grey text, one strong accent colour for CTAs (orange or amber works well for construction)
- **Typography**: Very bold, large hero heading — the headline should dominate the screen. Clean sans-serif (use `next/font` with Inter or Geist)
- **Layout**: Single-column vertical scroll. Each section gets generous vertical padding and clear whitespace between sections — no clutter
- **Hero**: Full-viewport height. Big H1, short subheading, two CTA buttons side by side. Dark overlay if a background image is used
- **Buttons**: Solid filled primary button (accent colour) + outlined ghost button. Bold text, rounded corners
- **Sections**: Each section is clearly separated. Cards (photos, testimonials) use a slightly lighter dark surface colour — not stark white
- **Photography**: Large, edge-to-edge or near-edge. Work photos should feel premium, not like stock photos
- **Overall feel**: Premium, credibility-driven. The site should make FR Construction look like the most professional builder in London
- Mobile-first and fully responsive

---

## SEO — implement from the start, not as an afterthought

### Target keywords

| Intent | Keyword |
|---|---|
| Primary | `construction company London` |
| Primary | `builder London` |
| Secondary | `carpentry London`, `handyman London` |
| Long-tail | `loft conversion London`, `fitted wardrobes London`, `local builder London` |

### `<title>` tag (under 60 chars)
```
FR Construction London | Builder, Carpentry & Handyman
```

### Meta description (150–160 chars)
```
Professional building, carpentry & handyman services across London. 
Franco Reyes and his team deliver quality work. Get a free quote on WhatsApp today.
```

### Heading structure
```
H1: London's Trusted Builder, Carpenter & Handyman   ← hero
H2: Our Work                                          ← photos section
H2: About FR Construction                             ← company section
H2: What Our Clients Say                              ← testimonials section
```

### Open Graph + Twitter Card (add to `app/layout.tsx`)
```ts
export const metadata = {
  title: "FR Construction London | Builder, Carpentry & Handyman",
  description: "Professional building, carpentry & handyman services across London. Franco Reyes and his team deliver quality work. Get a free quote on WhatsApp today.",
  openGraph: {
    title: "FR Construction London",
    description: "Builder, carpentry & handyman services across London.",
    url: "https://frconstructionlondon.com",
    siteName: "FR Construction",
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
}
```

### LocalBusiness schema (add as JSON-LD in `app/layout.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "FR Construction",
  "description": "Professional construction, carpentry and handyman services across London.",
  "telephone": "+447944623838",
  "areaServed": "London",
  "url": "https://frconstructionlondon.com",
  "founder": { "@type": "Person", "name": "Franco Reyes" },
  "serviceType": ["Construction", "Carpentry", "Handyman"]
}
```

### Image SEO
- All `<img>` / `<Image>` tags must have descriptive `alt` text (e.g. `alt="Loft conversion completed by FR Construction in London"`)
- Use `next/image` for automatic WebP conversion and lazy loading
- Filename convention: `loft-conversion-london.jpg`, `fitted-wardrobes-london.jpg`

### Core Web Vitals
- Hero image must use `priority` prop on `next/image` (avoids LCP penalty)
- No layout shift: always set `width` and `height` on images
- Fonts: use `next/font` to self-host (avoids render-blocking Google Fonts request)

### `robots.txt` and sitemap
- Next.js 15 generates `sitemap.xml` automatically if you add `app/sitemap.ts`
- Add `app/robots.ts` returning `{ rules: { userAgent: "*", allow: "/" } }`