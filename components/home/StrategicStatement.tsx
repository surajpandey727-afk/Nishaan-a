'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Statement } from '@/components/ui/statement'
import { Step } from '@/components/ui/sequence'
import { NishaaScore } from './NishaaScore'

/**
 * Strategic statement with integrated Nishaan-a Score diagnostic.
 * Left: statement and description.
 * Right: Score module (responsive stacking on mobile).
 */
export function StrategicStatement() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section
      ref={ref}
      className="relative flex min-h-auto items-center overflow-hidden py-section"
      aria-label="Strategic statement"
    >
      <motion.div
        aria-hidden
        style={{ y: reduce ? 0 : drift }}
        className="pointer-events-none absolute left-1/2 top-1/2 size-[90vw] max-h-[1100px] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(247,239,236,0.045)_0%,rgba(247,239,236,0)_65%)]"
      />
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Statement */}
          <div className="min-w-0">
            <Statement
              as="p"
              each={0.05}
              text="We do not sell marketing. We build the clarity a business is run on."
              className="max-w-[15ch] text-[clamp(2.1rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.04em]"
            />
            <Step step="body" className="mt-14">
              <p className="max-w-lede text-lead text-muted">
                Positioning, architecture, intelligence. The decisions that determine whether everything
                downstream has anywhere to go.
              </p>
            </Step>
          </div>

          {/* Right: Score Module */}
          <div className="min-w-0">
            <NishaaScore />
          </div>
        </div>
      </div>
    </section>
  )
}
