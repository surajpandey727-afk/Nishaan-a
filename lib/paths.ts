/**
 * Path utility for GitHub Pages deployment.
 * Dynamically constructs the correct base path for static exports.
 * On Vercel (no GITHUB_ACTIONS), returns root-relative paths.
 */

export function getBasePath(): string {
  if (typeof window === 'undefined') {
    // Server-side: use environment variable if available
    return process.env.GITHUB_ACTIONS ? '/Nishaan-a' : ''
  }
  // Client-side: determine from current URL
  const pathname = window.location.pathname
  if (pathname.includes('/Nishaan-a/')) {
    return '/Nishaan-a'
  }
  return ''
}

export function publicPath(path: string): string {
  const basePath = getBasePath()
  return `${basePath}${path}`
}