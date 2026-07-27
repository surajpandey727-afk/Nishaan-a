import { isEnabled, optionalEnv } from './env'

/**
 * Supabase (database, storage, auth). Install @supabase/supabase-js and replace the
 * fetch calls when you switch this on; the exported shape is what the app expects.
 */
export const supabaseEnabled = () =>
  isEnabled('NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY')

export function supabaseConfig() {
  return {
    url: optionalEnv('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: optionalEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    serviceKey: optionalEnv('SUPABASE_SERVICE_ROLE_KEY'),
    bucket: optionalEnv('SUPABASE_STORAGE_BUCKET') ?? 'public',
  }
}

/** Public URL for an object in Supabase Storage. Returns null until configured. */
export function storageUrl(path: string): string | null {
  const { url, bucket } = supabaseConfig()
  if (!url) return null
  return `${url}/storage/v1/object/public/${bucket}/${path.replace(/^\//, '')}`
}
