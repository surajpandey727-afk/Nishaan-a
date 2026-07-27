'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Monogram } from '@/components/brand/Monogram'
import { Button } from '@/components/ui/button'
import { EASE } from '@/lib/motion'
import { homeSections, primaryNav, site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { useActiveSection } from './useActiveSection'

const sectionIds = homeSections.map((section) => section.id)

export function Nav() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const onHome = pathname === '/'
  const active = useActiveSection(onHome ? sectionIds : [])

  useMotionValueEvent(scrollY, 'change', (value) => setStuck(value > 24))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[60] border-b transition-all duration-slow ease-brand',
        stuck || open
          ? 'border-line bg-ox/80 shadow-raise backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-transparent'
      )}
    >
      <nav className="shell flex h-[76px] items-center justify-between" aria-label="Primary">
        <Link href="/" className="flex items-center gap-3.5" aria-label={`${site.name}, home`}>
          <Monogram className="w-[42px]" magnetic />
          <span className="text-[0.74rem] font-bold uppercase tracking-[0.3em]">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-[clamp(18px,2.2vw,34px)] lg:flex">
          {primaryNav.map((item) => {
            const current = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'text-[0.74rem] font-medium uppercase tracking-[0.14em] transition-colors duration-base ease-brand hover:text-ivory',
                  current ? 'text-ivory' : 'text-subtle'
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Button href="/contact" variant="outline" size="sm">
            Start a conversation
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex size-10 items-center justify-center rounded-pill border border-line lg:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X className="size-4" strokeWidth={1.5} /> : <Menu className="size-4" strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Chapter indicator — only on the home page, where the chapters exist. */}
      {onHome && (
        <AnimatePresence>
          {stuck && !open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="hidden overflow-hidden border-t border-line lg:block"
            >
              <ol className="shell flex list-none items-center gap-[clamp(14px,1.8vw,30px)] py-2.5">
                {homeSections.map((section) => {
                  const current = active === section.id
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        aria-current={current ? 'true' : undefined}
                        className={cn(
                          'relative block py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] transition-colors duration-base ease-brand hover:text-ivory',
                          current ? 'text-ivory' : 'text-faint'
                        )}
                      >
                        {section.label}
                        {current && (
                          <motion.span
                            layoutId="chapter-indicator"
                            className="absolute -bottom-0.5 left-0 h-px w-full bg-ivory"
                            transition={{ duration: 0.45, ease: EASE }}
                          />
                        )}
                      </a>
                    </li>
                  )
                })}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden lg:hidden"
          >
            <div className="shell flex flex-col gap-1 pb-8 pt-2">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 text-h3 font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <Button href="/contact" variant="solid" className="mt-6 self-start" withArrow>
                Start a conversation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
