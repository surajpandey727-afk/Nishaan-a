import { cn } from '@/lib/utils'
import { Button } from './button'

/** Empty state. An empty screen is an invitation to act, so it always carries one. */
export function EmptyState({
  title,
  body,
  actionLabel,
  actionHref,
  className,
}: {
  title: string
  body: string
  actionLabel?: string
  actionHref?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-4 rounded-card border border-dashed border-line px-8 py-14',
        className
      )}
    >
      <h3 className="text-h3 font-bold">{title}</h3>
      <p className="max-w-measure text-muted">{body}</p>
      {actionLabel && actionHref && (
        <Button href={actionHref} variant="outline" size="sm" withArrow>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

/** Loading state. Shape-matched to the content it replaces, never a spinner. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-card bg-ox-raise', className)} />
}

/** Error state. Says what happened and what to do next. It does not apologise. */
export function ErrorState({
  title = 'That request did not complete',
  body,
  retry,
}: {
  title?: string
  body: string
  retry?: () => void
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-card border border-line-strong bg-ox-raise px-8 py-10">
      <h3 className="text-h3 font-bold">{title}</h3>
      <p className="max-w-measure text-muted">{body}</p>
      {retry && (
        <Button onClick={retry} variant="outline" size="sm">
          Try again
        </Button>
      )}
    </div>
  )
}
