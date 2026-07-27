import type { MetadataRoute } from 'next'
import { clients } from '@/content/clients'
import { insights } from '@/content/practice'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/methodology',
    '/industries',
    '/research',
    '/insights',
    '/case-studies',
    '/contact',
    '/privacy',
    '/terms',
  ]

  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
    ...insights.map((note) => ({
      url: `${site.url}/insights/${note.slug}`,
      lastModified: new Date(note.date),
      priority: 0.5,
    })),
    ...clients.map((client) => ({
      url: `${site.url}/case-studies/${client.slug}`,
      priority: 0.5,
    })),
  ]
}
