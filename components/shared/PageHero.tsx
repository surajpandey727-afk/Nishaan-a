'use client'

import { motion } from 'framer-motion'
import { Monogram } from '@/components/brand/Monogram'
import { Eyebrow } from '@/components/ui/eyebrow'
import { EASE, reveal } from '@/lib/motion'

/** Interior page opener. Shorter than the home hero, same typographic logic. */
export function PageHero({
  label,
  title,
  intro,
}: {
  label: string
  title: string
  intro?: string
}) {
  return (
    <header className="pb-[clamp(56px,7vw,96px)] pt-[clamp(140px,18vh,220px)]">
      <div className="shell">
        <motion.div
          className="mb-10 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Monogram mode="assemble" className="w-[56px]" magnetic />
          <Eyebrow>{label}</Eyebrow>
        </motion.div>

        <motion.h1
          className="max-w-[18ch] text-h1"
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        >
          {title}
        </motion.h1>

        {intro && (
          <motion.p
            className="mt-9 max-w-lede text-lead text-muted"
            variants={reveal}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </header>
  )
}
