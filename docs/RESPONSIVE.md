# Responsive behaviour

## Breakpoints

Tailwind defaults, used sparingly. Most sizing is fluid rather than stepped, so
there are far fewer breakpoint jumps than a typical build.

| Name   | Width   | What changes                                         |
| ------ | ------- | ---------------------------------------------------- |
| base   | 0–639   | Single column throughout                             |
| `sm`   | 640     | Two-column card grids, footer splits                 |
| `md`   | 768     | Three-column grids                                   |
| `lg`   | 1024    | Full navigation, two-column sections, sticky media   |
| `xl`   | 1280    | Four-column grids                                    |

## Fluid scales

Type and space are `clamp()` throughout, so layout breathes between breakpoints
instead of stepping.

```
Gutter    clamp(22px, 5vw, 88px)
Section   clamp(96px, 13vw, 196px)
h1        clamp(2.9rem, 7.6vw, 6.6rem)
h2        clamp(2rem, 4.3vw, 3.5rem)
Lead      clamp(1.02rem, 1.35vw, 1.28rem)
```

Content is capped at 1320 px, measure at 56 ch, and lede paragraphs at 52 ch.

## Section behaviour

**Hero.** `min-height: 100svh` — `svh`, not `vh`, so mobile browser chrome does not
clip it. Bottom-aligned above `lg`, centred below. The stacked logotype is hidden
under `lg`; the monogram carries the identity alone rather than the two marks
competing in a narrow column.

**Client chapters.** Two columns above `lg` with the media sticky at `top: 132px`,
alternating side by index. Below `lg` they collapse to one column, sticky is
dropped, and the media sits between the callouts and the quote so the reading
order still makes sense.

**Chapter indicator.** Appears in the navigation on scroll, `lg` and above only.
On smaller screens it would consume a third of the viewport to convey position,
which is a bad trade.

**Card grids.** 4 → 2 → 1 for the Chakravaat phases and sprint deliverables;
3 → 1 for conditions and metrics. Metrics stay at three across on mobile because
the values are short and the row reads as a unit.

**Tables and lists.** Every horizontally-structured row (sprints, methodology
stages, symptoms) collapses to stacked with the label above the value.

## Verified

Zero horizontal overflow at 390, 768, 1024 and 1440 px. Touch targets are 40 px
minimum. Hover-only affordances have a non-hover equivalent everywhere.
