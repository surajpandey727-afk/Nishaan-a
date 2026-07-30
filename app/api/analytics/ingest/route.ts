import { NextResponse } from 'next/server'
import {
  createSupabaseServiceRoleClient,
  supabaseServiceEnabled,
} from '@/lib/integrations/supabase'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!supabaseServiceEnabled()) {
    return NextResponse.json(
      { error: 'Supabase analytics is not configured.' },
      { status: 500 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed JSON body.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Expected JSON object.' }, { status: 400 })
  }

  const { type, payload } = body as {
    type?: string
    payload?: unknown
  }

  if (type !== 'page_view' && type !== 'score') {
    return NextResponse.json({ error: 'Unsupported analytics type.' }, { status: 422 })
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return NextResponse.json({ error: 'Expected payload object.' }, { status: 400 })
  }

  const supabase = createSupabaseServiceRoleClient()
  const functionName =
    type === 'score'
      ? 'analytics_ingest_score_event'
      : 'analytics_record_page_view'

  const { error } = await supabase.rpc(functionName, {
    payload: JSON.stringify(payload),
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
