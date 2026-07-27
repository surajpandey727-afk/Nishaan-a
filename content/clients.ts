export type ClientChapter = {
  slug: string
  name: string
  sector: string
  /** The large project title that opens the chapter. */
  title: string
  /** One line. What changed. */
  outcome: string
  /** The brand statement — the position, in the client's own terms. */
  statement: string
  body: string
  metrics: { value: string; label: string }[]
  callouts: string[]
  quote: { text: string; attribution: string; role: string }
  engagement: string[]
  period: string
  image?: string
  imageAlt: string
}

/**
 * Three chapters, not three cards. Each occupies its own viewport and is
 * written to be read in sequence. Metrics are the client's own measures.
 */
export const clients: ClientChapter[] = [
  {
    slug: 'vete-associates',
    name: 'Vete Associates',
    sector: 'Professional services',
    title: 'A firm that was hired for its people and sold on its process',
    outcome: 'Repositioned around judgement rather than method.',
    statement: 'Advice you can act on the same week.',
    body: 'Vete had built a reputation on the quality of individual counsel and a website that described a methodology. Every enquiry arrived warm from a referral and cooled during the evaluation, because the material a prospect actually read made the firm sound like every other. The diagnostic found the gap in a fortnight: the referral described a person, the marketing described a process, and nothing reconciled the two.',
    metrics: [
      { value: '2 weeks', label: 'From brief to written diagnosis' },
      { value: '1 of 3', label: 'Service lines formally retired' },
      { value: '4×', label: 'Increase in enquiries citing a named partner' },
    ],
    callouts: [
      'The referral and the website were describing different firms.',
      'Retiring a service line was the decision that made the position credible.',
      'Partners now lead the proposition; the method sits underneath it as proof.',
    ],
    quote: {
      text: 'We had spent years trying to sound like a larger firm. The uncomfortable part was being told that the thing we were hiding was the thing people were buying.',
      attribution: 'Managing Partner',
      role: 'Vete Associates',
    },
    engagement: ['Diagnostic', 'Positioning'],
    period: '2025',
    imageAlt: 'Vete Associates — engagement imagery',
  },
  {
    slug: 'naacho',
    name: 'Naacho',
    sector: 'Consumer & culture',
    title: 'A cultural platform with an audience and no category',
    outcome: 'Given a category it could own rather than one it was borrowing.',
    statement: 'Where the form is taken seriously.',
    body: 'Naacho had reach, genuine cultural credibility and a commercial problem: it was being evaluated as entertainment by partners who priced entertainment, while operating closer to cultural infrastructure. The corpus work made the mismatch visible — three years of coverage described the work in the language of events, and three years of audience conversation described it in the language of practice. The position moved to where the audience already was.',
    metrics: [
      { value: '11k', label: 'Audience posts read in the corpus pass' },
      { value: '2', label: 'Partner tiers rebuilt around the new category' },
      { value: '38%', label: 'Uplift in average partnership value' },
    ],
    callouts: [
      'The audience had already assigned a category. The business had not.',
      'Coverage language and audience language had diverged for three years.',
      'Pricing moved with the position, in the same sprint, not after it.',
    ],
    quote: {
      text: 'We were being booked as an event and building something closer to an institution. Naming that changed who we could talk to and what those conversations were worth.',
      attribution: 'Founder',
      role: 'Naacho',
    },
    engagement: ['Diagnostic', 'Positioning', 'Architecture'],
    period: '2025 — 2026',
    imageAlt: 'Naacho — engagement imagery',
  },
  {
    slug: 'clutch',
    name: 'Clutch',
    sector: 'Technology',
    title: 'Eleven features, four narratives, one product',
    outcome: 'Portfolio and messaging consolidated into a single architecture.',
    statement: 'One product, told once.',
    body: 'Clutch had shipped quickly and named as it went. Eleven features carried four competing narratives, each defensible on its own and incoherent in combination. Buyers were not confused about the product; they were unable to summarise it to a colleague, which is a more expensive problem. The architecture sprint produced a hierarchy that let the sales team say one thing and the roadmap keep moving.',
    metrics: [
      { value: '11 → 3', label: 'Named surfaces after consolidation' },
      { value: '1 stage', label: 'Removed from the average sales cycle' },
      { value: '4 weeks', label: 'Architecture sprint, start to handover' },
    ],
    callouts: [
      'The problem was not comprehension. It was repeatability.',
      'Naming governance shipped with the architecture, so the sprawl does not return.',
      'The roadmap did not slow down to accommodate the change.',
    ],
    quote: {
      text: 'The test we were given was whether a customer could explain us to their own team without us in the room. We had never thought to measure that, and we were failing it.',
      attribution: 'Head of Product',
      role: 'Clutch',
    },
    engagement: ['Diagnostic', 'Architecture'],
    period: '2026',
    imageAlt: 'Clutch — engagement imagery',
  },
]
