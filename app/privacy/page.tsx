import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { Prose } from '@/components/shared/Prose'
import { Section } from '@/components/ui/section'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Nishaan-a collects, uses and retains personal data.',
  robots: { index: true, follow: false },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Privacy"
        title="What we collect, and why."
        intro="Short version: enquiry details so we can reply, and anonymised analytics so we know which pages are read. Nothing is sold or shared for advertising."
      />
      <hr className="rule" />
      <Section rule={false}>
        <Prose>
          <p className="text-caption text-faint">Last updated 25 July 2026</p>

          <h2>Data we collect</h2>
          <ul>
            <li>Details you submit through the contact form: name, email, company and message.</li>
            <li>Correspondence you send us by email or telephone.</li>
            <li>
              Aggregate analytics: page views, referrer and approximate region. No cross-site
              tracking, no advertising pixels.
            </li>
          </ul>

          <h2>Why we hold it</h2>
          <p>
            Enquiry data is processed on the basis of legitimate interest, so that we can respond to
            you and keep a record of the engagement. Analytics are processed on the same basis and
            are not linked to identifiable individuals.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries that do not become engagements are deleted after twenty-four months.
            Engagement records are retained for seven years to meet accounting obligations.
          </p>

          <h2>Processors</h2>
          <p>
            We use third-party services for hosting, email delivery, scheduling and error
            monitoring. Each is bound by its own data processing terms, and a current list is
            available on request.
          </p>

          <h2>Your rights</h2>
          <p>
            You may request a copy of the personal data we hold about you, ask us to correct it, or
            ask us to delete it. Write to{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within thirty
            days.
          </p>

          <h2>Contact</h2>
          <p>
            {site.legalName}, {site.address.city}, {site.address.country}.{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </Prose>
      </Section>
    </>
  )
}
