import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

/** Favicon: the supplied monogram, unaltered, on Ox Blood. */
export default function Icon() {
  const mark = readFileSync(join(process.cwd(), 'public/brand/monogram-ivory.png'))
  const src = `data:image/png;base64,${mark.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#3E000C',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={46} height={38} alt="" />
      </div>
    ),
    size
  )
}
