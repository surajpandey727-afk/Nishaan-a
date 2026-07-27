import { cn } from '@/lib/utils'

/**
 * The brand book labels every slide "BOLD | medium". That device is carried
 * through the site as the section eyebrow, so structure reads before copy does.
 */
export function Eyebrow({
  owner = 'Nishaan-a',
  children,
  className,
}: {
  owner?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-x-[0.7em] gap-y-1 text-eyebrow font-medium uppercase text-subtle',
        className
      )}
    >
      <b className="font-bold text-muted">{owner}</b>
      <span className="text-faint" aria-hidden>
        |
      </span>
      {children}
    </p>
  )
}
