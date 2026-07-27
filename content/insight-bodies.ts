import type { Block } from './blocks'

/**
 * Article bodies, keyed by slug. Kept separate from the index in practice.ts so
 * the home page and sitemap stay light — only the article route imports this.
 */
export const insightBodies: Record<string, Block[]> = {
  'category-you-claim': [
    {
      type: 'p',
      text: 'Category choice is usually handled as a labelling exercise. Someone asks what we should call ourselves, three options go on a whiteboard, and the shortest one wins. It is treated as packaging for a decision made elsewhere.',
    },
    {
      type: 'p',
      text: 'It is not packaging. Naming your category is how you select your competitors, your price ceiling and the questions a buyer will arrive with. All three are consequences you inherit the moment you claim the label, and none of them are negotiable afterwards.',
    },
    { type: 'h2', text: 'The comparison set is the real product of the decision' },
    {
      type: 'p',
      text: 'When a buyer places you in a category, they immediately populate a shortlist around you. That shortlist is not built from your positioning statement; it is built from whoever else occupies the label in their head. Call yourself a consultancy and you are compared to the four firms they already know. Call yourself a strategy practice and the comparison narrows, but so does the number of buyers who have a budget line for it.',
    },
    {
      type: 'p',
      text: 'Neither choice is wrong. What is wrong is making it without acknowledging that you have just chosen who you lose to. A business that claims a broad category and then complains about being commoditised has usually done this to itself.',
    },
    { type: 'pull', text: 'Naming your category is how you select who you lose to.' },
    { type: 'h2', text: 'Price is set by the category, not by the work' },
    {
      type: 'p',
      text: 'Every category carries a price expectation that buyers bring with them. It is formed by whatever they have paid before under that label, and it is remarkably stable. You can price above it, but you will spend the first half of every conversation justifying the gap rather than discussing the problem.',
    },
    {
      type: 'p',
      text: 'This is the mechanism behind a pattern we see constantly: a business with genuinely differentiated capability, priced twenty per cent above its category and losing on price anyway. The capability is real. The category is doing the pricing.',
    },
    {
      type: 'p',
      text: 'The fix is almost never a better rate card. It is a category with a higher expectation attached, and the proof required to be credible inside it.',
    },
    { type: 'h2', text: 'Categories come with a script' },
    {
      type: 'p',
      text: 'Buyers do not evaluate categories from first principles. They run a script — a set of questions they have learned to ask, in an order they have learned to ask them. Claim a label and you inherit its script whether or not it suits you.',
    },
    {
      type: 'list',
      items: [
        'A software category invites questions about integrations, uptime and seat pricing.',
        'A consultancy invites questions about team seniority, methodology and day rates.',
        'A studio invites questions about portfolio, turnaround and revisions.',
      ],
    },
    {
      type: 'p',
      text: 'If your advantage does not show up in the script, the buyer will never encounter it. They are not being obtuse; they are being efficient. The remedy is either to choose a category whose script surfaces your strength, or to change the script deliberately — which is expensive, slow, and occasionally the right answer.',
    },
    { type: 'h2', text: 'How to make the choice properly' },
    {
      type: 'p',
      text: 'Treat category as a decision with three tests, taken in order. Most teams can work through them in a single session once they accept that the outcome has consequences.',
    },
    {
      type: 'list',
      items: [
        'Who does this label put me next to, and can I beat those specific businesses on the terms buyers actually apply?',
        'What does this label make people expect to pay, and can I be credible at the price I need?',
        'What questions does this label make people ask, and do my honest answers make me look strong or ordinary?',
      ],
    },
    {
      type: 'p',
      text: 'A label that fails any one of those tests will keep failing, no matter how much is spent on the marketing that follows it. A label that passes all three does a great deal of work for free, for years, in rooms you are not in.',
    },
    {
      type: 'aside',
      label: 'In practice',
      text: 'This is the first substantive question in the positioning sprint, and it is usually the one that produces the longest silence. That silence is the work happening.',
    },
  ],

  'two-week-diagnostic': [
    {
      type: 'p',
      text: 'The standard structure for strategy work is a long engagement with a discovery phase at the front. It is defensible on paper: more time means more evidence, and more evidence means a better answer. In practice it produces a predictable failure, and the failure is structural rather than a matter of who is doing the work.',
    },
    { type: 'h2', text: 'Long engagements defer the uncomfortable finding' },
    {
      type: 'p',
      text: 'Most projects surface their most inconvenient conclusion early — usually in week two, usually in an interview. The pricing model is the problem. The founder is the bottleneck. Two of the three markets should be abandoned. It arrives early because it is not subtle; it is simply unwelcome.',
    },
    {
      type: 'p',
      text: 'In a six-month engagement, that finding does not get delivered in week two. It gets held, softened, and folded into a synthesis in month four, by which point three things have happened: the budget is largely spent, the team has invested in the current direction, and the consultant has a relationship to protect. The finding arrives at the exact moment it is hardest to act on.',
    },
    { type: 'pull', text: 'The most inconvenient finding usually arrives in week two, and is usually delivered in month four.' },
    { type: 'h2', text: 'A fixed end changes the incentive' },
    {
      type: 'p',
      text: 'A two-week diagnostic with a fixed fee and a fixed end date has one output: a written diagnosis. There is no month four to defer to. If the pricing model is the problem, that sentence is in the document, because there is nothing else to fill the document with.',
    },
    {
      type: 'p',
      text: 'This is not a claim about integrity. It is a claim about structure. Consultants defer bad news because the incentive to defer exists; remove the incentive and the behaviour changes on its own.',
    },
    { type: 'h2', text: 'Two weeks is enough for a diagnosis' },
    {
      type: 'p',
      text: 'The objection is that a fortnight cannot produce enough evidence. It can, for a diagnosis, which is a different thing from a solution. Diagnosis needs sufficient evidence to identify the constraint with confidence. It does not need the evidence required to design everything downstream of it.',
    },
    {
      type: 'list',
      items: [
        'Twelve to twenty interviews, which is where the interviews stop producing new material anyway.',
        'A category audit of how competitors actually position, not how they say they do.',
        'Whatever the business already knows and has not yet assembled in one place.',
      ],
    },
    {
      type: 'p',
      text: 'The third item is consistently underrated. A significant portion of most diagnoses already exists inside the company, distributed across people who have never been in the same room with the question.',
    },
    { type: 'h2', text: 'What the client actually buys' },
    {
      type: 'p',
      text: 'Two weeks of senior attention buys one page that says: this is the constraint, this is the evidence, this is what it would take to remove it, and here is our recommendation on whether to proceed — including the recommendation not to.',
    },
    {
      type: 'p',
      text: 'That last clause matters. A diagnostic that cannot conclude "you do not need us" is not a diagnostic; it is a sales process with a deliverable attached. Roughly one in five of ours ends that way, and those clients tend to come back with a better-formed question eighteen months later.',
    },
    {
      type: 'aside',
      label: 'The economics',
      text: 'A fixed fee against a fixed scope means the practice is paid for the finding, not for the months. It caps how much we can earn from any one client, which is the point.',
    },
  ],

  'thousand-reviews': [
    {
      type: 'p',
      text: 'Interviews and corpora answer different questions, and most positioning errors come from having one and assuming it covers the other. It is worth being precise about which is which, because the failure mode is quiet.',
    },
    { type: 'h2', text: 'Interviews give you reasoning' },
    {
      type: 'p',
      text: 'A good interview tells you why. Why the buyer shortlisted three vendors and not four. Why the cheaper option was rejected. Why the decision stalled for six weeks in procurement. This is causal information, and nothing else produces it — you cannot infer a reason from a rating.',
    },
    {
      type: 'p',
      text: 'What interviews cannot tell you is how common any of it is. Twenty conversations produce twenty reasons, and the human mind will promote the most vivid one to the most important one. The interview that stayed with you is the interview you will over-weight, and you will not notice you are doing it.',
    },
    { type: 'h2', text: 'Corpora give you frequency' },
    {
      type: 'p',
      text: 'A thousand reviews, or ten thousand forum posts, or three years of earnings calls, tell you what a market repeats. Repetition is a reliable signal precisely because nobody is performing for a researcher. What people mention unprompted, and how often, is closer to what actually governs behaviour than what they say when asked directly.',
    },
    {
      type: 'p',
      text: 'What a corpus cannot tell you is why. Frequency without reasoning produces confident nonsense: you learn that delivery time is mentioned in forty per cent of negative reviews, and you have no idea whether that is a real constraint or the socially acceptable thing to complain about when the real objection was price.',
    },
    { type: 'pull', text: 'Interviews tell you why. Corpora tell you how often. Neither substitutes for the other.' },
    { type: 'h2', text: 'Running them together' },
    {
      type: 'p',
      text: 'The useful sequence is corpus first, interviews second. Read at scale to find out what the category talks about and in what proportion, then use the interviews to establish why the top three themes exist. This inverts the common order, where interviews come first and desk research is used afterwards to confirm what has already been concluded.',
    },
    {
      type: 'list',
      items: [
        'Corpus pass: gather reviews, threads, job adverts and competitor copy. Count what recurs.',
        'Interview pass: take the recurring themes as the agenda and ask why, for each.',
        'Reconciliation: any theme frequent in the corpus but absent from interviews, or vice versa, is the interesting part of the study.',
      ],
    },
    {
      type: 'p',
      text: 'That third step is where most of the value sits. A gap between what a market says at scale and what individuals say in conversation is almost always a signal about what people are unwilling to state directly, and that is frequently the thing worth positioning against.',
    },
    { type: 'h2', text: 'On machine assistance' },
    {
      type: 'p',
      text: 'Reading a corpus at volume is a job for a machine; deciding what it means is not. We use models to cluster, count and surface, and we read the clusters ourselves before any of it becomes a finding. Every conclusion carries its source and its confidence, so a client can reject one theme without the argument collapsing.',
    },
    {
      type: 'p',
      text: 'The temptation is to let a model produce the synthesis as well, because the output reads well. It reads well because that is what it optimises for. A fluent summary of a corpus is not evidence of having understood it, and the distinction is invisible in the artefact.',
    },
    {
      type: 'aside',
      label: 'Where this sits',
      text: 'Both passes run inside the diagnostic sprint. The corpus work happens in the first three days; the interviews fill the rest of the fortnight.',
    },
  ],
}
