import { optionalEnv } from './env'

/** Cal.com booking link. Falls back to email so the CTA is never dead. */
export function bookingLink(fallbackEmail: string) {
  const link = optionalEnv('NEXT_PUBLIC_CAL_LINK')
  return link ? `https://cal.com/${link}` : `mailto:${fallbackEmail}`
}
