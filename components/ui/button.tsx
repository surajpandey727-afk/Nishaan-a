'use client'

import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

const button = cva(
  'inline-flex items-center gap-[0.7em] rounded-pill text-[0.78rem] font-medium uppercase tracking-[0.1em] transition-colors duration-base ease-brand disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        solid: 'border border-ivory bg-ivory text-ox hover:bg-transparent hover:text-ivory',
        outline:
          'border border-line-strong bg-transparent text-ivory hover:border-ivory hover:bg-ivory hover:text-ox',
        ghost: 'border border-transparent bg-transparent text-ivory',
      },
      size: {
        default: 'px-[26px] py-[14px]',
        sm: 'px-[18px] py-[10px] text-[0.72rem]',
        bare: 'px-0 py-[6px]',
      },
    },
    defaultVariants: { variant: 'outline', size: 'default' },
  }
)

type Props = VariantProps<typeof button> & {
  href?: string
  children: React.ReactNode
  className?: string
  withArrow?: boolean
  magnetic?: boolean
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

/** Magnetic pointer response is disabled on touch and under reduced-motion. */
export function Button({
  href,
  children,
  className,
  variant,
  size,
  withArrow,
  magnetic = true,
  type = 'button',
  onClick,
  disabled,
}: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const live = magnetic && !reduce

  function move(event: React.PointerEvent) {
    if (!live || event.pointerType !== 'mouse') return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setOffset({
      x: (event.clientX - rect.left - rect.width / 2) * 0.22,
      y: (event.clientY - rect.top - rect.height / 2) * 0.3,
    })
  }

  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="size-[14px] shrink-0 transition-transform duration-base ease-brand group-hover:translate-x-1.5"
          strokeWidth={1.4}
          aria-hidden
        />
      )}
    </>
  )

  const classes = cn('group', button({ variant, size }), className)

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      animate={{ x: offset.x, y: offset.y }}
      transition={{ duration: 0.45, ease: EASE }}
      onPointerMove={move}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {href ? (
        href.startsWith('/') ? (
          <Link href={href} className={classes}>
            {inner}
          </Link>
        ) : (
          <a href={href} className={classes}>
            {inner}
          </a>
        )
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={classes}>
          {inner}
        </button>
      )}
    </motion.span>
  )
}
