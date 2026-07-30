'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Logotype } from '@/components/brand/Logotype'
import { Monogram } from '@/components/brand/Monogram'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { EASE, line as lineVariant, stagger } from '@/lib/motion'

const HEADLINE = ['Strategy is the decision everything else inherits.']

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  return (
    <header
      ref={ref}
      className="relative flex min-h-[166svh] items-center overflow-hidden bg-ox pb-[clamp(48px,7vh,96px)] pt-[clamp(178px,20vh,220px)] lg:items-end"
    >
      {/* Soft ambient movement — a single low-opacity ivory bloom, no gradients of hue. */}
      <motion.div
        aria-hidden
        style={{ y: reduce ? 0 : glowY }}
        className="pointer-events-none absolute -right-1/4 -top-[45%] size-[120vw] max-h-[1500px] max-w-[1500px] rounded-full"
      >
        <div className="size-full rounded-full bg-[radial-gradient(circle,rgba(247,239,236,0.055)_0%,rgba(247,239,236,0)_62%)]" />
      </motion.div>

      <div className="absolute inset-x-gutter top-[clamp(108px,16vh,180px)] flex items-center gap-4">
        <Monogram mode="assemble" magnetic className="w-[clamp(96px,9vw,150px)]" delay={0.25} />
        <Eyebrow>Nishaan-a brand strategy. before the brief.</Eyebrow>
      </div>

      <div className="shell grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,42vw)] lg:gap-[clamp(40px,8vw,120px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,38vw)]">
        <div>
          <motion.h1
            className="max-w-[16ch] text-h1"
            variants={stagger(0.5, 0.12)}
            initial="hidden"
            animate="show"
          >
            {HEADLINE.map((text) => (
              <motion.span key={text} variants={lineVariant} className="block">
                {text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-[clamp(26px,3.4vw,40px)] max-w-lede text-lead text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          >
            The work starts with diagnosis.
            What the business actually is,
            where the gap sits,
            and what position can credibly be held.
          </motion.p>

          <motion.div
            className="mt-[clamp(32px,4vw,48px)] flex flex-wrap gap-3.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.05 }}
          >
            <Button href="/contact" variant="solid" withArrow>
              Start a conversation
            </Button>
          </motion.div>
        </div>

        {/* The stacked logotype sits where it has room. Hidden on small screens so
            the monogram carries the identity alone. */}
        <Logotype
          mode="mask"
          delay={0.8}
          className="hidden w-full max-w-[500px] lg:block lg:justify-self-end lg:translate-x-[16%] xl:translate-x-[38%]"
        />
      </div>
    </header>
  )
}
