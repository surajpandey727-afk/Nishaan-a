'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { supabaseEnabled } from '@/lib/integrations/supabase'

type AnalysisRow = {
  id: string
  submitted_name?: string
  country?: string
  city?: string
  final_score?: number
  timestamp?: string
  success?: boolean
}

type CountryRow = {
  country?: string
  analyses?: number
}

type CityRow = {
  city?: string
  analyses?: number
}

type TrendRow = {
  day?: string
  requests?: number
  total_tokens?: number
  average_total_tokens?: number
}

type HealthRow = {
  recorded_at?: string
  groq_status?: string
  worker_latency_ms?: number
  supabase_latency_ms?: number
}

const kpiCards = [
  { label: 'Visitors', key: 'visitors_total' },
  { label: 'Sessions', key: 'sessions_total' },
  { label: 'Page views', key: 'page_views_total' },
  { label: 'Analyses', key: 'analyses_total' },
  { label: 'Groq requests', key: 'groq_requests_total' },
  { label: 'Avg. score', key: 'average_score' },
]

function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined) return '—'
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 1 }).format(value)
}

function serializeCsv(rows: Record<string, unknown>[]) {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const csv = [headers.join(',')]
  for (const row of rows) {
    csv.push(
      headers
        .map((key) => {
          const value = row[key]
          if (value === null || value === undefined) return ''
          const escaped = String(value).replace(/"/g, '""')
          return `"${escaped}"`
        })
        .join(',')
    )
  }
  return csv.join('\n')
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<Record<string, number | null>>({})
  const [lastAnalyses, setLastAnalyses] = useState<AnalysisRow[]>([])
  const [mapData, setMapData] = useState<{ country?: string; count?: number }[]>([])
  const [topCountries, setTopCountries] = useState<CountryRow[]>([])
  const [topCities, setTopCities] = useState<CityRow[]>([])
  const [tokenTrends, setTokenTrends] = useState<TrendRow[]>([])
  const [systemHealth, setSystemHealth] = useState<HealthRow[]>([])
  const [filter, setFilter] = useState('')
  const [range, setRange] = useState(30)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const fetchAnalytics = useCallback(async () => {
    const [summaryResult, analysesResult, countriesResult, citiesResult, trendsResult, healthResult] = await Promise.all([
      supabase.rpc('analytics_dashboard_summary'),
      supabase.rpc('analytics_recent_analyses', { max_count: 10 }),
      supabase.rpc('analytics_top_countries', { max_count: 10 }),
      supabase.rpc('analytics_top_cities', { max_count: 10 }),
      supabase.rpc('analytics_groq_token_trends', { days: range }),
      supabase.rpc('analytics_system_health_recent', { max_count: 5 }),
    ])

    setSummary(summaryResult.data?.[0] ?? {})
    setLastAnalyses(analysesResult.data ?? [])
    setTopCountries(countriesResult.data ?? [])
    setTopCities(citiesResult.data ?? [])
    setTokenTrends(trendsResult.data ?? [])
    setSystemHealth(healthResult.data ?? [])
    setMapData(
      (countriesResult.data ?? []).map((item: CountryRow) => ({
        country: item.country,
        count: item.analyses,
      }))
    )
  }, [range])

  useEffect(() => {
    void fetchAnalytics()
  }, [fetchAnalytics])

  const filteredAnalyses = useMemo(() => {
    if (!filter) return lastAnalyses
    return lastAnalyses.filter((item) =>
      String(item.submitted_name).toLowerCase().includes(filter.toLowerCase()) ||
      String(item.country).toLowerCase().includes(filter.toLowerCase()) ||
      String(item.city).toLowerCase().includes(filter.toLowerCase())
    )
  }, [filter, lastAnalyses])

  return (
    <section className="space-y-8 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-faint">Mission Control</p>
          <h1 className="text-4xl font-semibold text-ivory">Analytics</h1>
          <p className="mt-2 max-w-2xl text-sm text-subtle">Real-time score activity, Groq usage telemetry, visitor geography, and system health in one dashboard.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="solid" size="sm" onClick={fetchAnalytics}>Refresh</Button>
          <Button variant="outline" size="sm" onClick={() => downloadFile('analytics-summary.csv', serializeCsv(lastAnalyses), 'text/csv')}>Export CSV</Button>
          <Button variant="ghost" size="sm" onClick={() => downloadFile('analytics-summary.json', JSON.stringify(lastAnalyses, null, 2), 'application/json')}>Export JSON</Button>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpiCards.map((item) => (
          <article key={item.key} className="rounded-3xl border border-line bg-ox-deep p-6">
            <p className="text-sm uppercase tracking-[0.32em] text-faint">{item.label}</p>
            <p className="mt-4 text-4xl font-semibold text-ivory">{formatNumber(summary[item.key] as number)}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-3xl border border-line bg-ox-deep p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-faint">Visitor distribution</p>
              <p className="mt-2 text-sm text-subtle">Country-level activity over the selected range.</p>
            </div>
            <select
              value={range}
              onChange={(event) => setRange(Number(event.target.value))}
              className="rounded-pill border border-line bg-ox px-4 py-2 text-sm text-ivory"
            >
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>
          <div className="min-h-[280px] rounded-3xl bg-ox/40 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {mapData.slice(0, 6).map((item) => (
                <div key={item.country} className="rounded-3xl border border-line p-4">
                  <p className="text-sm text-faint">{item.country || 'Unknown'}</p>
                  <p className="mt-2 text-2xl font-semibold text-ivory">{item.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-ox-deep p-6">
          <p className="text-sm uppercase tracking-[0.32em] text-faint">System health</p>
          <div className="mt-4 space-y-3">
            {systemHealth.map((entry) => (
              <div key={entry.recorded_at ?? Math.random()} className="rounded-3xl border border-line p-4 bg-ox/30">
                <div className="flex items-center justify-between gap-4 text-sm text-subtle">
                  <span>{entry.recorded_at ? new Date(entry.recorded_at).toLocaleString() : 'Unknown'}</span>
                  <span>{entry.groq_status ?? 'Unknown'}</span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-ox p-3">
                    <p className="text-[0.7rem] uppercase tracking-[0.28em] text-faint">Worker latency</p>
                    <p className="mt-2 text-xl font-semibold text-ivory">{entry.worker_latency_ms}ms</p>
                  </div>
                  <div className="rounded-3xl bg-ox p-3">
                    <p className="text-[0.7rem] uppercase tracking-[0.28em] text-faint">Supabase latency</p>
                    <p className="mt-2 text-xl font-semibold text-ivory">{entry.supabase_latency_ms}ms</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <section className="rounded-3xl border border-line bg-ox-deep p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-faint">Recent analyses</p>
              <p className="mt-2 text-sm text-subtle">Interactive score submissions stream.</p>
            </div>
            <input
              type="search"
              placeholder="Filter names, cities, countries"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="w-full rounded-pill border border-line bg-ox px-4 py-2 text-sm text-ivory placeholder:text-faint sm:w-auto"
            />
          </div>
          <div className="mt-6 space-y-4">
            {filteredAnalyses.map((item) => (
              <div key={item.id} className="rounded-3xl border border-line bg-ox p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-subtle">{item.submitted_name || 'Anonymous'}</p>
                    <p className="text-xs text-faint">{item.country || 'Unknown country'} · {item.city || 'Unknown city'}</p>
                  </div>
                  <span className={cn('rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em]', item.success ? 'border-emerald-500 text-emerald-300' : 'border-rose-500 text-rose-300')}>
                    {item.success ? 'Success' : 'Failure'}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-subtle">
                  <span>Score: {item.final_score?.toFixed(1) ?? '—'}</span>
                  <span>{item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Unknown'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-ox-deep p-6">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.32em] text-faint">Top names</p>
            <p className="mt-2 text-sm text-subtle">Most recent submitted names.</p>
          </div>
          <div className="space-y-3">
            {lastAnalyses.slice(0, 6).map((item) => (
              <div key={item.id} className="rounded-3xl border border-line p-4 bg-ox/30">
                <p className="font-semibold text-ivory">{item.submitted_name || 'Anonymous'}</p>
                <p className="mt-1 text-sm text-faint">Score {item.final_score?.toFixed(1) ?? '—'} · {item.country || 'Unknown'}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-faint">Top countries</p>
              <div className="mt-3 grid gap-3">
                {topCountries.map((item) => (
                  <div key={item.country} className="rounded-3xl border border-line p-4 bg-ox/30">
                    <p className="text-sm text-subtle">{item.country}</p>
                    <p className="mt-2 text-2xl font-semibold text-ivory">{item.analyses}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-faint">Top cities</p>
              <div className="mt-3 grid gap-3">
                {topCities.map((item) => (
                  <div key={item.city} className="rounded-3xl border border-line p-4 bg-ox/30">
                    <p className="text-sm text-subtle">{item.city}</p>
                    <p className="mt-2 text-2xl font-semibold text-ivory">{item.analyses}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-line bg-ox-deep p-6">
        <p className="text-sm uppercase tracking-[0.32em] text-faint">Groq token analytics</p>
        <div className="mt-4 space-y-4">
          {tokenTrends.map((entry) => (
            <div key={entry.day} className="grid gap-3 rounded-3xl border border-line p-4 bg-ox/30 sm:grid-cols-2">
              <div>
                <p className="text-sm text-faint">{entry.day}</p>
                <p className="mt-2 text-2xl font-semibold text-ivory">{entry.requests}</p>
              </div>
              <div className="grid gap-2">
                <p className="text-sm text-faint">Total tokens: {entry.total_tokens}</p>
                <p className="text-sm text-faint">Average tokens: {Number(entry.average_total_tokens).toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
