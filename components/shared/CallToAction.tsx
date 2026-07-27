import { Monogram } from '@/components/brand/Monogram'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'
import { site } from '@/lib/site'

export function CallToAction({
  title = 'Bring us the decision you keep postponing.',
  body = 'A first conversation takes thirty minutes and costs nothing. You will leave it with our honest read on whether we are the right people — including when we are not.',
}: {
  title?: string
  body?: string
}) {
  return (
    <section id="contact" className="border-t border-line bg-ox py-section">
      <div className="shell grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-[clamp(32px,6vw,80px)]">
        <div>
          <Reveal>
            <Eyebrow className="mb-10">Begin</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-[14ch] text-[clamp(2.2rem,5.6vw,4.4rem)] font-bold leading-[0.96] tracking-[-0.035em]">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lede text-lead text-muted">{body}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap gap-3.5">
              <Button href={`mailto:${site.email}`} variant="solid" withArrow>
                {site.email}
              </Button>
              <Button href={`tel:${site.phoneHref}`}>{site.phone}</Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.24} className="order-first lg:order-none">
          <Monogram className="w-[clamp(78px,8vw,128px)]" magnetic />
        </Reveal>
      </div>
    </section>
  )
}
