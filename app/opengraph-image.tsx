import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { site } from '@/lib/site'

export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

const read = (path: string) =>
  `data:image/png;base64,${readFileSync(join(process.cwd(), path)).toString('base64')}`

/** Open Graph card: Ox Blood field, the supplied marks used as delivered. */
export default function OpenGraphImage() {
  const monoSrc = read('public/brand/monogram-ivory.png')
  const logoSrc = read('public/brand/logo-ivory.png')

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          background: '#3E000C',
          color: '#F7EFEC',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={monoSrc} width={66} height={55} alt="" />
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'uppercase',
              opacity: 0.7,
            }}
          >
            Nishaan-a
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760 }}>
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2.4 }}>
              Strategy is the decision everything else inherits.
            </div>
            <div style={{ marginTop: 28, fontSize: 24, opacity: 0.62 }}>
              Brand strategy practice · Mumbai
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={87} height={125} alt="" />
        </div>
      </div>
    ),
    size
  )
}
