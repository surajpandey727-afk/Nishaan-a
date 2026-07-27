import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Monogram } from '@/components/brand/Monogram'

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center py-section">
      <div className="shell">
        <Monogram mode="assemble" magnetic className="mb-10 w-[70px]" />
        <Eyebrow className="mb-8">Page not found</Eyebrow>
        <h1 className="max-w-[16ch] text-h1">This page is not here.</h1>
        <p className="mt-8 max-w-lede text-lead text-muted">
          The address may have changed, or the page may never have existed. The practice, the sprint
          framework and the writing are all one click away.
        </p>
        <div className="mt-10 flex flex-wrap gap-3.5">
          <Button href="/" variant="solid" withArrow>
            Back to home
          </Button>
          <Button href="/contact">Contact us</Button>
        </div>
      </div>
    </section>
  )
}
