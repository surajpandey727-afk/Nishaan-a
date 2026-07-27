/**
 * Path utility for GitHub Pages deployment.
 * Prefixes asset paths with the repository name when deployed.
 */

const BASE_PATH = typeof window !== 'undefined' && window.location.pathname.includes('Nishaan-a') ? '/Nishaan-a' : ''

export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`
}
