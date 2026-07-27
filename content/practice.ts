export const pillars = [
  {
    key: 'Clarity',
    title: 'A company that can be explained in one breath',
    body: 'One definition, agreed and written down. Everything downstream stops negotiating with itself.',
  },
  {
    key: 'Positioning',
    title: 'A place in the market worth defending',
    body: 'Where you sit, who you displace, and the reason a buyer chooses you when the cheaper option is competent.',
  },
  {
    key: 'Systems',
    title: 'Structure that survives delegation',
    body: 'Naming, hierarchy, messaging and identity built as a system, so the tenth hire produces work like the first.',
  },
  {
    key: 'Intelligence',
    title: 'Evidence you can act on this quarter',
    body: 'Market, category and customer research assembled into decisions, with the reasoning left visible.',
  },
] as const

export const symptoms = [
  {
    kind: 'Symptom',
    text: 'Output keeps rising and recognition does not. More is being made than is being understood.',
  },
  {
    kind: 'Symptom',
    text: 'Every team describes the company differently, and each description is defensible.',
  },
  {
    kind: 'Symptom',
    text: 'Pricing is argued rather than assumed, because the position underneath it was never fixed.',
  },
  {
    kind: 'Cause',
    text: 'The strategic decisions were deferred, then quietly made by whoever shipped first.',
  },
] as const

export const researchPrinciples = [
  {
    title: 'Primary first',
    body: 'Conversations with customers, lapsed buyers and the people who said no. Desk research supports them; it never replaces them.',
  },
  {
    title: 'Read at scale',
    body: 'Reviews, transcripts, filings and category language processed systematically, so patterns come from the corpus rather than the anecdote.',
  },
  {
    title: 'Reasoning shown',
    body: 'Findings arrive with their sources and their limits. You should be able to challenge a conclusion without dismantling the project.',
  },
] as const

export const insights = [
  {
    slug: 'category-you-claim',
    kind: 'Positioning',
    title: 'The category you claim decides the competitors you inherit',
    excerpt:
      'Category choice is usually treated as a labelling exercise. It is closer to choosing an opponent, a price ceiling and a set of buyer expectations at the same time.',
    readingTime: '6 min',
    date: '2026-05-14',
  },
  {
    slug: 'two-week-diagnostic',
    kind: 'Method',
    title: 'Why a two-week diagnostic outperforms a six-month retainer',
    excerpt:
      'Long engagements reward presence over progress. A short, fixed diagnostic forces the uncomfortable finding to arrive while there is still budget to act on it.',
    readingTime: '5 min',
    date: '2026-04-02',
  },
  {
    slug: 'thousand-reviews',
    kind: 'Research',
    title: 'What a thousand reviews tell you that ten interviews cannot',
    excerpt:
      'Interviews give you reasoning. Corpora give you frequency. Most positioning errors come from having one and assuming it covers the other.',
    readingTime: '8 min',
    date: '2026-02-19',
  },
] as const

export const faqs = [
  {
    question: 'Do you execute the work as well?',
    answer:
      'No. We architect and we brief; specialist partners execute. It keeps our advice independent of what we happen to be able to produce, and it means you are never sold a campaign to solve a positioning problem.',
  },
  {
    question: 'How many clients do you take at once?',
    answer:
      'Three. The work depends on senior attention rather than headcount, so capacity is the honest constraint. If we are full, we will say so and give you a date.',
  },
  {
    question: 'What does an engagement cost?',
    answer:
      'Sprints are priced as fixed fees against a defined scope, quoted after the first conversation. There are no hourly rates and no open-ended retainers.',
  },
  {
    question: 'Can we start with a single sprint?',
    answer:
      'Yes, and most clients should. The diagnostic stands alone and ends with a written recommendation, including the recommendation not to continue if that is the honest answer.',
  },
  {
    question: 'Do you work outside India?',
    answer:
      'Regularly. The practice is based in Mumbai and works across time zones; roughly half of current engagements are outside the country.',
  },
] as const

/**
 * Chakravaat — the practice's proprietary framework.
 *
 * NOTE FOR THE CLIENT: the four phases below are drawn from the brand book's own
 * description of "the self-sustaining loop of strategy, identity and filmmaking
 * that matters", which is the only definition of Chakravaat available in the
 * supplied materials. The structure, motion and layout are final; the substance
 * of each phase needs your definition before launch.
 */
export const chakravaat = {
  meaning:
    'Our methodology is deliberately structured to resolve the right strategic questions in the right order. The result is not a brand narrative, but a position grounded in evidence and built to endure.',
  premise:
    'Strategy fails when it is delivered as a document and left to decay. Chakravaat is the alternative: a closed loop in which every output feeds the next input, so the position sharpens with use instead of ageing.',
  phases: [
    {
      key: 'Observe',
      title: 'Read the market before describing it',
      body: 'Primary interviews and category corpora, gathered continuously rather than at the start of a project. The loop begins with evidence and returns to it.',
    },
    {
      key: 'Define',
      title: 'Fix the position in writing',
      body: 'One decision, argued and recorded, with the reasoning attached so it can be challenged later on its merits rather than relitigated from memory.',
    },
    {
      key: 'Structure',
      title: 'Build a system that can be delegated',
      body: 'Naming, hierarchy, messaging and identity assembled so the position survives being handed to people who were not in the room.',
    },
    {
      key: 'Return',
      title: 'Feed what the market says back in',
      body: 'Execution generates evidence. That evidence re-enters at Observe, which is what makes the loop self-sustaining rather than a line with an end.',
    },
  ],
} as const

/** The three conditions that matter more than sector. */
export const conditions = [
  {
    title: 'The category is crowded',
    body: 'Enough credible competitors that a buyer needs a reason to shortlist you, and not enough difference in the marketing to give them one.',
  },
  {
    title: 'The buyer is informed',
    body: 'Purchases involve research, comparison and often a committee. Persuasion happens long before anyone speaks to sales.',
  },
  {
    title: 'The difference is real',
    body: 'Something about how you operate genuinely is better. It is simply not legible from the outside, which is a solvable problem.',
  },
] as const
