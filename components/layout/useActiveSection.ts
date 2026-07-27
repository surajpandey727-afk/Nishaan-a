'use client'

import { useEffect, useState } from 'react'

/**
 * Tracks which chapter is currently in view, for the navigation indicator.
 * Uses one observer for all sections rather than one each.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [ids])

  return active
}
