import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { isEnabled, optionalEnv } from './env'

/**
 * Supabase (database, storage, auth). Install @supabase/supabase-js and use the
 * public URL/anon key for client side helpers and the service role key for server flows.
 */
export const supabaseEnabled = () =>
  isEnabled('NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY')

export const supabaseServiceEnabled = () =>
  isEnabled('NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY')

export function supabaseConfig() {
  return {
    url: optionalEnv('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: optionalEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    serviceKey: optionalEnv('SUPABASE_SERVICE_ROLE_KEY'),
    bucket: optionalEnv('SUPABASE_STORAGE_BUCKET') ?? 'public',
  }
}

export function createSupabaseServiceRoleClient(): SupabaseClient {
  const { url, serviceKey } = supabaseConfig()
  if (!url || !serviceKey) {
    throw new Error('Supabase service role client is not configured.')
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

/** Public URL for an object in Supabase Storage. Returns null until configured. */
export function storageUrl(path: string): string | null {
  const { url, bucket } = supabaseConfig()
  if (!url) return null
  return `${url}/storage/v1/object/public/${bucket}/${path.replace(/^\//, '')}`
}
