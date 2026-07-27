import { cn } from '@/lib/utils'

export function Section({
  id,
  children,
  className,
  rule = true,
}: {
  id?: string
  children: React.ReactNode
  className?: string
  rule?: boolean
}) {
  return (
    <>
      <section id={id} className={cn('bg-black py-section', className)}>
        <div className="shell">{children}</div>
      </section>
      {rule && <hr className="rule" />}
    </>
  )
}

/** Heading left, supporting paragraph right — the site's default two-column head. */
export function SectionHead({
  title,
  children,
  className,
}: {
  title: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-[clamp(32px,6vw,96px)]',
        className
      )}
    >
      <h2 className="text-h2">{title}</h2>
      {children && <div className="max-w-lede text-lead text-muted">{children}</div>}
    </div>
  )
}
