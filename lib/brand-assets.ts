/**
 * The supplied brand assets, used as delivered.
 *
 * `public/brand/source/` holds the original 8000 x 4500 uploads untouched.
 * The files below are the same artwork, cropped to the mark and resized for the
 * web — no redrawing, no re-tracing, no recolouring. The marks' own ivory is
 * #FEFEEC and is never altered.
 *
 * These are rendered with `unoptimized` on next/image. The optimiser re-encodes
 * to lossy WebP at q=75, which shifted the supplied ivory from #FEFEEC to
 * #FDFEEC — a recolour, however small. The files are flat two-colour PNGs of
 * 30–65 kB that compress near-perfectly already, so there is nothing to gain by
 * re-encoding and a brand rule to lose.
 *
 * The monogram is additionally split into its two forms so each can be animated
 * independently. The forms are separated from the original pixels and carry the
 * geometry needed to reassemble the exact original composition at any size.
 */

export const MARK_IVORY = '#FEFEEC'

export const LOGOTYPE = {
  src: '/brand/logo-ivory.png',
  width: 837,
  height: 1200,
  aspect: 0.6975,
  alt: 'Nishaan-a',
} as const

export const MONOGRAM = {
  src: '/brand/monogram-ivory.png',
  width: 1400,
  height: 1165,
  aspect: 1.20172,
} as const

/** Percentages of the full monogram box, so the composition is exact at any scale. */
export const MONOGRAM_FORMS = [
  {
    src: '/brand/monogram-form-a.png',
    width: 700,
    height: 726,
    left: 44.0196,
    top: 0,
    widthPct: 55.9804,
    heightPct: 69.7291,
    /** Off-axis origin for the assembly animation, in percent of the box. */
    from: { x: 26, y: -24 },
  },
  {
    src: '/brand/monogram-form-b.png',
    width: 700,
    height: 675,
    left: 0,
    top: 54.7114,
    widthPct: 39.1176,
    heightPct: 45.2886,
    from: { x: -32, y: 22 },
  },
] as const
