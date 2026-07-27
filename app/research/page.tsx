import type { Metadata } from 'next'
import { CallToAction } from '@/components/shared/CallToAction'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/ui/reveal'
import { Section, SectionHead } from '@/components/ui/section'
import { researchPrinciples } from '@/content/practice'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'How Nishaan-a gathers and weighs evidence: primary interviews, category corpora, structured analysis, and reasoning that is always shown.',
}

const methods = [
  {
    label: 'Interviews',
    title: 'Customers, lapsed buyers and the people who said no',
    body: 'Twelve to twenty conversations per engagement, run by the same person who will write the strategy. Transcripts are kept; quotes are attributed internally so a finding can always be traced back.',
  },
  {
    label: 'Corpora',
    title: 'The language a category uses when nobody is watching',
    body: 'Reviews, forum threads, earnings calls, job adverts and competitor copy, gathered and analysed at volume. What a market repeats is more reliable than what it reports.',
  },
  {
    label: 'Category mapping',
    title: 'Positions actually occupied, not positions claimed',
    body: 'We map where competitors sit in the buyer\u2019s mind against where their marketing says they sit. The gap between those two maps is usually where the opportunity is.',
  },
  {
    label: 'Synthesis',
    title: 'Findings with their limits attached',
    body: 'Each conclusion arrives with its evidence, its confidence and what would falsify it. You should be able to disagree with one finding without the whole argument collapsing.',
  },
]

export default function ResearchPage() {
  return (
    <>
      <PageHero
        label="Research intelligence"
        title="Opinion is cheap. We prefer evidence."
        intro="Every engagement runs on a research spine. Machine assistance reads at a scale we cannot; human judgement decides what any of it means. We always show which is which."
      />
      <hr className="rule" />

      <Section>
        <div className="border-t border-line">
          {methods.map((method, index) => (
            <Reveal key={method.label} delay={index * 0.05}>
              <div className="grid items-start gap-x-[clamp(20px,4vw,64px)] gap-y-4 border-b border-line py-[clamp(30px,3.6vw,52px)] lg:grid-cols-[160px_minmax(0,1fr)_minmax(0,1.3fr)]">
                <span className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-faint">
                  {method.label}
                </span>
                <h2 className="max-w-[24ch] text-[clamp(1.2rem,2.2vw,1.7rem)] font-bold tracking-[-0.025em]">
                  {method.title}
                </h2>
                <p className="max-w-measure text-muted">{method.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section rule={false}>
        <Reveal>
          <SectionHead title="Standards we hold the evidence to.">
            <p>
              Research is only useful if it can be argued with. These three rules make that
              possible.
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
