# Performance review

Measured against the production build (`npm run build && npm start`). Development
server numbers are meaningless and should not be quoted.

## Build output

- 27 routes, all static or statically generated. No route renders on demand except
  `/api/contact`.
- 102 kB of shared JavaScript.
- Home page 174 kB first load — the heaviest route, because it carries the client
  chapters and their scroll listeners.

## Largest Contentful Paint

The LCP element is the hero statement, which is text. Nothing blocks it but the
font.

- `font-display: swap` is set on all three weights.
- **Do this before launch:** add `<link rel="preload" as="font" type="font/woff2" crossorigin>`
  for the Bold weight in `app/layout.tsx`. It is the weight that renders the hero,
  and preloading it is the single largest remaining LCP win.
- The brand marks are the supplied PNGs, served `unoptimized`. Next's optimiser
  re-encodes to lossy WebP at q=75, which shifted the ivory by one value — a
  recolour, and the brief forbids recolouring. They are flat two-colour PNGs of
  30–65 kB that already compress near-perfectly, cached immutably, so the cost of
  opting out is negligible. This is a deliberate trade, not an oversight.

## Cumulative Layout Shift

- Every mark carries an intrinsic `viewBox`; no reflow on load.
- Media frames declare an aspect ratio, so their box exists before any image does.
- The navigation is fixed and reserves no layout space.
- The chapter indicator expands the navigation on scroll. It is inside an
  `AnimatePresence` height animation, which is a transform-adjacent change on a
  fixed-position element and does not shift page content.

## Runtime

- Only `transform`, `opacity` and `filter` are animated. Nothing touches layout.
- One `requestAnimationFrame` loop, owned by Lenis. Scroll-linked values use
  Framer Motion's `useScroll`, which shares it.
- `useActiveSection` runs a single `IntersectionObserver` across all eight home
  chapters rather than one observer each.
- Scroll listeners are passive.
- `optimizePackageImports` is enabled for `lucide-react` and `framer-motion`, so
  only the icons and motion features actually used are bundled.

## Known costs

- Framer Motion is the largest dependency. It is load-bearing for the entire motion
  specification; removing it would mean reimplementing orchestration by hand.
- Blur filters on entrance are GPU-cheap but not free. They are capped at 10 px and
  removed once an element has settled, so no element holds a filter at rest.
- The client chapters are long. On a low-end mobile device the home page is a
  16,000 px scroll; sticky positioning is disabled below `lg` partly for this reason.

## Before launch

1. Add the font preload described above.
2. Run Lighthouse against the production build on a throttled connection.
3. Once real photography exists, confirm `next/image` is emitting AVIF and that the
   `sizes` attribute on `MediaFrame` matches the final column widths.
