import { cn } from '@/lib/utils'

const base =
  'w-full rounded-card border border-line bg-ox-raise/40 px-4 py-3 text-body text-ivory placeholder:text-faint transition-colors duration-base ease-brand hover:border-line-strong focus:border-ivory focus:outline-none'

export function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-eyebrow font-medium uppercase text-subtle"
    >
      {children}
    </label>
  )
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(base, className)} {...props} />
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(base, 'min-h-40 resize-y', className)} {...props} />
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill border border-line px-4 py-1.5 text-caption font-medium text-muted',
        className
      )}
    >
      {children}
    </span>
  )
}
