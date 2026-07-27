import type { Metadata } from 'next'
import { ClientChapter } from '@/components/shared/ClientChapter'
import { CallToAction } from '@/components/shared/CallToAction'
import { PageHero } from '@/components/shared/PageHero'
import { clients } from '@/content/clients'

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'Three Nishaan-a engagements told as chapters — Vete Associates, Naacho and Clutch. What was found, what was chosen, and what it cost to choose it.',
}

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        label="Case studies"
        title="Three decisions, told properly."
        intro="Each of these is the account of a single decision. We publish the shape of the problem, the evidence that produced it and the choice that followed."
      />
      <hr className="rule" />

      {clients.map((client, index) => (
        <ClientChapter key={client.slug} client={client} index={index} linked={false} />
      ))}

      <CallToAction />
    </>
  )
}
