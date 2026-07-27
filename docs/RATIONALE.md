# Design rationale

## The problem with the obvious answer

A brand strategy consultancy is one of the easiest briefs to make generic. The
default outputs itself: a dark hero, an oversized statement, three service cards,
a logo wall, a testimonial slider. It is competent and it says nothing, which for
a practice whose entire proposition is *we make you legible* would be a failure of
the argument as much as of the design.

So the site is built on one governing idea: **the structure should demonstrate the
service.** Every device on the page is doing a job the practice claims to do.

## Where the visual language came from

The brand book is a presentation, not a website, and copying it would have
produced a slide deck in a browser. What transferred was its grammar, not its
layouts.

**The `BOLD | medium` label.** Every slide in the brand book is titled this way.
It became the site's section eyebrow — the one piece carried across literally.
It means page structure is legible before a word of body copy is read, which is
the same claim the practice makes about businesses.

**Extreme margins.** The brand book leaves most of each slide empty. That pacing
became `clamp(96px, 13vw, 196px)` of vertical section space and a hard 56 ch
measure. On a dark ground this reads as confidence rather than emptiness.

**One idea per surface.** No brand book slide carries two arguments. Neither does
any section here.

**The monogram as punctuation.** In the brand book the two forms appear as a mark
in the corner of a composition rather than as a logo. They are used the same way
here: in the navigation, above the hero eyebrow, closing the call to action, and
at 7% opacity inside media frames.

## Colour

Two locked values, Ox Blood and Ivory. Everything else is derived from them and
introduces no hue that is not already in the palette.

This was the one place the two source documents disagreed. Your brief says derive
everything from Ox Blood; the brand book leans hard on Lemon and Tangerine. The
brief won, because a single-hue site with eight steps of derived value reads more
expensive than a two-accent one, and because restraint is the argument. Lemon can
be reinstated as a link and focus accent in one line of `tailwind.config.ts` if you
disagree — the tokens are already named for it.

The derived ramp is deliberately narrow: `ox.deep` for recessed bands, `ox.raise`
for cards and hover, `ox.raise2` for pressed. Ivory appears at 100%, 66%, 44%, 28%
and 13%. Five values of one colour is enough to build an entire interface, and
holding to five is why the site does not look assembled from components.

## Typography

One family, three weights, and a scale that is fluid rather than stepped. There is
no display face paired against a body face, because ITC Avant Garde Gothic Pro at
Bold and Book already produces enough contrast, and adding a second family to a
single-family brand would have been a designer's preference overriding a brand
rule.

The risk with Avant Garde is that its geometry turns cold at large sizes. That is
handled with tight negative tracking on headings (−0.04 em at hero, −0.028 em at
h2) and a 0.92 line-height, so the hero reads as a set block rather than a row of
circles.

## The one risk taken

**Client work is presented as chapters, not testimonials.**

The brief asked for testimonials and explicitly ruled out carousels and cards. The
answer was to go further: each client occupies its own full viewport, with a sticky
media column, alternating sides, and a reading order that runs title → outcome →
brand statement → argument → callouts → metrics → quote. The scroll carries you
from one to the next, and the sticky media held against scrolling text is what
makes the transition feel like a change of chapter rather than a change of slide.

It costs a great deal of vertical space — roughly 40% of the home page — and that
is the risk. It is justified because the practice sells the ability to tell a
business's story properly. Three stories told properly is a stronger proof than
nine logos.

## Structural devices, and why each one earns its place

**Numbering appears twice, and only where content is genuinely sequential:** the
four methodology stages and the four sprints, where each step depends on the last.
The Chakravaat phases are numbered nowhere, because it is a loop with no first
element. The philosophy symptoms are labelled *Symptom* and *Cause* rather than
01–04, because they are simultaneous conditions, not an order.

**The chapter indicator** in the navigation exists because the home page is long
and has a genuine reading order. It appears only on scroll, only on the home page,
and only above `lg`.

**The animated divider** draws from the left instead of fading. It is the only
purely decorative motion on the site, and it survives because it marks the seam
between chapters, which is information.

## What was deliberately left out

- Logo walls. The practice takes three clients at a time; a logo wall would be
  either dishonest or embarrassing.
- Statistics in the hero. "200+ projects delivered" is an agency claim, and the
  site's first job is to say this is not an agency.
- A services grid. Services are the wrong frame for a practice that sells
  decisions. The sprints do that work, with durations attached, which is a harder
  and more credible commitment.
- Stock photography and illustration, per the brief. Media frames render a
  brand-derived field until your library arrives.
