'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Monogram } from '@/components/brand/Monogram'
import { MARK_IVORY } from '@/lib/brand-assets'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Step } from '@/components/ui/sequence'
import { Section } from '@/components/ui/section'
import { chakravaat } from '@/content/practice'
import { EASE, viewportOnce } from '@/lib/motion'

/**
 * The IP section. The framework is a loop, so the diagram is a loop — the two
 * monogram forms orbit a ring of four phases. The orbit is the one place on the
 * site with continuous motion, and it is slow enough to read as ambient.
 */
export function Chakravaat() {
  const reduce = useReducedMotion()

  return (
    <Section id="chakravaat">
      <Step step="headline">
        <Eyebrow className="mb-[clamp(32px,5vw,64px)]">Our IP — Chakravaat</Eyebrow>
      </Step>

      <div className="grid gap-[clamp(40px,6vw,96px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <Step step="headline" offset={0.06}>
            <h2 className="max-w-[15ch] text-h2">A strategy that keeps turning.</h2>
          </Step>
          <Step step="subheading" className="mt-8">
            <p className="max-w-lede text-lead text-muted">{chakravaat.meaning}</p>
          </Step>
          <Step step="body" className="mt-7">
            <p className="max-w-measure text-muted">{chakravaat.premise}</p>
          </Step>
        </div>

        {/* The loop */}
        <Step step="visual" className="flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[380px]">
            <svg viewBox="0 0 200 200" className="size-full" aria-hidden>
              <motion.circle
                cx="100"
                cy="100"
                r="76"
                fill="none"
                stroke="rgb(247 239 236 / 0.18)"
                strokeWidth="0.6"
                initial={{ pathLength: 0, rotate: -90 }}
                whileInView={{ pathLength: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 2.2, ease: EASE }}
                style={{ transformOrigin: 'center' }}
              />
              {[0, 1, 2, 3].map((i) => {
                const angle = (i / 4) * Math.PI * 2 - Math.PI / 2
                return (
                  <motion.circle
                    key={i}
                    cx={100 + Math.cos(angle) * 76}
                    cy={100 + Math.sin(angle) * 76}
                    r="2.6"
                    fill={MARK_IVORY}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.55, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.9 + i * 0.16 }}
                    style={{ transformOrigin: 'center' }}
                  />
                )
              })}
            </svg>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={reduce ? false : { opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            >
              <Monogram className="w-[40%]" />
            </motion.div>
          </div>
        </Step>
      </div>

      {/* Phases */}
      <div className="mt-[clamp(48px,6vw,88px)] grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        {chakravaat.phases.map((phase, index) => (
          <Step key={phase.key} step="cta" offset={index * 0.07} soft>
            <div className="flex h-full min-h-[240px] flex-col justify-between bg-ox p-[clamp(26px,2.6vw,40px)] transition-colors duration-slow ease-brand hover:bg-ox-raise">
              <span className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-faint">
                {phase.key}
              </span>
              <div>
                <h3 className="mb-3 text-[1.18rem] font-bold leading-[1.28] tracking-[-0.02em]">
                  {phase.title}
                </h3>
                <p className="text-[0.9rem] leading-relaxed text-subtle">{phase.body}</p>
              </div>
            </div>
          </Step>
        ))}
      </div>
    </Section>
  )
}
