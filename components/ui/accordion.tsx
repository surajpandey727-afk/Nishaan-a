'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

export type AccordionItem = { question: string; answer: string }

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className={cn('border-t border-line', className)}>
      {items.map((item, index) => {
        const expanded = open === index
        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex w-full items-baseline justify-between gap-8 py-7 text-left text-h3 font-medium transition-colors duration-base ease-brand hover:text-ivory"
              >
                <span>{item.question}</span>
                <Plus
                  className={cn(
                    'mt-1 size-4 shrink-0 text-subtle transition-transform duration-base ease-brand',
                    expanded && 'rotate-45'
                  )}
                  strokeWidth={1.4}
                  aria-hidden
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-measure pb-8 text-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
