'use client'

import { useEffect, useState } from 'react'
import { AdminAnalyticsPage } from '@/components/analytics/AdminAnalyticsPage'

export default function AdminPage() {
  const [authorised, setAuthorised] = useState<boolean | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const providedKey = params.get('key')
    const expectedKey = process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_KEY

    if (!expectedKey) {
      setAuthorised(false)
      return
    }

    if (providedKey !== expectedKey) {
      setAuthorised(false)
      return
    }

    setAuthorised(true)
  }, [])

  if (authorised === null) {
    return (
      <div className="shell py-20 text-center text-ox">
        <h1 className="text-3xl font-semibold">Loading...</h1>
      </div>
    )
  }

  if (!authorised) {
    return (
      <div className="shell py-20 text-center text-ox">
        <h1 className="text-3xl font-semibold">Access denied</h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm text-subtle">
          Provide the correct admin key via <code>?key=YOUR_ADMIN_DASHBOARD_KEY</code>.
        </p>
      </div>
    )
  }

  return (
    <div className="shell">
      <AdminAnalyticsPage />
    </div>
  )
}