# Integration layer

Every integration is a thin module with the same contract: it reads its credentials
from the environment, and if they are absent it degrades safely rather than throwing.
That means the site ships and runs with an empty `.env`, and each service can be
switched on later without touching a component.

| Module        | Service          | Enabled by                                   |
| ------------- | ---------------- | -------------------------------------------- |
| `supabase.ts` | Supabase         | `NEXT_PUBLIC_SUPABASE_URL`, anon/service keys |
| `vector.ts`   | pgvector         | Supabase credentials + `pgvector` extension   |
| `graph.ts`    | Neo4j            | `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`   |
| `resend.ts`   | Resend           | `RESEND_API_KEY`                              |
| `cal.ts`      | Cal.com          | `NEXT_PUBLIC_CAL_LINK`                        |
| `ai.ts`       | Groq, Gemini     | `GROQ_API_KEY`, `GEMINI_API_KEY`              |
| `automation.ts` | n8n            | `N8N_WEBHOOK_URL`                             |
| `observability.ts` | Sentry      | `NEXT_PUBLIC_SENTRY_DSN`                      |

Install the vendor SDK only when you turn a service on; the stubs use `fetch` so the
dependency tree stays small until then.
