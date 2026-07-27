import type { Metadata } from 'next'
import { CallToAction } from '@/components/shared/CallToAction'
import { PageHero } from '@/components/shared/PageHero'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'
import { Section, SectionHead } from '@/components/ui/section'
import { pillars, researchPrinciples } from '@/content/practice'

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How Nishaan-a works: evidence before opinion, a written position, a system that survives delegation, and briefs that hold specialist partners to a standard.',
}

const stages = [
  {
    number: '01',
    title: 'Establish what is true',
    body: 'Before anything is decided, we agree on the facts: how the category behaves, what buyers actually say, and where the business currently sits in their heads. Most engagements find that at least one closely held belief does not survive contact with the evidence.',
  },
  {
    number: '02',
    title: 'Make the decision explicit',
    body: 'Positioning is a choice between defensible options, not a phrase to be workshopped. We put the options side by side with their consequences — pricing, competitors, capabilities required — and the leadership team chooses one, in writing.',
  },
  {
    number: '03',
    title: 'Build the system around it',
    body: 'A decision that lives in one person\u2019s head is not a strategy. Naming, hierarchy, messaging and identity are structured so the position holds when it is delegated to people who were not in the room.',
  },
  {
    number: '04',
    title: 'Hold execution to it',
    body: 'We write the briefs, set the review standard and stay close enough to catch drift. Specialists execute. We do not, which is what keeps the standard honest.',
  },
]

export default function MethodologyPage() {
  return (
    <>
      <PageHero
        label="Methodology"
        title="Evidence, decision, structure, standard."
        intro="Four stages, in that order. Skipping one is the single most common reason strategy work fails to change anything."
      />
      <hr className="rule" />

      <Section>
        <div className="border-t border-line">
          {stages.map((stage, index) => (
            <Reveal key={stage.number} delay={index * 0.05}>
              <div className="grid items-start gap-x-[clamp(20px,4vw,64px)] gap-y-4 border-b border-line py-[clamp(32px,4vw,56px)] lg:grid-cols-[80px_minmax(0,1fr)_minmax(0,1.4fr)]">
                <span className="text-[0.7rem] font-medium tracking-[0.14em] text-faint">
                  {stage.number}
                </span>
                <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-bold tracking-[-0.025em]">
                  {stage.title}
                </h2>
                <p className="max-w-measure text-muted">{stage.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow className="mb-[clamp(28px,4vw,52px)]">Outputs</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionHead title="What you are left holding.">
            <p>
              Every engagement produces the same four instruments, at a depth set by the sprints you
              take.
            </p>
          </SectionHead>
        </Reveal>
        <div className="mt-[clamp(40px,5vw,64px)] grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.key} delay={index * 0.05}>
              <div className="flex h-full min-h-[220px] flex-col justify-between bg-ox p-[clamp(24px,2.4vw,36px)]">
                <span className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-faint">
                  {pillar.key}
                </span>
                <p className="mt-8 text-[0.92rem] leading-relaxed text-muted">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section rule={false}>
        <Reveal>
          <Eyebrow className="mb-[clamp(28px,4vw,52px)]">Research posture</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionHead title="How we handle evidence.">
            <p>
              Machine assistance reads at a scale we cannot. It does not decide anything, and we
              never present its output as a finding without a human argument attached.
            </p>
          </SectionHead>
        </Reveal>
        <div className="mt-[clamp(40px,5vw,64px)] grid gap-px border-y border-line bg-line md:grid-cols-3">
          {researchPrinciples.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="h-full bg-ox px-[clamp(20px,2vw,32px)] py-[clamp(24px,2.4vw,36px)]">
                <h3 className="mb-2.5 text-h3 font-bold">{item.title}</h3>
                <p className="text-[0.86rem] leading-relaxed text-subtle">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CallToAction />
    </>
  )
}
