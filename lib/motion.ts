import type { Transition, Variants } from 'framer-motion'

/* ============================================================
   MOTION TOKENS
   Nothing in the site invents its own easing or duration.
   ============================================================ */

export const EASE = [0.22, 1, 0.36, 1] as const // everything entering
export const EASE_SOFT = [0.16, 1, 0.3, 1] as const // long cinematic moves
export const EASE_EXIT = [0.4, 0, 1, 1] as const

export const DUR = {
  micro: 0.22,
  base: 0.45,
  reveal: 0.9,
  slow: 1.1,
  mark: 1.5,
  cinematic: 1.8,
} as const

export const transition: Transition = { duration: DUR.slow, ease: EASE }

/** Fires once, and only once. Nothing in the site loops. */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
export const viewportEarly = { once: true, margin: '0px 0px -4% 0px' } as const

/* ------------------------------------------------------------
   SECTION CHOREOGRAPHY
   Every section enters in the same order:
   headline -> subheading -> body -> visual -> CTA
   The step tokens below are the delays that enforce it.
   ------------------------------------------------------------ */
export const STEP = {
  headline: 0,
  subheading: 0.12,
  body: 0.22,
  visual: 0.32,
  cta: 0.44,
} as const

/** opacity -> y translation -> blur reduction, the site's base entrance. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition },
}

/** A quieter version for dense content that should not float. */
export const revealSoft: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DUR.reveal, ease: EASE },
  },
}

/** Parent for staggered children. */
export const stagger = (delay = 0, each = 0.08): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: each } },
})

/** Masked reveal: the child rises from behind an overflow-hidden parent. */
export const maskUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: DUR.mark, ease: EASE } },
}

/** Word-level stagger for editorial statements. */
export const word: Variants = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DUR.reveal, ease: EASE },
  },
}

/** Line-level stagger for hero statements. */
export const line: Variants = {
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DUR.reveal, ease: EASE },
  },
}

/** Imagery settles from a gentle overscale — never a hard zoom. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: DUR.cinematic, ease: EASE_SOFT },
  },
}

/** Section dividers draw from the left rather than fading in. */
export const divider: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DUR.slow, ease: EASE } },
}

/** Route change: a short blur-through. Long enough to feel deliberate, no longer. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, filter: 'blur(4px)', transition: { duration: 0.28, ease: EASE_EXIT } },
}
