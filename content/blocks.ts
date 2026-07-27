/** The minimal block vocabulary long-form pages are written in. */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'pull'; text: string }
  | { type: 'aside'; label: string; text: string }
