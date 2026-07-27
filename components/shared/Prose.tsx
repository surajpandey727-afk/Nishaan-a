import { cn } from '@/lib/utils'

/** Long-form text block for legal and editorial pages. */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-measure space-y-6 text-muted',
        '[&_h2]:mb-3 [&_h2]:mt-14 [&_h2]:text-h3 [&_h2]:font-bold [&_h2]:text-ivory',
        '[&_h3]:mb-2 [&_h3]:mt-10 [&_h3]:text-h3 [&_h3]:font-medium [&_h3]:text-ivory',
        '[&_a]:text-ivory [&_a]:underline [&_a]:underline-offset-4',
        '[&_li]:mb-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5',
        className
      )}
    >
      {children}
    </div>
  )
}
