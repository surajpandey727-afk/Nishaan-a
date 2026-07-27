import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ClientChapter } from '@/components/shared/ClientChapter'
import { CallToAction } from '@/components/shared/CallToAction'
import { PageHero } from '@/components/shared/PageHero'
import { Section } from '@/components/ui/section'
import { clients } from '@/content/clients'
import { site } from '@/lib/site'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return clients.map((client) => ({ slug: client.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const client = clients.find((item) => item.slug === slug)
  if (!client) return {}

  return {
    title: `${client.name} — ${client.outcome}`,
    description: client.body.slice(0, 180),
    alternates: { canonical: `/case-studies/${client.slug}` },
    openGraph: { title: client.title, description: client.outcome, type: 'article' },
  }
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const index = clients.findIndex((item) => item.slug === slug)
  const client = clients[index]
  if (!client) notFound()

  const next = clients[(index + 1) % clients.length]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: client.title,
    description: client.outcome,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: `${site.url}/case-studies/${client.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero label={client.name} title={client.title} intro={client.outcome} />
      <hr className="rule" />

      <ClientChapter client={client} index={index} linked={false} standalone />

      <Section rule={false}>
        <nav className="flex flex-wrap items-center justify-between gap-6" aria-label="More chapters">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-[0.1em] text-subtle transition-colors hover:text-ivory"
          >
            <ArrowLeft
              className="size-3.5 transition-transform duration-base ease-brand group-hover:-translate-x-1"
              strokeWidth={1.4}
              aria-hidden
            />
            All chapters
          </Link>
          <Link
            href={`/case-studies/${next.slug}`}
            className="group inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-[0.1em]"
          >
            {next.name}
            <ArrowRight
              className="size-3.5 transition-transform duration-base ease-brand group-hover:translate-x-1.5"
              strokeWidth={1.4}
              aria-hidden
            />
          </Link>
        </nav>
      </Section>

      <CallToAction />
    </>
  )
}
