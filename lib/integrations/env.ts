/** Reads an environment variable without throwing, so absent services degrade quietly. */
export function optionalEnv(key: string): string | undefined {
  const value = process.env[key]
  return value && value.length > 0 ? value : undefined
}

export function isEnabled(...keys: string[]): boolean {
  return keys.every((key) => Boolean(optionalEnv(key)))
}
