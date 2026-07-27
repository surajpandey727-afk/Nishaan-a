import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BlockContent } from '@/components/shared/BlockContent'
import { CallToAction } from '@/components/shared/CallToAction'
import { PageHero } from '@/components/shared/PageHero'
import { Section } from '@/components/ui/section'
import { insightBodies } from '@/content/insight-bodies'
import { insights } from '@/content/practice'
import { site } from '@/lib/site'

type Params = { params: Promise<{ slug: string }> }

const formatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function generateStaticParams() {
  return insights.map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const note = insights.find((item) => item.slug === slug)
  if (!note) return {}

  return {
    title: note.title,
    description: note.excerpt,
    alternates: { canonical: `/insights/${note.slug}` },
    openGraph: {
      type: 'article',
      title: note.title,
      description: note.excerpt,
      publishedTime: note.date,
    },
  }
}

export default async function InsightPage({ params }: Params) {
  const { slug } = await params
  const index = insights.findIndex((item) => item.slug === slug)
  const note = insights[index]
  if (!note) notFound()

  const body = insightBodies[note.slug] ?? []
  const previous = insights[index - 1]
  const next = insights[index + 1]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.excerpt,
    datePublished: note.date,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: `${site.url}/insights/${note.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero label={note.kind} title={note.title} intro={note.excerpt} />
      <hr className="rule" />

      <Section rule={false}>
        <p className="mb-14 text-[0.72rem] uppercase tracking-[0.14em] text-faint">
          {formatter.format(new Date(note.date))} · {note.readingTime} read
        </p>

        <BlockContent blocks={body} />

        <nav
          className="mt-24 grid gap-px border-t border-line bg-line sm:grid-cols-2"
          aria-label="More writing"
        >
          {previous ? (
            <Link
              href={`/insights/${previous.slug}`}
              className="group flex flex-col gap-3 bg-ox py-8 pr-8 transition-colors duration-slow ease-brand hover:bg-ox-raise sm:pl-8"
            >
              <span className="flex items-center gap-2 text-eyebrow font-medium uppercase text-faint">
                <ArrowLeft className="size-3.5 transition-transform duration-base ease-brand group-hover:-translate-x-1" strokeWidth={1.4} />
                Previous
              </span>
              <span className="text-h3 font-bold">{previous.title}</span>
            </Link>
          ) : (
            <span className="hidden bg-ox sm:block" />
          )}

          {next && (
            <Link
              href={`/insights/${next.slug}`}
              className="group flex flex-col gap-3 bg-ox py-8 pl-8 transition-colors duration-slow ease-brand hover:bg-ox-raise sm:items-end sm:pr-8 sm:text-right"
            >
              <span className="flex items-center gap-2 text-eyebrow font-medium uppercase text-faint">
                Next
                <ArrowRight className="size-3.5 transition-transform duration-base ease-brand group-hover:translate-x-1" strokeWidth={1.4} />
              </span>
              <span className="text-h3 font-bold">{next.title}</span>
            </Link>
          )}
        </nav>
      </Section>

      <CallToAction />
    </>
  )
}
