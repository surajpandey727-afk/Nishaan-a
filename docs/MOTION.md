# Motion specification

Every value below lives in `lib/motion.ts`. Nothing in the codebase declares its
own easing or duration; if a component needs a timing that is not here, the token
set is wrong and should be extended rather than bypassed.

## Tokens

| Token         | Value                              | Applied to                     |
| ------------- | ---------------------------------- | ------------------------------ |
| `EASE`        | `cubic-bezier(0.22, 1, 0.36, 1)`   | Everything entering            |
| `EASE_SOFT`   | `cubic-bezier(0.16, 1, 0.3, 1)`    | Long cinematic moves, imagery  |
| `EASE_EXIT`   | `cubic-bezier(0.4, 0, 1, 1)`       | Route exit only                |
| `DUR.micro`   | 220 ms                             | Hover, colour                  |
| `DUR.base`    | 450 ms                             | Interface state, accordions    |
| `DUR.reveal`  | 900 ms                             | Word and line stagger          |
| `DUR.slow`    | 1100 ms                            | Section reveals                |
| `DUR.mark`    | 1500 ms                            | Brand mark choreography        |
| `DUR.cinematic` | 1800 ms                          | Image entrances                |

## Section choreography

Every section enters in the same order. Components declare a step rather than a
delay, so the rhythm cannot drift as content changes.

```
headline     0 ms
subheading   120 ms
body         220 ms
visual       320 ms
CTA          440 ms
```

Implemented by `<Step step="body">` in `components/ui/sequence.tsx`. Repeated
items within a step pass `offset` — typically 60–70 ms each — so a four-card row
cascades without overrunning the next step.

The base entrance is always the same three properties in the same order:
opacity, Y translation, blur reduction. `reveal` moves 26 px and 6 px of blur;
`revealSoft` moves 14 px and 4 px, used for dense content that should not float.

## Page load timeline

```
0.00s  Nav mounts, transparent
0.25s  Monogram — large form begins assembly
0.42s  Monogram — small form begins assembly
0.50s  Hero headline, line stagger begins (3 lines, 120 ms apart)
0.80s  Logotype mask reveal begins (1500 ms clip-path wipe)
0.90s  Hero supporting copy
1.05s  Hero CTAs
1.75s  Monogram settled; magnetism becomes live
2.30s  Logotype fully revealed; page at rest
```

Nothing on the page animates after 2.3 s unless the user scrolls or points.

## The brand marks

**Monogram — magnetic assembly.** The supplied PNG is composited from its two
forms, separated out of the original pixels, so each can move on its own. They
arrive from opposite off-axis positions (`+26%,−24%` and `−32%,+22%`) at 38%
scale with 9 px blur, and settle into register over 1500 ms. Plays once.
Afterwards the pointer pulls them apart in opposition, the small form travelling
1.35× the large one, so the mark reads as two bodies rather than one image.
Offsets are percentages of the mark box, so the choreography is identical at
34 px in the navigation and 74 px in the hero.

**Logotype — mask reveal.** `clip-path: inset(0 0 100% 0)` to `inset(0 0 0 0)`
over 1500 ms. No rotation, no scale, ever.

## Scroll behaviour

Lenis at `lerp: 0.11`, `duration: 1.1`, `syncTouch: false` — touch keeps native
momentum, which is better than any emulation of it.

- **Parallax.** Hero bloom drifts 22% of scroll progress. Media frames drift ±40 px
  against the scroll, inset 8% so no edge is ever exposed.
- **Imagery.** Enters at `scale: 1.08`, 10 px blur, settling over 1800 ms on
  `EASE_SOFT`. A gentle settle, not a zoom.
- **Dividers.** Draw from the left via `scaleX` over 1100 ms rather than fading.
- **Sticky media.** Client chapters hold the media column at `top: 132px` while the
  text scrolls past, which is what makes each client read as a chapter change
  rather than a slide change.

## Interaction

- **Magnetic buttons.** Pointer offset × 0.22 horizontally, × 0.30 vertically,
  settling over 450 ms. Mouse only — suppressed for touch and pen.
- **Magnetic monogram.** Pointer offset normalised to ±9% of the mark box,
  opposed between the two forms.
- **Hover elevation.** Cards shift background from `ox` to `ox.raise` over 1100 ms.
  No transforms, no shadows on hover — the colour shift alone reads as lift on a
  dark ground.
- **Route change.** Blur-through: 500 ms in, 280 ms out. Deliberately brief, since
  a long transition on a content site reads as latency rather than craft.

## Rules

1. **Every reveal fires once.** All scroll animation uses `viewport={{ once: true }}`.
2. **No loops.** There is no `repeat: Infinity` anywhere in the codebase. The
   Chakravaat diagram, which describes a cycle, states it through a single
   sequenced light-up rather than by rotating forever.
3. **Never animate everything at once.** If two elements in one section share a
   delay, one of them is wrong.
4. **Compositor properties only.** `transform`, `opacity` and `filter`. Nothing
   animates layout.
5. **Reduced motion is honoured twice** — once in CSS for declarative transitions,
   once via `useReducedMotion()` in every component that animates imperatively.
