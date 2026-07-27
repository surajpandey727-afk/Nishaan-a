import { ClientChapter } from '@/components/shared/ClientChapter'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Step } from '@/components/ui/sequence'
import { clients } from '@/content/clients'

/**
 * Three chapters, read in sequence. No carousel, no cards, no slider —
 * each client holds its own viewport and the scroll carries you between them.
 */
export function Clients() {
  return (
    <section id="clients" aria-label="Client chapters">
      <div className="shell pb-[clamp(40px,6vw,88px)] pt-section">
        <Step step="headline">
          <Eyebrow className="mb-[clamp(32px,5vw,64px)]">Client chapters</Eyebrow>
        </Step>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[clamp(40px,7vw,120px)]">
          <Step step="headline" offset={0.06}>
            <h2 className="max-w-[14ch] text-h2">Three decisions, told properly.</h2>
          </Step>
          <Step step="subheading">
            <p className="max-w-lede text-lead text-muted">
              Not testimonials. Each of these is the account of a single decision — what was found,
              what was chosen, and what it cost to choose it.
            </p>
          </Step>
        </div>
      </div>

      {clients.map((client, index) => (
        <ClientChapter key={client.slug} client={client} index={index} />
      ))}
    </section>
  )
}
