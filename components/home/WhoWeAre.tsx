import { Eyebrow } from '@/components/ui/eyebrow'
import { Step } from '@/components/ui/sequence'
import { Section } from '@/components/ui/section'

export function WhoWeAre() {
  return (
    <Section id="who-we-are">
      <Step step="headline">
        <Eyebrow className="mb-[clamp(32px,5vw,64px)]">Who we are</Eyebrow>
      </Step>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[clamp(40px,7vw,120px)]">
        <Step step="headline" offset={0.06}>
          <h2 className="max-w-[14ch] text-h2">A small practice, deliberately.</h2>
        </Step>
        <div>
          <Step step="subheading">
            <p className="max-w-lede text-lead text-muted">
              Agencies are built to produce volume. We are built to produce decisions. That
              difference shapes everything: how few clients we take, how long we stay, and what we
              refuse to sell.
            </p>
          </Step>
          <Step step="body" className="mt-8">
            <p className="max-w-measure text-muted">
              Founded in Mumbai, we work with founders and leadership teams at the point where
              ambition outpaces definition — when a business is doing well enough to be busy and
              unclear at the same time. We give it a spine: a position that can be defended, a
              structure that can be delegated, and language that survives contact with the market.
            </p>
          </Step>
        </div>
      </div>
    </Section>
  )
}
