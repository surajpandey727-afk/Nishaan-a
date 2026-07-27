import type { Metadata } from 'next'
import { CallToAction } from '@/components/shared/CallToAction'
import { PageHero } from '@/components/shared/PageHero'
import { Accordion } from '@/components/ui/accordion'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'
import { Section, SectionHead } from '@/components/ui/section'
import { faqs } from '@/content/practice'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Nishaan-a is a three-client brand strategy practice in Mumbai. We work upstream on clarity, positioning and structure, and coordinate execution through specialist partners.',
}

const principles = [
  {
    title: 'We take the decision, not the brief',
    body: 'A brief describes the symptom the client has already diagnosed. Our first job is to check that diagnosis, and to say so plainly when it is wrong.',
  },
  {
    title: 'Senior attention or none',
    body: 'There is no delivery layer between you and the people doing the thinking. That caps how much work we can hold, which is the point.',
  },
  {
    title: 'We do not execute',
    body: 'Independence is worth more than margin. We brief specialists — film, design, media, engineering — and hold them to the standard, but we do not sell you their hours.',
  },
  {
    title: 'Written, not presented',
    body: 'Everything of consequence exists as a document that survives without us in the room. Slides are a summary of the thinking, never a substitute for it.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="A practice built around the decision, not the deliverable."
        intro="Nishaan-a was founded in Mumbai on a narrow premise: that most of what businesses buy from agencies is execution against a strategy nobody ever wrote down. We write it down."
      />
      <hr className="rule" />

      <Section>
        <Reveal>
          <Eyebrow className="mb-[clamp(28px,4vw,52px)]">Principles</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionHead title="Four commitments we do not negotiate.">
            <p>
              These are not values on a wall. Each one costs us revenue in a predictable way, which
              is how you can tell we mean them.
            </p>
          </SectionHead>
        </Reveal>

        <div className="mt-[clamp(40px,5vw,64px)] grid gap-px border border-line bg-line sm:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.06}>
              <div className="h-full bg-ox p-[clamp(26px,2.6vw,40px)] transition-colors duration-slow ease-brand hover:bg-ox-raise">
                <h3 className="mb-3 text-h3 font-bold">{principle.title}</h3>
                <p className="max-w-measure text-[0.92rem] leading-relaxed text-subtle">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section rule={false}>
        <Reveal>
          <Eyebrow className="mb-[clamp(28px,4vw,52px)]">Questions</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-[18ch] text-h2">The things people ask before the first call.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion items={faqs as unknown as { question: string; answer: string }[]} className="mt-[clamp(40px,5vw,64px)]" />
        </Reveal>
      </Section>

      <CallToAction />
    </>
  )
}
