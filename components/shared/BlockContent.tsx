import type { Block } from '@/content/blocks'

/**
 * Renders the long-form block vocabulary. Measure is capped at 56ch throughout;
 * pull quotes and asides break out of it deliberately.
 */
export function BlockContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={index}
                className="!mt-16 max-w-measure text-[clamp(1.3rem,2.2vw,1.75rem)] font-bold tracking-[-0.025em]"
              >
                {block.text}
              </h2>
            )
          case 'list':
            return (
              <ul key={index} className="max-w-measure list-none border-t border-line p-0">
                {block.items.map((item) => (
                  <li key={item} className="border-b border-line py-3.5 text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            )
          case 'pull':
            return (
              <p
                key={index}
                className="!my-14 max-w-[24ch] text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ivory"
              >
                {block.text}
              </p>
            )
          case 'aside':
            return (
              <aside
                key={index}
                className="!mt-14 max-w-measure border-l border-line-strong bg-ox-raise/50 py-6 pl-6 pr-5"
              >
                <p className="mb-2 text-eyebrow font-bold uppercase text-faint">{block.label}</p>
                <p className="text-[0.92rem] leading-relaxed text-muted">{block.text}</p>
              </aside>
            )
          default:
            return (
              <p key={index} className="max-w-measure text-muted">
                {block.text}
              </p>
            )
        }
      })}
    </div>
  )
}
