import Link from 'next/link'
import { Logotype } from '@/components/brand/Logotype'
import { footerNav, site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="bg-ox-deep pb-9 pt-[clamp(56px,7vw,88px)]">
  <div className="shell">
    <div className="grid gap-[clamp(28px,4vw,56px)] pb-[clamp(44px,5vw,72px)] sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
      <div>
        <div className="mb-6 origin-left scale-[5] lg:-translate-x-[165px]">
          <Logotype className="w-[96px]" />
        </div>
        <p className="max-w-[30ch] text-caption text-subtle">
          {site.tagline}.
          <br />
          {site.address.city}, {site.address.country} · {site.address.box}
        </p>
      </div>

          {footerNav.map((column) => (
            <div key={column.heading}>
              <h2 className="mb-4 text-eyebrow font-bold uppercase text-faint">{column.heading}</h2>
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block py-1.5 text-[0.88rem] text-muted transition-colors duration-base ease-brand hover:text-ivory"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-5 border-t border-line pt-7 text-[0.72rem] tracking-[0.06em] text-faint">
          <span>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </span>
          <span className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-ivory">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ivory">
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
