'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { MediaFrame } from '@/components/ui/media-frame'
import { Statement } from '@/components/ui/statement'
import { Step } from '@/components/ui/sequence'
import type { ClientChapter } from '@/content/clients'
import { divider, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * A client chapter, not a testimonial card.
 *
 * Each occupies its own viewport, alternates side, and enters in the site's
 * standard order — title, outcome, statement, body, media, metrics, quote.
 * The media column is sticky through the chapter so the text scrolls against
 * a held image, which is what makes the transition between clients read as a
 * change of chapter rather than a change of slide.
 */
export function ClientChapter({
  client,
  index,
  linked = true,
  standalone = false,
}: {
  client: ClientChapter
  index: number
  linked?: boolean
  /** On a dedicated page the hero already carries the title, so suppress it here. */
  standalone?: boolean
}) {
  const flipped = index % 2 === 1

  return (
    <article
      id={client.slug}
      className="relative border-b border-line py-[clamp(80px,11vw,168px)]"
      aria-labelledby={`${client.slug}-title`}
    >
      <div className="shell">
        {/* Chapter marker */}
        <div
          className={cn(
            'mb-[clamp(36px,5vw,72px)] flex items-baseline justify-between gap-6',
            standalone && 'hidden'
          )}
        >
          <Step step="headline">
            <p className="flex flex-wrap items-center gap-x-[0.7em] text-eyebrow font-medium uppercase text-subtle">
              <b className="font-bold text-muted">{client.name}</b>
              <span className="text-faint" aria-hidden>
                |
              </span>
              {client.sector}
            </p>
          </Step>
          <Step step="headline" offset={0.06}>
            <span className="text-eyebrow font-medium uppercase tracking-[0.24em] text-faint">
              {String(index + 1).padStart(2, '0')} / {client.period}
            </span>
          </Step>
        </div>

        <motion.hr
          className={cn(
            'mb-[clamp(40px,5vw,80px)] h-px origin-left border-0 bg-line',
            standalone && 'hidden'
          )}
          variants={divider}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        />

        <div
          className={cn(
            'grid gap-[clamp(40px,6vw,96px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]',
            flipped && 'lg:[&>*:first-child]:order-2'
          )}
        >
          {/* Text column */}
          <div>
            {!standalone && (
              <>
                <Statement
                  as="h2"
                  text={client.title}
                  className="max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.035em]"
                />
                <Step step="subheading" className="mt-8">
                  <p className="max-w-lede text-lead text-muted">{client.outcome}</p>
                </Step>
              </>
            )}

            <Step step="body" className={standalone ? '' : 'mt-10'}>
              <p className="max-w-[24ch] text-[clamp(1.2rem,2.2vw,1.65rem)] font-medium leading-[1.28] tracking-[-0.02em] text-ivory">
                “{client.statement}”
              </p>
            </Step>

            <Step step="body" offset={0.06} className="mt-10">
              <p className="max-w-measure text-muted">{client.body}</p>
            </Step>

            {/* Callouts */}
            <ul className="mt-12 list-none border-t border-line p-0">
              {client.callouts.map((callout, i) => (
                <Step key={callout} step="body" offset={0.12 + i * 0.06} as="li" soft>
                  <span className="block border-b border-line py-4 text-[0.94rem] leading-relaxed text-subtle">
                    {callout}
                  </span>
                </Step>
              ))}
            </ul>
          </div>

          {/* Media column — held while the text scrolls past it */}
          <div className="lg:sticky lg:top-[132px] lg:self-start">
            <MediaFrame
              src={client.image}
              alt={client.imageAlt}
              ratio="aspect-[4/5]"
              caption={`${client.name} · ${client.engagement.join(' · ')}`}
            />

            {/* Metrics */}
            <dl className="mt-px grid grid-cols-3 gap-px bg-line">
              {client.metrics.map((metric, i) => (
                <Step key={metric.label} step="visual" offset={i * 0.07} soft>
                  <div className="h-full bg-ox px-4 py-6">
                    <dt className="sr-only">{metric.label}</dt>
                    <dd className="m-0">
                      <span className="block text-[clamp(1.1rem,2vw,1.6rem)] font-bold leading-none tracking-[-0.03em]">
                        {metric.value}
                      </span>
                      <span className="mt-2.5 block text-[0.68rem] uppercase leading-[1.5] tracking-[0.14em] text-faint">
                        {metric.label}
                      </span>
                    </dd>
                  </div>
                </Step>
              ))}
            </dl>
          </div>
        </div>

        {/* Quote — full measure, breaking the two-column rhythm deliberately */}
        <Step step="cta" className="mt-[clamp(56px,7vw,112px)]">
          <blockquote className="m-0 border-l border-line-strong pl-7">
            <p className="max-w-[46ch] text-[clamp(1.15rem,2.1vw,1.55rem)] font-medium leading-[1.42] tracking-[-0.018em]">
              “{client.quote.text}”
            </p>
            <footer className="mt-6 text-eyebrow font-medium uppercase tracking-[0.2em] text-faint">
              {client.quote.attribution} · {client.quote.role}
            </footer>
          </blockquote>
        </Step>

        {linked && (
          <Step step="cta" offset={0.08} className="mt-12">
            <Link
              href={`/case-studies/${client.slug}`}
              className="group inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-[0.1em] text-ivory"
            >
              Read the full chapter
              <ArrowRight
                className="size-3.5 transition-transform duration-base ease-brand group-hover:translate-x-1.5"
                strokeWidth={1.4}
                aria-hidden
              />
            </Link>
          </Step>
        )}
      </div>
    </article>
  )
}
