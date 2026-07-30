'use client'

import { useEffect } from 'react'
import { recordPageView } from '@/lib/analytics'

function getVisitorId() {
  const storageKey = 'nishaan-a-analytics-visitor-id'
  if (typeof window === 'undefined') return undefined
  const existing = window.localStorage.getItem(storageKey)
  if (existing) return existing
  const id = crypto.randomUUID()
  window.localStorage.setItem(storageKey, id)
  return id
}

function getSessionId() {
  const storageKey = 'nishaan-a-analytics-session-id'
  if (typeof window === 'undefined') return undefined
  const existing = window.sessionStorage.getItem(storageKey)
  if (existing) return existing
  const id = crypto.randomUUID()
  window.sessionStorage.setItem(storageKey, id)
  return id
}

function getDeviceType(userAgent: string) {
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Opera Mini/i.test(userAgent)) {
    return 'mobile'
  }

  if (/iPad|Tablet|Nexus 7|Nexus 10|KFAPWI/i.test(userAgent)) {
    return 'tablet'
  }

  return 'desktop'
}

function getScreenResolution() {
  if (typeof window === 'undefined') return undefined
  return `${window.screen.width}x${window.screen.height}`
}

function parseOperatingSystem(userAgent: string) {
  if (/Windows NT/i.test(userAgent)) return 'Windows'
  if (/Mac OS X|Macintosh/i.test(userAgent)) return 'macOS'
  if (/Android/i.test(userAgent)) return 'Android'
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS'
  if (/Linux/i.test(userAgent)) return 'Linux'
  return 'Unknown'
}

export function PageViewTracker() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return

    const visitorId = getVisitorId()
    const sessionId = getSessionId()

    if (!visitorId || !sessionId) return

    recordPageView({
      visitor_id: visitorId,
      session_id: sessionId,
      page: window.location.pathname,
      referrer: document.referrer || undefined,
      language: navigator.language,
      browser: navigator.userAgent,
      operating_system: parseOperatingSystem(navigator.userAgent),
      device_type: getDeviceType(navigator.userAgent),
      screen_resolution: getScreenResolution(),
    }).catch(() => {
      // Analytics failures should not affect the page experience.
    })
  }, [])

  return null
}
