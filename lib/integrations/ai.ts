import { optionalEnv } from './env'

/** Groq for fast synthesis passes, Gemini for long-context reading. */
export async function groqComplete(prompt: string, model = 'llama-3.3-70b-versatile') {
  const apiKey = optionalEnv('GROQ_API_KEY')
  if (!apiKey) return null

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }] }),
  })

  if (!response.ok) return null
  const data = await response.json()
  return (data.choices?.[0]?.message?.content as string) ?? null
}

export async function geminiComplete(prompt: string, model = 'gemini-2.0-flash') {
  const apiKey = optionalEnv('GEMINI_API_KEY')
  if (!apiKey) return null

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  )

  if (!response.ok) return null
  const data = await response.json()
  return (data.candidates?.[0]?.content?.parts?.[0]?.text as string) ?? null
}
