import Link from 'next/link'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'
import { Section, SectionHead } from '@/components/ui/section'
import { insights } from '@/content/practice'

export function Thinking() {
  return (
    <Section id="thinking" rule={false}>
      <Reveal>
        <Eyebrow className="mb-[clamp(28px,4vw,52px)]">Selected thinking</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <SectionHead title="Notes from the practice.">
          <p>
            Written when we have something to say, which is less often than a content calendar would
            prefer.
          </p>
        </SectionHead>
      </Reveal>

      <div className="mt-[clamp(40px,5vw,64px)] grid gap-px border border-line bg-line md:grid-cols-3">
        {insights.map((note, index) => (
          <Reveal key={note.slug} delay={index * 0.06}>
            <Link
              href={`/insights/${note.slug}`}
              className="flex h-full min-h-[260px] flex-col gap-4 bg-ox p-[clamp(26px,2.6vw,40px)] transition-colors duration-slow ease-brand hover:bg-ox-raise"
            >
              <span className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-faint">
                {note.kind}
              </span>
              <h3 className="mt-auto text-[1.22rem] font-bold leading-[1.28] tracking-[-0.02em]">
                {note.title}
              </h3>
              <span className="text-[0.74rem] uppercase tracking-[0.1em] text-faint">
                Read — {note.readingTime}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
