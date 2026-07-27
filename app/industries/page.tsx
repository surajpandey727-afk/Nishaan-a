import type { Metadata } from 'next'
import { CallToAction } from '@/components/shared/CallToAction'
import { PageHero } from '@/components/shared/PageHero'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Step } from '@/components/ui/sequence'
import { Section } from '@/components/ui/section'
import { conditions } from '@/content/practice'

export const metadata: Metadata = {
  title: 'Industry agnostic',
  description:
    'Nishaan-a is industry agnostic. Positioning problems share a structure across categories; what changes is the evidence, and evidence is gathered rather than assumed.',
}

const worked = [
  'Professional services',
  'Financial services',
  'Healthcare & life sciences',
  'Consumer & culture',
  'Technology',
  'Hospitality',
  'Real estate & development',
  'Education',
  'Manufacturing',
  'Media & film',
]

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Industry agnostic"
        title="Sector is the wrong question."
        intro="Positioning problems have the same structure whether the category is diagnostics or hospitality. What changes is the evidence — and evidence is something we gather, not something we arrive with."
      />
      <hr className="rule" />

      <Section>
        <Step step="headline">
          <Eyebrow className="mb-[clamp(32px,5vw,64px)]">Why we do not specialise</Eyebrow>
        </Step>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[clamp(40px,7vw,120px)]">
          <Step step="headline" offset={0.06}>
            <h2 className="max-w-[16ch] text-h2">Category knowledge ages. Method does not.</h2>
          </Step>
          <div>
            <Step step="subheading">
              <p className="max-w-lede text-lead text-muted">
                A sector specialist arrives with conclusions. That is useful for speed and dangerous
                for accuracy, because the conclusions were formed in someone else&rsquo;s market
                three years ago.
              </p>
            </Step>
            <Step step="body" className="mt-8">
              <p className="max-w-measure text-muted">
                We arrive with a method for finding out. In practice that costs a fortnight at the
                start of an engagement and saves the far larger cost of a position built on
                borrowed assumptions. It also means we can say something a specialist rarely can:
                that the received wisdom in your category is wrong.
              </p>
            </Step>
          </div>
        </div>
      </Section>

      <Section>
        <Step step="headline">
          <Eyebrow className="mb-[clamp(32px,5vw,64px)]">Conditions</Eyebrow>
        </Step>
        <Step step="headline" offset={0.06}>
          <h2 className="max-w-[18ch] text-h2">Three conditions we look for instead.</h2>
        </Step>
        <div className="mt-[clamp(48px,6vw,80px)] grid gap-px border border-line bg-line md:grid-cols-3">
          {conditions.map((condition, index) => (
            <Step key={condition.title} step="visual" offset={index * 0.07} soft>
              <div className="h-full bg-ox p-[clamp(26px,2.6vw,40px)]">
                <h3 className="mb-3 text-h3 font-bold">{condition.title}</h3>
                <p className="text-[0.9rem] leading-relaxed text-subtle">{condition.body}</p>
              </div>
            </Step>
          ))}
        </div>
      </Section>

      <Section rule={false}>
        <Step step="headline">
          <Eyebrow className="mb-[clamp(32px,5vw,64px)]">Where the work has landed</Eyebrow>
        </Step>
        <Step step="subheading">
          <p className="max-w-lede text-lead text-muted">
            Engagements cluster here, but the list describes history rather than boundaries.
          </p>
        </Step>
        <ul className="mt-[clamp(40px,5vw,64px)] list-none border-t border-line p-0">
          {worked.map((sector, index) => (
            <Step key={sector} step="body" offset={index * 0.03} as="li" soft>
              <span className="block border-b border-line py-5 text-[clamp(1.1rem,2.2vw,1.7rem)] font-medium tracking-[-0.02em] text-muted transition-colors duration-base ease-brand hover:text-ivory">
                {sector}
              </span>
            </Step>
          ))}
        </ul>
      </Section>

      <CallToAction />
    </>
  )
}
