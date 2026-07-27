'use client'

import { motion } from 'framer-motion'
import { reveal, revealSoft, STEP, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Step = keyof typeof STEP

/**
 * Section choreography. Every section enters in the same order —
 * headline, subheading, body, visual, CTA — and each element declares
 * which step it belongs to rather than inventing its own delay.
 */
export function Step({
  step,
  children,
  className,
  offset = 0,
  soft = false,
  as = 'div',
}: {
  step: Step
  children: React.ReactNode
  className?: string
  /** Extra delay for repeated items within one step, e.g. a list. */
  offset?: number
  soft?: boolean
  as?: 'div' | 'li' | 'article' | 'header' | 'section'
}) {
  const Tag = motion[as]
  return (
    <Tag
      className={cn(className)}
      variants={soft ? revealSoft : reveal}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay: STEP[step] + offset }}
    >
      {children}
    </Tag>
  )
}
