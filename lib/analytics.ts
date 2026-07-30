export interface AnalyticsPageViewPayload {
  visitor_id: string
  session_id: string
  page: string
  referrer?: string
  language?: string
  browser?: string
  operating_system?: string
  device_type?: string
  screen_resolution?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  country?: string
  region?: string
  city?: string
  continent?: string
}

async function sendAnalyticsEvent(type: 'page_view' | 'score', payload: unknown) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return

  await fetch('/api/analytics/ingest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type, payload }),
    keepalive: true,
  })
}

export function recordPageView(payload: AnalyticsPageViewPayload) {
  return sendAnalyticsEvent('page_view', payload)
}

export function recordScoreEvent(payload: Record<string, unknown>) {
  return sendAnalyticsEvent('score', payload)
}
