'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { assetPath } from '@/lib/paths'
import { cn } from '@/lib/utils'

type Props = {
  /** 'mask' wipes the mark upward from behind a clip; 'static' just renders it. */
  mode?: 'mask' | 'static'
  className?: string
  delay?: number
  priority?: boolean
}

/**
 * The supplied Logo_ivory.png, used as delivered.
 *
 * Revealed with a clip-path wipe — no rotation, no scaling, no gimmick.
 */
export function Logotype({ mode = 'static', className, delay = 0.55, priority = false }: Props) {
  const reduce = useReducedMotion()
  const animated = mode === 'mask' && !reduce

  return (
    <motion.div
      className={cn('relative block h-auto', className)}
      style={{ aspectRatio: 837 / 1200 }}
      initial={animated ? { clipPath: 'inset(0 0 100% 0)', opacity: 0 } : false}
      animate={animated ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : undefined}
      transition={{ duration: 1.5, ease: EASE, delay, opacity: { duration: 0.01, delay } }}
    >
      <Image
        src={assetPath('/brand/logo_ivory.png')}
        alt="Nishaan-a"
        fill
        sizes="(max-width: 1024px) 120px, 200px"
        priority={priority}
        unoptimized
        className="object-contain"
      />
    </motion.div>
  )
}
