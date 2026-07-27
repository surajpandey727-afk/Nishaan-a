import { supabaseConfig, supabaseEnabled } from './supabase'

export type Match = { id: string; content: string; similarity: number }

/**
 * Semantic search over the research corpus, backed by pgvector inside Supabase.
 * Expects an RPC named `match_documents(query_embedding, match_count)`.
 */
export async function matchDocuments(embedding: number[], count = 8): Promise<Match[]> {
  if (!supabaseEnabled()) return []
  const { url, anonKey } = supabaseConfig()

  const response = await fetch(`${url}/rest/v1/rpc/match_documents`, {
    method: 'POST',
    headers: {
      apikey: anonKey!,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query_embedding: embedding, match_count: count }),
  })

  if (!response.ok) return []
  return (await response.json()) as Match[]
}
