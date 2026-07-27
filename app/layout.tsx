import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'
import { PageTransition } from '@/components/layout/PageTransition'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}, Mumbai`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#3E000C',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phoneHref,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  areaServed: 'Worldwide',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className="dark">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[80] focus:rounded-pill focus:bg-ivory focus:px-5 focus:py-3 focus:text-[0.75rem] focus:font-medium focus:uppercase focus:tracking-widest focus:text-ox"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Nav />
        <SmoothScroll>
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
