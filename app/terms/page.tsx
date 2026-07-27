import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { Prose } from '@/components/shared/Prose'
import { Section } from '@/components/ui/section'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms governing the use of the Nishaan-a website.',
  robots: { index: true, follow: false },
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Terms"
        title="Terms of use."
        intro="These terms cover this website. Engagements are governed separately by the agreement signed at the start of the work."
      />
      <hr className="rule" />
      <Section rule={false}>
        <Prose>
          <p className="text-caption text-faint">Last updated 25 July 2026</p>

          <h2>Using this site</h2>
          <p>
            You may read, quote and link to anything published here, provided the source is
            attributed. You may not reproduce substantial extracts commercially without written
            permission.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The {site.legalName} name, logotype, monogram and all written material on this site
            remain our property. Nothing here transfers a licence to use the marks.
          </p>

          <h2>No advice</h2>
          <p>
            Material published on this site is general commentary. It is not advice for your
            specific situation and should not be relied on as such. Advice is what we provide under
            an engagement.
          </p>

          <h2>Availability</h2>
          <p>
            We aim to keep the site available and accurate, but we do not guarantee either. Links to
            third-party sites are provided for convenience and are not endorsements.
          </p>

          <h2>Liability</h2>
          <p>
            To the extent permitted by law, we exclude liability for loss arising from use of this
            site. Nothing in these terms limits liability for fraud or for anything that cannot
            lawfully be limited.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India, and the courts of Mumbai have exclusive
            jurisdiction.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </Prose>
      </Section>
    </>
  )
}
