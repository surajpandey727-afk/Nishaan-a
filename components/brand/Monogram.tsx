'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import { EASE } from '@/lib/motion'
import { assetPath } from '@/lib/paths'
import { cn } from '@/lib/utils'

type Props = {
  /** 'assemble' plays the load choreography once; 'static' renders it settled. */
  mode?: 'assemble' | 'static'
  /** Cursor magnetism: the two forms drift apart under the pointer. */
  magnetic?: boolean
  className?: string
  delay?: number
  /** Supply only when the mark is the sole label for a control. */
  title?: string
  priority?: boolean
}

/**
 * The supplied Monogram_ivory.png, used as delivered.
 *
 * It is composited from its two forms — the same pixels, separated — positioned
 * by percentage so the original composition is exact at any size. Splitting it
 * is what allows each form to animate on its own; nothing is redrawn.
 *
 * Load choreography — magnetic assembly: the forms arrive from opposite off-axis
 * positions, blurred and undersized, then settle into register. Plays once.
 * Afterwards the pointer pulls them gently apart, in opposition.
 */
export function Monogram({
  mode = 'static',
  magnetic = false,
  className,
  delay = 0,
  title,
  priority = false,
}: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [pull, setPull] = useState({ x: 0, y: 0 })

  function handleMove(event: React.PointerEvent) {
    if (!magnetic || reduce || event.pointerType !== 'mouse') return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPull({
      x: ((event.clientX - rect.left - rect.width / 2) / rect.width) * 9,
      y: ((event.clientY - rect.top - rect.height / 2) / rect.height) * 9,
    })
  }

  const animated = mode === 'assemble' && !reduce
  const magnetTransition = { duration: 0.9, ease: EASE }

  return (
    <motion.div
      ref={ref}
      className={cn('relative block h-auto', className)}
      style={{ aspectRatio: 1400 / 1165 }}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      onPointerMove={handleMove}
      onPointerLeave={() => setPull({ x: 0, y: 0 })}
      initial={animated ? { opacity: 0, scale: 0.92, filter: 'blur(8px)' } : false}
      animate={animated ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      <motion.div
        className="relative size-full"
        animate={{ x: `${pull.x * 0.35}%`, y: `${pull.y * 0.35}%` }}
        transition={magnetTransition}
      >
        <Image
          src={assetPath('/brand/monogram_ivory.png')}
          alt=""
          fill
          sizes="(max-width: 990px) 200px, 400px"
          priority={priority}
          unoptimized
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  )
}
