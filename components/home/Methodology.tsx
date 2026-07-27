import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Step } from '@/components/ui/sequence'
import { Section } from '@/components/ui/section'

const stages = [
  {
    number: '01',
    title: 'Establish what is true',
    body: 'The facts before the argument: how the category behaves, what buyers actually say, and where the business sits in their heads today.',
  },
  {
    number: '02',
    title: 'Make the decision explicit',
    body: 'Options placed side by side with their consequences. The leadership team chooses one, in writing, and owns it.',
  },
  {
    number: '03',
    title: 'Build the system around it',
    body: 'Naming, hierarchy, messaging and identity structured so the position holds when it is delegated.',
  },
  {
    number: '04',
    title: 'Hold execution to it',
    body: 'We write the briefs and set the review standard. Specialists execute. We do not, which keeps the standard honest.',
  },
]

/** Numbered because it genuinely is a sequence — each stage depends on the last. */
export function Methodology() {
  return (
    <Section id="methodology">
      <Step step="headline">
        <Eyebrow className="mb-[clamp(32px,5vw,64px)]">Methodology</Eyebrow>
      </Step>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[clamp(40px,7vw,120px)]">
        <Step step="headline" offset={0.06}>
          <h2 className="max-w-[13ch] text-h2">Evidence, decision, structure, standard.</h2>
        </Step>
        <Step step="subheading">
          <p className="max-w-lede text-lead text-muted">
            Four stages, in that order. Skipping one is the single most common reason strategy work
            fails to change anything.
          </p>
        </Step>
      </div>

      <div className="mt-[clamp(48px,6vw,80px)] border-t border-line">
        {stages.map((stage, index) => (
          <Step key={stage.number} step="body" offset={index * 0.07} soft>
            <div className="grid items-start gap-x-[clamp(20px,4vw,64px)] gap-y-3 border-b border-line py-[clamp(26px,3.2vw,44px)] lg:grid-cols-[72px_minmax(0,1fr)_minmax(0,1.4fr)]">
              <span className="text-[0.7rem] font-medium tracking-[0.14em] text-faint">
                {stage.number}
              </span>
              <h3 className="text-[clamp(1.2rem,2.2vw,1.7rem)] font-bold tracking-[-0.025em]">
                {stage.title}
              </h3>
              <p className="max-w-measure text-subtle">{stage.body}</p>
            </div>
          </Step>
        ))}
      </div>

      <Step step="cta" className="mt-12">
        <Link
          href="/methodology"
          className="group inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-[0.1em]"
        >
          The full method
          <ArrowRight
            className="size-3.5 transition-transform duration-base ease-brand group-hover:translate-x-1.5"
            strokeWidth={1.4}
            aria-hidden
          />
        </Link>
      </Step>
    </Section>
  )
}
