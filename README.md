# Nishaan-a

The website for Nishaan-a, a brand strategy practice in Mumbai.

Built to the brand guidelines: Ox Blood `#3E000C` ground, Ivory `#F7EFEC` type,
ITC Avant Garde Gothic Pro throughout. The supplied logotype and monogram are used
as delivered and are never recoloured.

---

## Running it

```bash
npm install
cp .env.example .env.local     # every value is optional; the site runs empty
npm run dev                    # http://localhost:3000
```

| Script              | Does                                    |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Development server                      |
| `npm run build`     | Production build                        |
| `npm start`         | Serve the production build              |
| `npm run lint`      | ESLint via `eslint-config-next`         |
| `npm run typecheck` | `tsc --noEmit`                          |

---

## The brand font

ITC Avant Garde Gothic Pro is licensed, so the webfont files are not in this
repository. Buy or export the three weights, name them exactly as below, and drop
them in `public/fonts`:

```
public/fonts/ITCAvantGardeGothicPro-Bk.woff2     → weight 400  (body, captions)
public/fonts/ITCAvantGardeGothicPro-Md.woff2     → weight 500  (sub-headings, nav, buttons)
public/fonts/ITCAvantGardeGothicPro-Bold.woff2   → weight 700  (headings, hero)
```

The `@font-face` rules already exist in `app/globals.css`; nothing else needs to
change. Until the files are present the stack falls back to Century Gothic and then
URW Gothic, both of which are close geometric relatives. The three 404s you see in
the console before the fonts are added are exactly this and are harmless.

---

## Brand assets

| File                                 | What it is                                        |
| ------------------------------------ | ------------------------------------------------- |
| `public/brand/source/Logo_ivory.png`     | Your original upload, 8000 × 4500, untouched   |
| `public/brand/source/Monogram_ivory.png` | Your original upload, 8000 × 4500, untouched   |
| `public/brand/logo-ivory.png`            | Same artwork, cropped to the mark, 837 × 1200  |
| `public/brand/monogram-ivory.png`        | Same artwork, cropped to the mark, 1400 × 1165 |
| `public/brand/monogram-form-a.png`       | The larger form, separated                     |
| `public/brand/monogram-form-b.png`       | The smaller form, separated                    |
| `app/favicon.ico` / `app/apple-icon.png` | Composited from the monogram onto Ox Blood     |
| `lib/brand-assets.ts`                    | Paths, dimensions and reassembly geometry      |

The supplied PNGs are used as delivered. Nothing is redrawn, re-traced or
recoloured — the marks' own ivory is `#FEFEEC` throughout, taken from the files
themselves and verified on screen at `rgb(254, 254, 236)`. They are served
`unoptimized`, because Next's image optimiser re-encodes to lossy WebP and that
shifted the ivory by one value. The web copies differ from the originals only by cropping away empty
canvas and resizing; the originals are kept in `public/brand/source/` for print
and any future export.

**Why the monogram is split into two files.** The load animation needs each form
to move independently. Rather than redrawing them, the two forms are separated
out of the original pixels by connected component and stored with their exact
position as a percentage of the full mark. `Monogram.tsx` reassembles them into
the original composition at any size — the geometry is in `MONOGRAM_FORMS`. Set
both offsets to zero and you have the supplied file back, pixel for pixel.

---

## Motion

All timing comes from `lib/motion.ts`. Nothing in the site invents its own easing.

| Token       | Value                          | Used for                     |
| ----------- | ------------------------------ | ---------------------------- |
| `EASE`      | `cubic-bezier(0.22, 1, 0.36, 1)` | Everything entering          |
| `DUR.fast`  | 220 ms                         | Hover, colour                |
| `DUR.base`  | 450 ms                         | Interface state              |
| `DUR.reveal`| 1100 ms                        | Scroll reveals               |
| `DUR.mark`  | 1500 ms                        | Brand mark choreography      |

**Monogram — magnetic assembly.** The two forms arrive from opposite off-axis
positions, blurred and undersized, and settle into register. Plays once on load.
Afterwards the pointer pulls them gently apart, in opposition, so the mark feels
like two bodies rather than one image.

**Logotype — mask reveal.** A clip-path wipe upward. No rotation, no scale.

**Everything else.** Scroll reveals fade, rise and de-blur. Buttons are magnetic
within 22% of pointer offset. The hero carries one very slow parallax bloom.
Lenis handles smooth scroll at `lerp: 0.11`, with `syncTouch` off so mobile keeps
native momentum.

Every one of these is disabled under `prefers-reduced-motion`, both in CSS and via
`useReducedMotion()` in the components that animate imperatively.

---

## Design system

Tokens live in two places that mirror each other: `tailwind.config.ts` for
utilities and `app/globals.css` for CSS custom properties.

**Colour.** Two locked values — `ox` `#3E000C` and `ivory` `#F7EFEC`. Everything
else is derived from them and introduces no new hue:

```
ox.deep    #2C0008   recessed surfaces, footer, CTA band
ox         #3E000C   page ground
ox.raise   #4A0812   cards, hover
ox.raise2  #571120   pressed, active
line       ivory 13% borders, dividers
line-strong ivory 26% interactive borders
muted      ivory 66% body copy
subtle     ivory 44% secondary copy
faint      ivory 28% labels, meta
```

The brand book's secondary palette (Lemon, Tangerine, Lilac and the rest) is
deliberately absent — your brief specified deriving everything from Ox Blood, and
the two documents disagree on this point. Adding Lemon back as a single accent for
links and focus rings is a one-line change in `tailwind.config.ts` if you want it.

**Type.** One family, three weights, mapped to hierarchy exactly as briefed:
Bold for headings and hero statements, Medium for sub-headings, navigation and
buttons, Book for body and captions. The scale is fluid (`clamp`) and defined under
`fontSize` in the Tailwind config, so `text-h1` through `text-caption` are the only
sizes anywhere in the codebase.

**Components.** `components/ui` holds button, eyebrow, reveal, section, accordion,
field (label, input, textarea, badge) and states (empty, loading, error). The
project is shadcn-compatible — `components.json` is configured, so
`npx shadcn@latest add <component>` drops new primitives straight into
`components/ui` and they inherit the tokens above.

**The eyebrow.** The brand book labels every slide `BOLD | medium`. That device is
the site's section marker, so page structure is legible before any body copy is
read. It is the one piece of the presentation language carried across literally.

---

## Structure

```
app/
  layout.tsx              Root shell: nav, footer, Lenis, scroll progress, JSON-LD
  page.tsx                Home
  globals.css             Font slots, tokens, base type
  icon.tsx                Favicon, generated from the monogram
  opengraph-image.tsx     1200×630 OG card, generated from the marks
  sitemap.ts / robots.ts
  about | methodology | sprints | industries | research
  insights/[slug] | case-studies/[slug]
  contact | privacy | terms
  api/contact/route.ts    Enquiry endpoint
components/
  brand/                  Monogram, Logotype
  layout/                 Nav, Footer, SmoothScroll, ScrollProgress
  home/                   The home chapters, in scroll order
  shared/                 PageHero, CallToAction, ContactForm, Prose
  ui/                     Design system primitives
content/practice.ts       All site copy as data
lib/
  brand-assets.ts         Asset paths and reassembly geometry
  motion.ts               Motion tokens
  site.ts                 Site metadata and navigation
  integrations/           Service adapters (see lib/integrations/README.md)
public/
  brand/                  Marks, original and traced
  fonts/                  Licensed webfonts go here
```

Copy lives in `content/` rather than inside components, so it can be edited
without touching layout, and swapped for a CMS later by changing one import.
`practice.ts` holds the framework content, `clients.ts` the three client chapters,
`insight-bodies.ts` the articles.

### Home page chapter order

One idea per viewport, each leading into the next:

```
Hero → Strategic Statement → Who We Are → Philosophy → Chakravaat →
Industry Agnostic → Methodology → Sprints → Client Chapters → Insights → CTA
```

### Further documentation

| Document                | Covers                                              |
| ----------------------- | --------------------------------------------------- |
| `docs/MOTION.md`        | Motion tokens, choreography, load timeline, rules    |
| `docs/RESPONSIVE.md`    | Breakpoints, fluid scales, per-section behaviour     |
| `docs/RATIONALE.md`     | Why the site looks and is structured as it is        |
| `docs/PERFORMANCE.md`   | Build output, LCP, CLS, runtime cost, pre-launch list |
| `lib/integrations/README.md` | Every service adapter and what enables it      |

---

## Integrations

Supabase, pgvector, Neo4j, Resend, Cal.com, Groq, Gemini, n8n and Sentry each have
an adapter in `lib/integrations`. All follow the same contract: read credentials
from the environment, degrade quietly when they are absent. The site builds and
runs with an empty `.env`, and no component knows whether a service is switched on.

The contact form is the working example — it posts to `/api/contact`, which calls
the Resend adapter. Without `RESEND_API_KEY` the enquiry is logged in development
and the form still behaves correctly.

See `lib/integrations/README.md` for the full table and what each one needs.

---

## Accessibility

Reviewed against WCAG 2.1 AA.

- **Contrast.** Ivory on Ox Blood is 12.6:1. The body colour (`muted`, 66% ivory) is
  7.4:1 and `subtle` (44%) is 4.6:1 — both pass AA for their sizes. `faint` (28%) is
  used only for uppercase labels at semibold weight, where it clears the large-text
  threshold; do not use it for running text.
- **Keyboard.** Every interactive element is reachable, focus is visible via a
  1.5 px ivory ring at 4 px offset, and a skip link is the first tab stop.
- **Motion.** `prefers-reduced-motion` disables all animation, both declaratively
  and in the components that animate through JavaScript.
- **Structure.** One `h1` per page, headings in order, landmarks on nav, main and
  footer, `aria-current` on the active nav item, `aria-expanded` on the mobile menu
  and accordion triggers.
- **Marks.** The logotype carries `role="img"` with an accessible name. The monogram
  is decorative wherever text sits beside it, and only labelled when it stands alone.

Two things still need a real browser to confirm: colour rendering on a calibrated
display, and screen reader behaviour on the accordion in NVDA and VoiceOver.

---

## Performance

The production build ships 102 kB of shared JavaScript and every route is either
static or statically generated. What that buys, and what still needs watching:

- **LCP.** The hero statement is text, not an image, and the brand marks are inline
  SVG — nothing blocks first paint but the font. Once you add the webfonts,
  `font-display: swap` is already set; consider `<link rel="preload">` for the Bold
  weight, since that is what renders the hero.
- **CLS.** Every mark has an intrinsic `viewBox`, so no reflow on load. The nav is
  fixed and reserves no layout space.
- **Motion.** Only `transform`, `opacity` and `filter` are animated, so everything
  stays off the main thread.

Run Lighthouse against `npm run build && npm start` rather than `npm run dev` —
the development server's numbers are meaningless.

---

## Deployment

**Vercel** is the shortest path.

```bash
npx vercel link
npx vercel env add NEXT_PUBLIC_SITE_URL production
npx vercel --prod
```

Set the remaining variables from `.env.example` as you enable each service. Point
the apex domain at Vercel, and if you are proxying through Cloudflare, use "Full
(strict)" SSL and leave Rocket Loader off — it interferes with hydration.

**GitHub Actions.** A minimal gate before merge:

```yaml
name: CI
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
```

**Self-hosting.** `npm run build && npm start` behind any reverse proxy. Node 20 or
newer.

---

## Chakravaat — needs your input

The Chakravaat section is built: layout, loop diagram, four phase cards, motion,
responsive behaviour. The **substance is not yours yet.**

The only definition of Chakravaat in the supplied materials is the line from the
brand book — "the self-sustaining loop of strategy, identity and filmmaking that
matters". The four phases currently in `content/practice.ts` (Observe, Define,
Structure, Return) are derived from that line and from the etymology: *chakra*, a
wheel; *vaat*, a current. They are a placeholder that reads correctly, not your IP.

Replace the `chakravaat` export in `content/practice.ts` and the section renders
your framework with no other change. If the loop has a different number of phases,
the grid is `sm:grid-cols-2 xl:grid-cols-4` and the ring in `Chakravaat.tsx` draws
its points from a single `[0,1,2,3]` array.

---

## What is not finished

Honest list, so nothing surprises you:

- Photography is absent. The brand book leans heavily on motion-blurred street
  photography and it would sit well in the hero, the case studies and the insight
  headers. Supply the library and it can be integrated with the image treatment the
  guidelines describe.
- Case study clients are anonymised pending your approval on naming. The narratives
  are written and the structure is in place; only the names are withheld.
- Client chapter imagery uses the pending field described above. Each chapter has
  a slot ready; adding `image: '/clients/naacho.jpg'` to `content/clients.ts` is the
  only change needed.
- The Framer template still could not be opened from the build environment. It did
  not matter this time — your motion brief specifies the choreography in enough
  detail to build from directly, and `docs/MOTION.md` documents exactly what was
  implemented so you can check it against the reference.
