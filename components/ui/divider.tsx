'use client'

import { motion } from 'framer-motion'
import { divider, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

/** Section dividers draw from the left. They are the only decorative motion. */
export function AnimatedDivider({ className }: { className?: string }) {
  return (
    <motion.hr
      className={cn('h-px w-full origin-left border-0 bg-line', className)}
      variants={divider}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    />
  )
}
