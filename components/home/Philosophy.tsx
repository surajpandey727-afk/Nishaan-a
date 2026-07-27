'use client'

import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Step } from '@/components/ui/sequence'
import { Section } from '@/components/ui/section'
import { symptoms } from '@/content/practice'

/**
 * The philosophy is stated as a diagnosis rather than a set of values.
 * Numbering is avoided here — these are simultaneous conditions, not a sequence.
 */
export function Philosophy() {
  return (
    <Section id="philosophy">
      <Step step="headline">
        <Eyebrow className="mb-[clamp(32px,5vw,64px)]">Our philosophy</Eyebrow>
      </Step>

      <Step step="headline" offset={0.06}>
        <h2 className="max-w-[18ch] text-h2">
          Most businesses are well executed and badly decided.
        </h2>
      </Step>

      <Step step="subheading" className="mt-10">
        <p className="max-w-lede text-lead text-muted">
          nishaan-a works at the point where commercial reality becomes a usable brand position.
          The practice is governed by a simple discipline: reality before rhetoric, structure before
          story, and category before messaging.
        </p>
      </Step>

      <div className="mt-[clamp(48px,6vw,80px)] border-t border-line">
        {symptoms.map((item, index) => (
          <Step key={item.text} step="body" offset={index * 0.07} soft>
            <motion.div
              whileHover={{ y: -4 }}
              className="grid items-baseline gap-x-[clamp(20px,4vw,64px)] gap-y-2 border-b border-line py-[clamp(26px,3.2vw,42px)] sm:grid-cols-[auto_minmax(0,1fr)] transition-transform duration-200 ease-brand"
            >
              <span className="whitespace-nowrap text-eyebrow font-medium uppercase text-faint">
                {item.kind}
              </span>
              <span className="max-w-[38ch] text-[clamp(1.15rem,2.1vw,1.7rem)] font-medium leading-[1.32] tracking-[-0.02em]">
                {item.text}
              </span>
            </motion.div>
          </Step>
        ))}
      </div>
    </Section>
  )
}
