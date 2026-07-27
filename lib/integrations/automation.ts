import { optionalEnv } from './env'

/** Fire-and-forget event to n8n. Never blocks a user-facing response. */
export async function notifyWorkflow(event: string, payload: Record<string, unknown>) {
  const webhook = optionalEnv('N8N_WEBHOOK_URL')
  if (!webhook) return

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, payload, at: new Date().toISOString() }),
    })
  } catch (error) {
    console.warn('[n8n] webhook failed', error)
  }
}
