/**
 * Path utility — kept as a no-op for Vercel deployment.
 * On Vercel, all assets are served from the root.
 */
export function getBasePath(): string {
  return ''
}

export function publicPath(path: string): string {
  return path
}