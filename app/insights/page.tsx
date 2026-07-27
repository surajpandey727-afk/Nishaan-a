import type { Metadata } from 'next'
import Link from 'next/link'
import { CallToAction } from '@/components/shared/CallToAction'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { insights } from '@/content/practice'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Writing from the Nishaan-a practice on positioning, category choice, research method and the economics of strategy work.',
}

const formatter = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function InsightsPage() {
  return (
    <>
      <PageHero
        label="Insights"
        title="Notes from the practice."
        intro="Written when we have something to say, which is less often than a content calendar would prefer."
      />
      <hr className="rule" />

      <Section rule={false}>
        <div className="border-t border-line">
          {insights.map((note, index) => (
            <Reveal key={note.slug} delay={index * 0.05}>
              <Link
                href={`/insights/${note.slug}`}
                className="group grid items-start gap-x-[clamp(20px,4vw,64px)] gap-y-4 border-b border-line py-[clamp(30px,3.6vw,52px)] transition-[padding,background] duration-slow ease-brand hover:bg-gradient-to-r hover:from-ox-raise hover:to-transparent hover:pl-4 lg:grid-cols-[150px_minmax(0,1.2fr)_minmax(0,1fr)]"
              >
                <span className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-faint">
                  {note.kind}
                </span>
                <div>
                  <h2 className="max-w-[26ch] text-[clamp(1.3rem,2.4vw,1.9rem)] font-bold tracking-[-0.025em]">
                    {note.title}
                  </h2>
                  <p className="mt-4 max-w-measure text-[0.92rem] leading-relaxed text-subtle">
                    {note.excerpt}
                  </p>
                </div>
                <span className="text-[0.72rem] uppercase tracking-[0.14em] text-faint lg:text-right">
                  {formatter.format(new Date(note.date))} · {note.readingTime}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CallToAction />
    </>
  )
}
