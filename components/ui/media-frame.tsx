'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MONOGRAM } from '@/lib/brand-assets'
import { imageReveal, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Props = {
  /** Supply a path under /public once photography is available. */
  src?: string
  alt: string
  /** Aspect ratio as a Tailwind class, e.g. 'aspect-[4/5]'. */
  ratio?: string
  /** Vertical drift as the frame passes through the viewport, in pixels. */
  parallax?: number
  className?: string
  caption?: string
}

/**
 * Imagery settles from a gentle overscale and drifts slightly against the scroll.
 *
 * Until the photography library exists, the frame renders a brand-derived field
 * rather than stock imagery or a grey box: Ox Blood, the monogram forms held at
 * low opacity, and a fine grain matching the treatment in the brand book. It
 * reads as intentional, and swapping in a real `src` changes nothing else.
 */
export function MediaFrame({
  src,
  alt,
  ratio = 'aspect-[4/5]',
  parallax = 40,
  className,
  caption,
}: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])

  return (
    <figure className={cn('m-0', className)}>
      <motion.div
        ref={ref}
        className={cn('relative overflow-hidden rounded-card bg-ox-raise', ratio)}
        variants={imageReveal}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div className="absolute inset-[-8%]" style={{ y: reduce ? 0 : y }}>
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <PendingField label={alt} />
          )}
        </motion.div>
      </motion.div>
      {caption && (
        <figcaption className="mt-4 text-[0.72rem] uppercase tracking-[0.14em] text-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** The placeholder field. No stock imagery, no grey box. */
function PendingField({ label }: { label: string }) {
  return (
    <div className="relative size-full bg-ox-raise">
      <Image
        src={MONOGRAM.src}
        alt=""
        width={MONOGRAM.width}
        height={MONOGRAM.height}
        className="absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
        aria-hidden
      />

      {/* Fine grain, matching the treatment the brand book applies to photography. */}
      <svg className="absolute inset-0 size-full opacity-[0.16] mix-blend-overlay" aria-hidden>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <span className="sr-only">{label} — image pending</span>
    </div>
  )
}
