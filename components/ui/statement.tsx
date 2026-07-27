'use client'

import { motion } from 'framer-motion'
import { stagger, viewportOnce, word } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Editorial statement with word-level stagger. Used sparingly — a page
 * carries at most one, or the device stops meaning anything.
 */
export function Statement({
  text,
  className,
  delay = 0,
  each = 0.045,
  as = 'h2',
}: {
  text: string
  className?: string
  delay?: number
  each?: number
  as?: 'h1' | 'h2' | 'p'
}) {
  const Tag = motion[as]
  return (
    <Tag
      className={cn(className)}
      variants={stagger(delay, each)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {text.split(' ').map((piece, index) => (
        <span key={`${piece}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={word} className="inline-block">
            {piece}
            {'\u00A0'}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
