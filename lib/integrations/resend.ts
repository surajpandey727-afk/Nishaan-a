import { optionalEnv } from './env'
import { site } from '@/lib/site'

type ContactPayload = { name: string; email: string; company?: string; message: string }

/**
 * Transactional email. Without RESEND_API_KEY the enquiry is logged and treated
 * as delivered in development, so the contact form is testable from day one.
 */
export async function sendContactEmail(payload: ContactPayload): Promise<{ ok: boolean }> {
  const apiKey = optionalEnv('RESEND_API_KEY')
  const to = optionalEnv('CONTACT_INBOX') ?? site.email

  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[resend] not configured — enquiry logged only:', payload)
      return { ok: true }
    }
    return { ok: false }
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: optionalEnv('CONTACT_FROM') ?? 'Nishaan-a <website@nishaan-a.com>',
      to: [to],
      reply_to: payload.email,
      subject: `Enquiry — ${payload.name}${payload.company ? ` (${payload.company})` : ''}`,
      text: `${payload.name}\n${payload.email}\n${payload.company || '—'}\n\n${payload.message}`,
    }),
  })

  return { ok: response.ok }
}
