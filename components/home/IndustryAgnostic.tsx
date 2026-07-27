import { Eyebrow } from '@/components/ui/eyebrow'
import { Step } from '@/components/ui/sequence'
import { Section } from '@/components/ui/section'
import { conditions } from '@/content/practice'

/**
 * Deliberately not a logo wall or a sector list. The claim is that sector is
 * the wrong axis, so listing sectors would undercut the argument.
 */
export function IndustryAgnostic() {
  return (
    <Section id="industries">
      <Step step="headline">
        <Eyebrow className="mb-[clamp(32px,5vw,64px)]">Industry agnostic</Eyebrow>
      </Step>

      <Step step="headline" offset={0.06}>
        <h2 className="max-w-[16ch] text-h2">Sector is the wrong question.</h2>
      </Step>

      <Step step="subheading" className="mt-10">
        <p className="max-w-lede text-lead text-muted">
          We are not sector specialists and do not claim to be. Positioning problems have the same
          structure whether the category is diagnostics or hospitality — what changes is the
          evidence, and evidence is something we gather rather than something we arrive with.
        </p>
      </Step>

      <Step step="body" className="mt-7">
        <p className="max-w-measure text-muted">
          What we look for instead is a set of conditions. When all three hold, the method transfers
          cleanly and the work pays for itself quickly. When they do not, we say so and suggest
          someone better suited.
        </p>
      </Step>

      <div className="mt-[clamp(48px,6vw,80px)] grid gap-px border border-line bg-line md:grid-cols-3">
        {conditions.map((condition, index) => (
          <Step key={condition.title} step="visual" offset={index * 0.07} soft>
            <div className="h-full bg-ox p-[clamp(26px,2.6vw,40px)] transition-colors duration-slow ease-brand hover:bg-ox-raise">
              <span className="mb-6 block text-[0.66rem] font-medium uppercase tracking-[0.22em] text-faint">
                Condition
              </span>
              <h3 className="mb-3 text-[1.18rem] font-bold leading-[1.28] tracking-[-0.02em]">
                {condition.title}
              </h3>
              <p className="text-[0.9rem] leading-relaxed text-subtle">{condition.body}</p>
            </div>
          </Step>
        ))}
      </div>
    </Section>
  )
}
