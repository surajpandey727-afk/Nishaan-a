import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/integrations/resend'

export const runtime = 'nodejs'

/**
 * Contact endpoint. Validates, then hands off to the Resend integration.
 * While RESEND_API_KEY is unset the integration logs and returns success in
 * development, so the form is testable before the account exists.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 })
  }

  const name = String(payload.name ?? '').trim()
  const email = String(payload.email ?? '').trim()
  const message = String(payload.message ?? '').trim()
  const company = String(payload.company ?? '').trim()

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email and message are all required.' },
      { status: 422 }
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email address is not valid.' }, { status: 422 })
  }

  const result = await sendContactEmail({ name, email, company, message })

  if (!result.ok) {
    return NextResponse.json({ error: 'The message could not be sent.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
