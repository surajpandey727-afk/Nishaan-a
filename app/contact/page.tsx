import type { Metadata } from 'next'
import { ContactForm } from '@/components/shared/ContactForm'
import { PageHero } from '@/components/shared/PageHero'
import { Section } from '@/components/ui/section'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a conversation with Nishaan-a. Thirty minutes, no charge, and an honest read on whether we are the right people for the problem.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Bring us the decision you keep postponing."
        intro="A first conversation takes thirty minutes and costs nothing. You will leave it with our honest read on whether we are the right people — including when we are not."
      />
      <hr className="rule" />

      <Section rule={false}>
        <div className="grid gap-[clamp(40px,6vw,96px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="space-y-10">
            <div>
              <h2 className="mb-3 text-eyebrow font-bold uppercase text-faint">Direct</h2>
              <a
                href={`mailto:${site.email}`}
                className="block text-[clamp(1.1rem,2vw,1.4rem)] font-medium transition-colors hover:text-ivory"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="mt-1 block text-[clamp(1.1rem,2vw,1.4rem)] font-medium text-muted transition-colors hover:text-ivory"
              >
                {site.phone}
              </a>
            </div>
            <div>
              <h2 className="mb-3 text-eyebrow font-bold uppercase text-faint">Studio</h2>
              <p className="text-muted">
                {site.address.city}, {site.address.country}
                <br />
                {site.address.box}
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-eyebrow font-bold uppercase text-faint">Capacity</h2>
              <p className="max-w-measure text-muted">
                We hold three engagements at a time. If we are full, we will say so and give you a
                date rather than a waiting list.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  )
}
