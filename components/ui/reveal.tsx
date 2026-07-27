'use client'

import { motion } from 'framer-motion'
import { reveal, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
}

/** Scroll reveal: fade, rise and de-blur. Fires once. */
export function Reveal({ children, className, delay = 0, as = 'div' }: Props) {
  const Tag = motion[as]
  return (
    <Tag
      className={cn(className)}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}
